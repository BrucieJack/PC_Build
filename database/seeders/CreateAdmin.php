<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class CreateAdmin extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::create([
            'email' => 'admin@gmail.com',
            'name' => 'Admin',
            'password' => Hash::make('1234567890'),
        ]);

        Role::create([
            'name' => 'admin',
        ]);

        Role::create([
            'name' => 'user',
        ]);

        $admin->assignRole('admin');
    }
}
