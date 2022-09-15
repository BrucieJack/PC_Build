<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GPU extends Model
{
    protected $fillable = ['name', 'price', 'memory', 'frequency'];
    use HasFactory;
}
