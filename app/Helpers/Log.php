<?php

namespace App\Helpers;

use Log as LaravelLog;

class Log
{
    public function entry(array $details)
    {
        LaravelLog::info(implode(' ', $details) . '.');
    }
}
