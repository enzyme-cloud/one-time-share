<?php

namespace App\Console\Commands;

use App\Secret;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CleanUpExpiredSecrets extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ots:clean';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cleans up the database by removing all expired secrets';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $expired = Carbon::now()->subHours(12);

        Secret::where('created_at', '<=', $expired)->delete();
    }
}
