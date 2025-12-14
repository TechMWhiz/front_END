<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CalendarItem;
use Illuminate\Support\Facades\Validator;

class CalendarController extends Controller
{
    public function index()
    {
        $calendarItems = CalendarItem::orderBy('start_date', 'asc')->get();
        return response()->json($calendarItems);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string|in:Academic,Holiday,Registration,Events,Administrative,Campus',
            'type' => 'required|string|max:50',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_recurring' => 'boolean',
            'recurrence_pattern' => 'nullable|string|max:100',
            'priority' => 'required|string|in:Low,Medium,High,Critical',
            'location' => 'nullable|string|max:255',
            'created_by' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $calendarItem = CalendarItem::create($request->all());
        return response()->json($calendarItem, 201);
    }

    public function show($id)
    {
        $calendarItem = CalendarItem::findOrFail($id);
        return response()->json($calendarItem);
    }

    public function update(Request $request, $id)
    {
        $calendarItem = CalendarItem::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'sometimes|required|string|in:Academic,Holiday,Registration,Events,Administrative,Campus',
            'type' => 'sometimes|required|string|max:50',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_recurring' => 'boolean',
            'recurrence_pattern' => 'nullable|string|max:100',
            'priority' => 'sometimes|required|string|in:Low,Medium,High,Critical',
            'location' => 'nullable|string|max:255',
            'created_by' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $calendarItem->update($request->all());
        return response()->json($calendarItem);
    }

    public function destroy($id)
    {
        $calendarItem = CalendarItem::findOrFail($id);
        $calendarItem->delete();
        return response()->json(['message' => 'Calendar item deleted successfully']);
    }
}
