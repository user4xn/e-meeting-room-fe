<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AppsController;
use App\Http\Controllers\AuthenticationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Main Page Route
Route::get('/', [AuthenticationController::class, 'login_basic'])->name('auth-login');

/* Route Dashboards */
Route::group(['prefix' => 'dashboard'], function () {
    Route::get('/', [DashboardController::class, 'dashboardAnalytics'])->name('dashboard');
});
/* Route Dashboards */

/* Route Apps */
Route::group(['prefix' => 'app'], function () {
    Route::get('participant', [AppsController::class, 'participantIndex'])->name('app-participant');
    Route::get('rent', [AppsController::class, 'rentIndex'])->name('app-rent');
    Route::get('booking', [AppsController::class, 'bookingIndex'])->name('app-booking');
    
    Route::get('report/room', [AppsController::class, 'reportRoomIndex'])->name('app-report-room');
    Route::get('report/room/detail', [AppsController::class, 'reportRoomDetail'])->name('app-report-room-detail');

    Route::get('user/list', [AppsController::class, 'user_list'])->name('app-user-list');

    Route::get('room/list', [AppsController::class, 'room_list'])->name('app-room-list');
});
/* Route Apps */

/* Route Pages */
Route::group(['prefix' => 'page'], function () {
    // Miscellaneous Pages With Page Prefix
    Route::get('coming-soon', [MiscellaneousController::class, 'coming_soon'])->name('misc-coming-soon');
    Route::get('not-authorized', [MiscellaneousController::class, 'not_authorized'])->name('misc-not-authorized');
    Route::get('maintenance', [MiscellaneousController::class, 'maintenance'])->name('misc-maintenance');
});

/* Route Authentication Pages */
Route::group(['prefix' => 'auth'], function () {
    Route::get('verify-email', [AuthenticationController::class, 'verify_email_basic'])->name('auth-verify-email');
    Route::get('register', [AuthenticationController::class, 'register_basic'])->name('auth-register');
    Route::get('forgot-password', [AuthenticationController::class, 'forgot_password_basic'])->name('auth-forgot-password');
    Route::get('reset-password', [AuthenticationController::class, 'reset_password_basic'])->name('auth-reset-password');
    Route::get('two-steps', [AuthenticationController::class, 'two_steps_basic'])->name('auth-two-steps');
});
/* Route Authentication Pages */