<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    // app/Models/Car.php
    use HasFactory;
    protected $fillable = ['model','year','transmission','fuel_type','daily_price','stars','reviews','slug','seats', 'availability' ,'image'];


public function reservations()
{
    return $this->hasMany(Reservation::class);
}
}
