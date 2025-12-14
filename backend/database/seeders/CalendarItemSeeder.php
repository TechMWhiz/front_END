<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CalendarItem;

class CalendarItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CalendarItem::create([
            'title' => 'First Day of Classes',
            'description' => 'Start of the new academic semester',
            'category' => 'Academic',
            'type' => 'Milestone',
            'start_date' => now()->addDays(14),
            'is_recurring' => false,
            'priority' => 'High',
            'status' => 'Active',
            'created_by' => 1,
        ]);

        CalendarItem::create([
            'title' => 'Midterm Examinations',
            'description' => 'Midterm examination period for all courses',
            'category' => 'Academic',
            'type' => 'Exam Period',
            'start_date' => now()->addDays(60),
            'end_date' => now()->addDays(67),
            'is_recurring' => false,
            'priority' => 'High',
            'status' => 'Active',
            'created_by' => 1,
        ]);

        CalendarItem::create([
            'title' => 'Christmas Break',
            'description' => 'University holiday break',
            'category' => 'Holiday',
            'type' => 'Break',
            'start_date' => now()->addDays(90),
            'end_date' => now()->addDays(97),
            'is_recurring' => true,
            'recurrence_pattern' => 'yearly',
            'priority' => 'Medium',
            'status' => 'Active',
            'created_by' => 1,
        ]);

        CalendarItem::create([
            'title' => 'Registration Period',
            'description' => 'Course registration for next semester',
            'category' => 'Registration',
            'type' => 'Period',
            'start_date' => now()->addDays(120),
            'end_date' => now()->addDays(127),
            'is_recurring' => true,
            'recurrence_pattern' => 'yearly',
            'priority' => 'High',
            'status' => 'Active',
            'created_by' => 1,
        ]);
    }
}
