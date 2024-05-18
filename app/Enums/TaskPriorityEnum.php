<?php

namespace App\Enums;

use App\Attributes\Description;
use App\Traits\AttributableEnum;

enum TaskPriorityEnum: string
{
    use AttributableEnum;
    
    #[Description('High')]
    case HIGH = 'HIGH';

    #[Description('Medium')]
    case MEDIUM = 'MEDIUM';

    #[Description('Low')]
    case LOW = 'LOW';
}