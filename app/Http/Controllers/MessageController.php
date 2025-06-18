<?php

namespace App\Http\Controllers;

use Twilio\Rest\Client;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Message;
use Illuminate\Support\Facades\Log;
use App\Models\Contact;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::latest()->get();
        return Inertia::render('Messages/Index', compact('messages'));
    }

    public function create(Request $request) {
        return Inertia::render('Messages/Index', [
            'phone' => $request->input('phone', '')
        ]);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'phone' => 'required|string|regex:/^\+\d{1,15}$/',
        'message' => 'required|string|max:1600'
    ]);

    $contact = Contact::where('phone', $validated['phone'])->first();

    $twilioSid = env('TWILIO_SID');
    $twilioAuthToken = env('TWILIO_AUTH_TOKEN');
    $twilioWhatsappNumber = 'whatsapp:' . env('TWILIO_WHATSAPP_NUMBER');
    $to = 'whatsapp:' . $validated['phone'];

    try {
        $client = new Client($twilioSid, $twilioAuthToken);
        
        $twilioMessage = $client->messages->create(
            $to,
            [
                'from' => $twilioWhatsappNumber,
                'body' => $validated['message']
            ]
        );

        $message = Message::create([
            'phone' => $validated['phone'],
            'message' => $validated['message'],
            'contact_id' => $contact ? $contact->id : null
        ]);

        return redirect()->route('message.create')
                       ->with('success', 'Poruka uspjesno poslana! SID: ' . $twilioMessage->sid);

    } catch (Exception $e) {
        Log::error('WhatsApp slanje neuspjesno', [
            'error' => $e->getMessage(),
            'phone' => $validated['phone'] ?? null
        ]);

        return back()->withErrors([
            'phone' => 'Greska pri slanju poruke: ' . $e->getMessage()
        ]);
    }
}
}