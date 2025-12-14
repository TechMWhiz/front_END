<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'type',
        'category',
        'start_date',
        'end_date',
        'location',
        'organizer',
        'max_attendees',
        'is_public',
        'registration_required',
        'registration_deadline',
        'tags',
        'status',
        'created_by',
        'contactEmail',
        'website',
        'featured',
        'time',
        'endTime',
        'date',
        'endDate',
        'maxAttendees',
        'registrationRequired',
        'registrationDeadline',
        'isPublic',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'registration_deadline' => 'datetime',
        'is_public' => 'boolean',
        'registration_required' => 'boolean',
        'featured' => 'boolean',
        'tags' => 'array',
    ];
}
