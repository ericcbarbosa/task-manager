<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use App\Enums\TaskStatusEnum;
use App\Enums\TaskPriorityEnum;
use Laravel\Sanctum\HasApiTokens;

class Task extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string, string, TaskStatusEnum, \Date, TaskPriorityEnum>
     */
    protected $fillable = [
        'name',
        'description',
        'status',
        'deadline',
        'priority',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'deadline' => 'datetime',
        'status' => TaskStatusEnum::class,
        'priority' => TaskPriorityEnum::class,
    ];

}
