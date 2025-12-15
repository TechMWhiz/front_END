<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'SORSU API is running',
        'timestamp' => now()->toISOString()
    ]);
});

Route::get('/test', function () {
    return 'Laravel is working!';
});
