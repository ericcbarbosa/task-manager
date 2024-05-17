<?php

namespace App\Enums;

use App\Attributes\Description;
use App\Traits\AttributableEnum;

enum TaskPriorityEnum: string
{
    use AttributableEnum;
    
    #[Description('Hight')]
    case HIGHT = 'HIGHT';

    #[Description('Medium')]
    case MEDIUM = 'MEDIUM';

    #[Description('Low')]
    case LOW = 'LOW';
}