<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Announcement;
use Illuminate\Support\Facades\Auth;

class AnnouncementController extends Controller
{
    public function index()
    {
        // Allow public access for testing
        $announcements = Announcement::orderBy('created_at', 'desc')->get();
        return response()->json($announcements);
    }

    public function show($id)
    {
        $announcement = Announcement::findOrFail($id);
        return response()->json($announcement);
    }

    public function store(Request $request)
    {
        // Allow public access for testing
        try {
            $request->validate([
                'title' => 'required|string',
                'content' => 'required|string',
                'type' => 'nullable|string',
                'priority' => 'nullable|string',
                'target_audience' => 'nullable|string',
                'publish_date' => 'nullable|date',
                'expiry_date' => 'nullable|date',
                'is_pinned' => 'nullable|boolean',
            ]);

            $announcement = Announcement::create([
                'title' => $request->title,
                'content' => $request->content,
                'type' => $request->type ?? 'general',
                'priority' => $request->priority ?? 'normal',
                'target_audience' => $request->target_audience ?? 'all',
                'publish_date' => $request->publish_date,
                'expiry_date' => $request->expiry_date,
                'is_pinned' => $request->is_pinned ?? false,
                'status' => $request->status ?? 'Published', // Default to "Published"
                'created_by' => 1, // Default user for testing
            ]);

            return response()->json($announcement, 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating announcement',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred'
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        // Allow public access for testing
        try {
            $announcement = Announcement::findOrFail($id);

            $request->validate([
                'title' => 'sometimes|required|string',
                'content' => 'sometimes|required|string',
                'type' => 'nullable|string',
                'priority' => 'nullable|string',
                'target_audience' => 'nullable|string',
                'publish_date' => 'nullable|date',
                'expiry_date' => 'nullable|date',
                'is_pinned' => 'nullable|boolean',
                'status' => 'nullable|string',
            ]);

            $announcement->update($request->all());
            return response()->json($announcement);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating announcement',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred'
            ], 500);
        }
    }

    public function destroy($id)
    {
        // Allow public access for testing
        try {
            $announcement = Announcement::findOrFail($id);
            $announcement->delete();

            return response()->json(['message' => 'Announcement deleted']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting announcement',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred'
            ], 500);
        }
    }
}
