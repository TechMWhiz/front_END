<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Event;
use App\Models\Announcement;
use App\Models\User;

class TestCrudCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-crud-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test CRUD operations for admin functionality';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
    }
}
