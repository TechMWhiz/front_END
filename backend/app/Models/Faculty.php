<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    use HasFactory;

    protected $table = 'faculty';

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'office',
        'department',
        'title',
        'status',
        'bio',
        'specializations',
        'education',
        'awards',
        'profile_image',
        'office_hours',
        'website',
        'research_interests',
        'years_of_experience',
    ];

    protected $casts = [
        'specializations' => 'array',
        'education' => 'array',
        'awards' => 'array',
        'research_interests' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
