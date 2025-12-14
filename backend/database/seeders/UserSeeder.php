<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@sorsu.edu',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        // Create faculty users
        User::create([
            'name' => 'Kenneth Gisalan',
            'email' => 'kenneth.gisalan@sorsu.edu',
            'password' => Hash::make('faculty123'),
            'role' => 'faculty',
        ]);

        User::create([
            'name' => 'Sean Martin Fulay',
            'email' => 'sean.fulay@sorsu.edu',
            'password' => Hash::make('faculty123'),
            'role' => 'faculty',
        ]);
    }
}
