<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComputerCase extends Model
{
    protected $fillable = ['name', 'price', 'form_factor'];
    use HasFactory;
}
