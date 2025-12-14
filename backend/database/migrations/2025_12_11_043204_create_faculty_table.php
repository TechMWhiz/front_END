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
        Schema::create('faculty', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('office')->nullable();
            $table->string('department');
            $table->string('title');
            $table->string('status')->default('Active');
            $table->text('bio')->nullable();
            $table->json('specializations')->nullable();
            $table->json('education')->nullable();
            $table->json('awards')->nullable();
            $table->string('profile_image')->nullable();
            $table->string('office_hours')->nullable();
            $table->string('website')->nullable();
            $table->json('research_interests')->nullable();
            $table->integer('years_of_experience')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faculty');
    }
};
