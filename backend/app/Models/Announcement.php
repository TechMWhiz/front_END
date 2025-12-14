<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'type',
        'priority',
        'target_audience',
        'publish_date',
        'expiry_date',
        'is_pinned',
        'views',
        'status',
        'created_by',
    ];

    protected $casts = [
        'publish_date' => 'datetime',
        'expiry_date' => 'datetime',
        'is_pinned' => 'boolean',
    ];
}
