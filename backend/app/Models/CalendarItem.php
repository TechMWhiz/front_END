<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalendarItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category',
        'type',
        'start_date',
        'end_date',
        'is_recurring',
        'recurrence_pattern',
        'priority',
        'status',
        'created_by',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'is_recurring' => 'boolean',
    ];
}
