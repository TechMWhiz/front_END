<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if admin user already exists
        if (!User::where('email', 'admin@sorsu.edu')->exists()) {
            User::create([
                'name' => 'Administrator',
                'email' => 'admin@sorsu.edu',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]);
            
            $this->command->info('Admin user created successfully!');
            $this->command->info('Email: admin@sorsu.edu');
            $this->command->info('Password: admin123');
        } else {
            $this->command->info('Admin user already exists.');
        }
    }
}
