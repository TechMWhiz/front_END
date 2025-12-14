<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\AnnouncementController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Auth routes
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/me', [AuthController::class, 'user']);

// Faculty routes (temporarily bypass auth for frontend testing)
Route::get('/faculty', [FacultyController::class, 'index']);
Route::post('/faculty', [FacultyController::class, 'store']);
Route::get('/faculty/{id}', [FacultyController::class, 'show']);
Route::put('/faculty/{id}', [FacultyController::class, 'update']);
Route::delete('/faculty/{id}', [FacultyController::class, 'destroy']);

// Public faculty view (no auth required for students)
Route::get('/public/faculty', [FacultyController::class, 'index']);

// Events routes
Route::get('/events', [EventController::class, 'index']);
Route::post('/events', [EventController::class, 'store']);
Route::get('/events/{id}', [EventController::class, 'show']);
Route::put('/events/{id}', [EventController::class, 'update']);
Route::delete('/events/{id}', [EventController::class, 'destroy']);

// Announcements routes (temporarily bypass auth for frontend testing)
Route::get('/announcements', [AnnouncementController::class, 'index']);
Route::post('/announcements', [AnnouncementController::class, 'store']);
Route::get('/announcements/{id}', [AnnouncementController::class, 'show']);
Route::put('/announcements/{id}', [AnnouncementController::class, 'update']);
Route::delete('/announcements/{id}', [AnnouncementController::class, 'destroy']);
