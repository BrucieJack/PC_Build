<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RAM extends Model
{
    protected $fillable = ['name', 'price', 'memory_size', 'frequency', 'memory_socket'];
    use HasFactory;
}
