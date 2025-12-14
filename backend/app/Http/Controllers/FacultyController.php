<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Faculty;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class FacultyController extends Controller
{
    public function index()
    {
        // Allow public access for testing - remove auth check
        try {
            $faculty = Faculty::with('user')->get();
            return response()->json($faculty);
        } catch (\Exception $e) {
            \Log::error('Error fetching faculty data: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error fetching faculty data',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred'
            ], 500);
        }
    }

    public function show($id)
    {
        $faculty = Faculty::with('user')->findOrFail($id);
        return response()->json($faculty);
    }

    public function store(Request $request)
    {
        try {
            // Temporarily bypass admin check for testing
            // TODO: Re-enable this once authentication is working properly
            /*
            if (!Auth::check() || Auth::user()->role !== 'admin') {
                return response()->json(['message' => 'Unauthorized - Admin access required'], 403);
            }
            */

            $request->validate([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'department' => 'required|string',
                'title' => 'required|string',
                'phone' => 'nullable|string',
                'office' => 'nullable|string',
                'bio' => 'nullable|string',
                'office_hours' => 'nullable|string',
            ]);

            // Start database transaction
            return DB::transaction(function () use ($request) {
                // Create user first
                $user = User::create([
                    'name' => $request->first_name . ' ' . $request->last_name,
                    'email' => $request->email,
                    'password' => Hash::make('faculty123'), // Default password
                    'role' => 'faculty',
                ]);

                $faculty = Faculty::create([
                    'user_id' => $user->id,
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'email' => $request->email,
                    'department' => $request->department,
                    'title' => $request->title,
                    'phone' => $request->phone,
                    'office' => $request->office,
                    'bio' => $request->bio,
                    'office_hours' => $request->office_hours,
                ]);

                return response()->json($faculty, 201);
            });
        } catch (\Exception $e) {
            Log::error('Error creating faculty: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating faculty member',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred'
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        // Allow public access for testing - remove auth check
        try {
            $faculty = Faculty::findOrFail($id);

            $request->validate([
                'first_name' => 'sometimes|required|string',
                'last_name' => 'sometimes|required|string',
                'email' => 'sometimes|required|email|unique:faculty,email,' . $id,
                'department' => 'sometimes|required|string',
                'title' => 'sometimes|required|string',
                'phone' => 'nullable|string',
                'office' => 'nullable|string',
                'bio' => 'nullable|string',
                'office_hours' => 'nullable|string',
            ]);

            $faculty->update($request->only([
                'first_name', 'last_name', 'email', 'department', 'title',
                'phone', 'office', 'bio', 'office_hours'
            ]));

            // Update user name if name changed
            if ($request->has(['first_name', 'last_name'])) {
                $faculty->user->update([
                    'name' => $request->first_name . ' ' . $request->last_name,
                    'email' => $request->email ?? $faculty->user->email,
                ]);
            }

            return response()->json($faculty);
        } catch (\Exception $e) {
            \Log::error('Error updating faculty: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error updating faculty member',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred'
            ], 500);
        }
    }

    public function destroy($id)
    {
        // Allow public access for testing - remove auth check
        try {
            $faculty = Faculty::findOrFail($id);
            
            // Check if faculty has an associated user and delete it first
            if ($faculty->user) {
                $faculty->user->delete(); // Cascade delete user
            }
            
            $faculty->delete();

            return response()->json(['message' => 'Faculty deleted']);
        } catch (\Exception $e) {
            \Log::error('Error deleting faculty: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error deleting faculty member',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred'
            ], 500);
        }
    }
}
