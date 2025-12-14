<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Faculty;

class FacultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Faculty::create([
            'user_id' => 2, // Kenneth Gisalan
            'first_name' => 'Kenneth',
            'last_name' => 'Gisalan',
            'email' => 'kenneth.gisalan@sorsu.edu',
            'phone' => '+63 919 345 6789',
            'office' => 'Engineering Building, Room 203',
            'department' => 'Information Technology',
            'title' => 'Assistant Professor',
            'status' => 'Active',
            'bio' => 'Prof. Gisalan is an IT expert specializing in cybersecurity, network administration, and software development. He brings industry experience to the classroom and is passionate about preparing students for the digital workforce.',
            'specializations' => ['Information Technology', 'Cybersecurity', 'Network Administration', 'Software Development'],
            'education' => [
                'M.S. in Information Technology, University of the Philippines Diliman',
                'B.S. in Computer Science, Ateneo de Manila University'
            ],
            'awards' => [
                'Outstanding IT Educator Award 2023',
                'Best Cybersecurity Research Paper 2022'
            ],
            'office_hours' => 'Tue/Thu 2-4 PM',
            'research_interests' => ['Cybersecurity', 'Network Security', 'Cloud Computing', 'Digital Forensics'],
            'years_of_experience' => 8
        ]);

        Faculty::create([
            'user_id' => 3, // Sean Martin Fulay
            'first_name' => 'Sean Martin',
            'last_name' => 'Fulay',
            'email' => 'sean.fulay@sorsu.edu',
            'phone' => '+63 917 888 5566',
            'office' => 'Engineering Building, Room 204',
            'department' => 'Information Technology',
            'title' => 'IT Specialist Instructor',
            'status' => 'Active',
            'bio' => 'Prof. Fulay specializes in web development, database management, and software engineering. With extensive experience in both academia and industry, he focuses on practical applications and real-world problem solving.',
            'specializations' => ['Web Development', 'Database Management', 'Software Engineering'],
            'education' => [
                'M.S. in Computer Science, De La Salle University',
                'B.S. in Information Technology, University of Santo Tomas'
            ],
            'awards' => [
                'Best Web Development Project Award 2022',
                'Excellence in Teaching Award 2021'
            ],
            'office_hours' => 'Mon/Wed 1-3 PM',
            'research_interests' => ['Web Technologies', 'Database Systems', 'Software Architecture'],
            'years_of_experience' => 5
        ]);
    }
}
