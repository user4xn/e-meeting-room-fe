<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MiscellaneousController;
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
Route::get('room/scan/{room_id}', [MiscellaneousController::class, 'room_scan'])->name('app-room-scan');
Route::get('room/schedule/{room_id?}', [MiscellaneousController::class, 'room_schedule'])->name('app-room-schedule');
Route::get('room/guest-form/{room_id}', [MiscellaneousController::class, 'room_form'])->name('app-guest-form');

/* Route Dashboards */
Route::group(['prefix' => 'dashboard'], function () {
    Route::get('/', [DashboardController::class, 'dashboardEcommerce'])->name('dashboard');
});
/* Route Dashboards */

/* Route Apps */
Route::group(['prefix' => 'app'], function () {
    Route::get('participant/ongoing', [AppsController::class, 'participantOngoing'])->name('app-participant-ongoing');
    Route::get('participant/history', [AppsController::class, 'participantHistory'])->name('app-participant-ongoing');
    Route::get('rent/{room_id?}', [AppsController::class, 'rentIndex'])->name('app-rent');
    Route::get('booking', [AppsController::class, 'bookingIndex'])->name('app-booking');
    Route::get('report/room', [AppsController::class, 'reportRoomIndex'])->name('app-report-room');
    Route::get('report/room/detail', [AppsController::class, 'reportRoomDetail'])->name('app-report-room-detail');
    Route::get('report/room/print', [AppsController::class, 'reportRoomPrint'])->name('app-report-room-print');
    Route::get('user/list', [AppsController::class, 'user_list'])->name('app-user-list');
    Route::get('room/list', [AppsController::class, 'room_list'])->name('app-room-list');
});
/* Route Apps */

/* Route Pages */
Route::group(['prefix' => 'page'], function () {
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
    Route::get('success-verify', [AuthenticationController::class, 'success_verify'])->name('success-verify');
});
/* Route Authentication Pages */