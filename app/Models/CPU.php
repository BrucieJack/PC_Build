<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CPU extends Model
{
    protected $fillable = ['name', 'price', 'cores', 'frequency', 'socket'];
    use HasFactory;
}
