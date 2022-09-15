<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CPU;
use App\Models\GPU;
use App\Models\RAM;
use App\Models\Motherboard;
use App\Models\Power;
use App\Models\User;
use App\Models\ComputerCase;
use App\Models\Memory;

class ComputerBuild extends Model
{
    protected $fillable = ['c_p_u_id', 'g_p_u_id', 'r_a_m_id', 'motherboard_id', 'power_id', 'memory_id', 'computer_case_id', 'isAdmin', 'user_id'];
    use HasFactory;

    public function cpu()
    {
        return $this->hasOne(CPU::class, 'id', 'c_p_u_id');
    }

    public function gpu()
    {
        return $this->hasOne(GPU::class, 'id', 'g_p_u_id');
    }

    public function ram()
    {
        return $this->hasOne(RAM::class, 'id', 'r_a_m_id');
    }

    public function motherboard()
    {
        return $this->hasOne(Motherboard::class, 'id', 'motherboard_id');
    }

    public function memory()
    {
        return $this->hasOne(Memory::class, 'id', 'memory_id');
    }

    public function power()
    {
        return $this->hasOne(Power::class, 'id', 'power_id');
    }

    public function case()
    {
        return $this->hasOne(ComputerCase::class, 'id', 'computer_case_id');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
