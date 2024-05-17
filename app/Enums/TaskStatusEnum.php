<?php

namespace App\Enums;

use App\Attributes\Description;
use App\Traits\AttributableEnum;

enum TaskStatusEnum: string
{
    use AttributableEnum;
    
    #[Description('Pending')]
    case PENDING = 'PENDING';

    #[Description('In progress')]
    case IN_PROGRESS = 'IN_PROGRESS';

    #[Description('Completed')]
    case COMPLETED = 'COMPLETED';
}