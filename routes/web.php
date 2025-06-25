<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\ReservationsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');
});

// Group all authenticated routes together
Route::middleware(['auth', 'verified'])->group(function () {

    // 👮 Admin Routes (only users with 'admin' role)
    Route::middleware('role:admin')->group(function () {
        Route::resource('/admin', AdminController::class);
        Route::get('/admin/show/{id}', [AdminController::class, 'show']);
        Route::resource('/reservation', ReservationsController::class);
    });

    // 👤 Manager Routes (only users with 'manager' role)
    Route::middleware('role:manager')->group(function () {
        Route::resource('/manager', ManagerController::class);
        Route::get('/manager/show/{id}', [ManagerController::class, 'show']);
        Route::get('/reservations', [ManagerController::class, 'reservations']);
    });

    // 👤 User Routes (only users with 'user' role)
    Route::middleware('role:user')->group(function () {
        Route::resource('/user', UserController::class);
        Route::get('/user/show/{id}', [UserController::class, 'show']);
        Route::get('/user/create/{id}', [UserController::class, 'create'])->name('user.create');
        Route::post('/user/store', [UserController::class, 'store'])->name('user.store');
        Route::get('/history', [UserController::class, 'history'])->name('user.history');
    });

});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';


