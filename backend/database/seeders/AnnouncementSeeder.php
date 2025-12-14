<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Announcement;

class AnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Announcement::create([
            'title' => 'Welcome to the New Academic Year',
            'content' => 'We are excited to welcome all students back for the new academic year. Classes will begin on August 15th. Please ensure you have completed all registration requirements.',
            'type' => 'General',
            'priority' => 'High',
            'target_audience' => 'All Students',
            'publish_date' => now(),
            'expiry_date' => now()->addDays(30),
            'is_pinned' => true,
            'views' => 1247,
            'status' => 'Published',
            'created_by' => 1,
        ]);

        Announcement::create([
            'title' => 'Midterm Examination Schedule',
            'content' => 'The midterm examination schedule has been posted. Please check your student portal for your specific exam times and locations.',
            'type' => 'Academic',
            'priority' => 'High',
            'target_audience' => 'All Students',
            'publish_date' => now(),
            'expiry_date' => now()->addDays(14),
            'is_pinned' => false,
            'views' => 892,
            'status' => 'Published',
            'created_by' => 1,
        ]);

        Announcement::create([
            'title' => 'Student Council Elections',
            'content' => 'Nominations for Student Council positions are now open. Interested students should submit their applications by September 1st.',
            'type' => 'Event',
            'priority' => 'Medium',
            'target_audience' => 'Students',
            'publish_date' => now(),
            'expiry_date' => now()->addDays(21),
            'is_pinned' => false,
            'views' => 456,
            'status' => 'Published',
            'created_by' => 1,
        ]);
    }
}
