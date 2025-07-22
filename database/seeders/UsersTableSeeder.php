<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'Admin User',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('admin2025'),
                'copy_pass' => 'admin123',
                'role' => 'admin',
            ],
            [
                'name' => 'Manager User',
                'email' => 'manager@gmail.com',
                'password' => Hash::make('manager2025'),
                'copy_pass' => 'manager123',
                'role' => 'manager',
            ],
            [
                'name' => 'Regular User',
                'email' => 'user@gmail.com',
                'password' => Hash::make('user2025'),
                'copy_pass' => 'user123',
                'role' => 'user',
            ],
        ]);
        
    }
}
