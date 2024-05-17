<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\product;

class Kernel extends ConsoleKernel
{

    protected $commands = [

    ];

    protected function schedule(Schedule $schedule)
    {
        $schedule->call('App\Http\Controllers\ProductController@delete')->daily();
    }


    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}