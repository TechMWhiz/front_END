<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EventController extends Controller
{
    public function index()
    {
        try {
            $events = Event::where('status', 'active')
                ->where('is_public', true)
                ->orderBy('start_date', 'asc')
                ->get();
            return response()->json($events);
        } catch (\Exception $e) {
            Log::error('Error fetching events: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error fetching events',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred'
            ], 500);
        }
    }

    public function show($id)
    {
        $event = Event::findOrFail($id);
        return response()->json($event);
    }

    public function store(Request $request)
    {
        try {
            // Temporarily bypass auth check for testing
            // if (Auth::user()->role !== 'admin') {
            //     return response()->json(['message' => 'Unauthorized'], 403);
            // }

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'start_date' => 'required|date',
                'end_date' => 'nullable|date|after_or_equal:start_date',
                'location' => 'nullable|string|max:255',
                'organizer' => 'nullable|string|max:255',
                'type' => 'nullable|string|max:100',
                'category' => 'nullable|string|max:100',
                'max_attendees' => 'nullable|integer|min:1',
                'is_public' => 'boolean',
                'registration_required' => 'boolean',
                'registration_deadline' => 'nullable|date|after_or_equal:now',
                'tags' => 'nullable|array',
                'tags.*' => 'string|max:50',
            ]);

            // Start database transaction
            return DB::transaction(function () use ($validated) {
                $event = Event::create([
                    'title' => $validated['title'],
                    'description' => $validated['description'] ?? null,
                    'start_date' => $validated['start_date'],
                    'end_date' => $validated['end_date'] ?? null,
                    'location' => $validated['location'] ?? null,
                    'organizer' => $validated['organizer'] ?? null,
                    'type' => $validated['type'] ?? 'general',
                    'category' => $validated['category'] ?? null,
                    'max_attendees' => $validated['max_attendees'] ?? null,
                    'is_public' => $validated['is_public'] ?? true,
                    'registration_required' => $validated['registration_required'] ?? false,
                    'registration_deadline' => $validated['registration_deadline'] ?? null,
                    'tags' => $validated['tags'] ?? [],
                    'status' => 'active',
                    'created_by' => 1, // Default to admin user ID for testing
                ]);

                Log::info('Event created', ['event_id' => $event->id, 'title' => $event->title]);
                return response()->json($event, 201);
            });
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::warning('Event validation failed', ['errors' => $e->errors()]);
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error creating event: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating event',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred'
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            // Temporarily bypass auth check for testing
            // if (Auth::user()->role !== 'admin') {
            //     return response()->json(['message' => 'Unauthorized'], 403);
            // }

            $event = Event::findOrFail($id);

            $validated = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'description' => 'nullable|string',
                'start_date' => 'sometimes|required|date',
                'end_date' => 'nullable|date|after_or_equal:start_date',
                'location' => 'nullable|string|max:255',
                'organizer' => 'nullable|string|max:255',
                'type' => 'nullable|string|max:100',
                'category' => 'nullable|string|max:100',
                'max_attendees' => 'nullable|integer|min:1',
                'is_public' => 'boolean',
                'registration_required' => 'boolean',
                'registration_deadline' => 'nullable|date',
                'tags' => 'nullable|array',
                'tags.*' => 'string|max:50',
                'status' => 'nullable|string|in:active,inactive,cancelled',
            ]);

            // Start database transaction
            return DB::transaction(function () use ($event, $validated) {
                $event->update($validated);
                Log::info('Event updated', ['event_id' => $event->id]);
                return response()->json($event);
            });
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::warning('Event update validation failed', ['event_id' => $id, 'errors' => $e->errors()]);
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error updating event: ' . $e->getMessage(), ['event_id' => $id]);
            return response()->json([
                'message' => 'Error updating event',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred'
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            // Temporarily bypass auth check for testing
            // if (Auth::user()->role !== 'admin') {
            //     return response()->json(['message' => 'Unauthorized'], 403);
            // }

            $event = Event::findOrFail($id);
            
            // Use soft delete if the model uses SoftDeletes
            if (in_array('Illuminate\Database\Eloquent\SoftDeletes', class_uses($event))) {
                $event->delete();
            } else {
                $event->forceDelete();
            }

            Log::info('Event deleted', ['event_id' => $id]);
            return response()->json(['message' => 'Event deleted successfully']);
        } catch (\Exception $e) {
            Log::error('Error deleting event: ' . $e->getMessage(), ['event_id' => $id]);
            return response()->json([
                'message' => 'Error deleting event',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred'
            ], 500);
        }
    }
}
