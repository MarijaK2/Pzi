<?php

namespace App\Http\Controllers;

abstract class Controller
{
    public function share()
{
    if (auth()->check()) {
        $recentMessages = Message::latest()
            ->take(5)
            ->get();

        view()->share('messages', $recentMessages);
    }
    
}
public function index()
{
    $messages = Message::with('contact') 
                ->latest()
                ->take(5)
                ->get();
                
    $contacts = Contact::select('phone', 'name')->get();

    return Inertia::render('Dashboard', [
        'messages' => $messages,
        'contacts' => $contacts,
    ]);
}
}
