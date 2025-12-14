<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('type')->default('general');
            $table->string('category')->nullable();
            $table->datetime('start_date');
            $table->datetime('end_date')->nullable();
            $table->string('location')->nullable();
            $table->string('organizer')->nullable();
            $table->integer('max_attendees')->nullable();
            $table->boolean('is_public')->default(true);
            $table->boolean('registration_required')->default(false);
            $table->datetime('registration_deadline')->nullable();
            $table->json('tags')->nullable();
            $table->string('status')->default('active');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
