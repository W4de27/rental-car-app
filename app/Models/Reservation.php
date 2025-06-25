<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    // app/Models/Reservation.php
    use HasFactory;
    protected $fillable = ['user_id','car_id','phone','reservation_code','start_date','end_date','duration','total_price','status','price_paid','validation'];

public function user()
{
    return $this->belongsTo(User::class);
}

public function car()
{
    return $this->belongsTo(Car::class);
}

}
