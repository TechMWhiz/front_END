<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        \Log::info('Login attempt', [
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'data' => $request->all()
        ]);

        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
                'user_type' => 'required|in:admin,faculty,student'
            ]);

            // Normalize email to lowercase
            $email = strtolower(trim($request->email));
            $userType = $request->user_type;
            
            \Log::debug('Looking for user', [
                'email' => $email,
                'user_type' => $userType,
                'all_users' => User::where('email', $email)->get(['id', 'email', 'role'])
            ]);

            $user = User::where('email', $email)
                      ->where('role', $userType)
                      ->first();

            if (!$user) {
                \Log::warning('User not found or role mismatch', [
                    'email' => $email,
                    'requested_type' => $userType,
                    'user_found' => User::where('email', $email)->exists()
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'The provided credentials are incorrect.'
                ], 401);
            }

            if (!Hash::check($request->password, $user->password)) {
                \Log::warning('Invalid password attempt', [
                    'email' => $email,
                    'user_id' => $user->id
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'The provided credentials are incorrect.'
                ], 401);
            }

            $token = $user->createToken('auth_token')->plainTextToken;
            
            \Log::info('Login successful', [
                'user_id' => $user->id,
                'email' => $user->email,
                'role' => $user->role
            ]);
            
            return response()->json([
                'success' => true,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role
                ],
                'token' => $token,
                'token_type' => 'Bearer',
            ]);
            
        } catch (\Exception $e) {
            \Log::error('Login error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'message' => 'An error occurred during login.',
                'error' => config('app.debug') ? $e->getMessage() : 'Please try again later.'
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
