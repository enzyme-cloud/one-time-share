<?php

namespace App\Console\Commands;

use App\Secret;
use Carbon\Carbon;
use App\Helpers\Log;
use Illuminate\Console\Command;

class CleanUpExpiredSecrets extends Command
{
    protected $signature = 'ots:clean';
    protected $description = 'Cleans up the database by removing all expired secrets';
    protected $log;

    public function __construct(Log $log)
    {
        parent::__construct();

        $this->log = $log;
    }

    public function handle()
    {
        $expired = Carbon::now()->subHours(12);
        $secrets = Secret::where('created_at', '<=', $expired);

        if ($secrets->count() > 0) {
            $this->log->entry(['Deleting', $secrets->count(), 'expired secrets']);
            $secrets->delete();
        }
    }
}
