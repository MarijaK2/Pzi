<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Contact;
use Illuminate\Validation\Rule;

class ContactController extends Controller
{
    public function index() {
        $contacts = Contact::all();
        return Inertia::render('Contacts/Index', compact('contacts'));
    }

    public function add() {
        return Inertia::render('Contacts/Add');
    }
    
    public function edit(Contact $contact) {
        return Inertia::render('Contacts/Edit', compact('contact'));
    }

    public function update(Request $request, Contact $contact) 
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'phone' => [
            'required',
            'string',
            'regex:/^\+\d{1,15}$/',
            Rule::unique('contacts')->ignore($contact->id)
        ],
        'email' => 'nullable|email|max:255',
        'notes' => 'nullable|string'
    ]);

    $contact->update($validated);

    return redirect()->route('contacts.index')->with('message', 'Kontakt azuriran!');
}

    public function destroy(Contact $contact) {
        $contact->delete();
        return redirect()->route('contacts.index')->with('message', 'Kontakt izbrisan!');
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'phone' => 'required|string|regex:/^\+\d{1,15}$/|unique:contacts,phone',
        'email' => 'nullable|email|max:255',
        'notes' => 'nullable|string'
    ]);

    try {
        $contact = Contact::create($validated);
        
        return redirect()->route('contacts.index')
                       ->with('message', 'Kontakt uspjesno dodan!');
        
    } catch (Exception $e) {
        return back()->withErrors([
            'phone' => 'Greska pri dodavanju kontakta: ' . $e->getMessage()
        ]);
    }
}
}
