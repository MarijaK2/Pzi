<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'contact_id',
        'phone',
        'message'
    ];

    public function contact()
    {
        return $this->belongsTo(Contact::class, 'phone', 'phone');
    }
}