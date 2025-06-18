<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ContactController;
use App\Models\Message;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/messages', [MessageController::class, 'index'])->name('messages.index');
    Route::get('/message', [MessageController::class, 'create'])->name('message.create');
    Route::post('/message', [MessageController::class, 'store'])->name('message.store');

    Route::get('/contacts', [ContactController::Class, 'index'])->name('contacts.index');
    Route::post('/contacts', [ContactController::Class, 'store'])->name('contacts.store');
    Route::get('/contacts/add', [ContactController::class, 'add'])->name('contacts.add'); 
    Route::get('/contacts/{contact}/edit', [ContactController::class, 'edit'])->name('contacts.edit'); 
    Route::put('/contacts/{contact}/', [ContactController::class, 'update'])->name('contacts.update'); 
    Route::delete('/contacts/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy'); 
    
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';