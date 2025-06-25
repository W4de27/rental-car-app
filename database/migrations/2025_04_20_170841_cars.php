<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('model');
            $table->integer('year');
            $table->enum('transmission', ['Manual', 'Automatic']);
            $table->enum('fuel_type', ['Essence', 'Diesel', 'Hybride']);
            $table->integer('daily_price');
            $table->integer('stars')->default(3);
            $table->integer('reviews')->default(0);
            $table->enum('slug', ['City', 'Off-Road' , 'Luxury' , 'Family' , 'Economic' , 'Prestige']);
            $table->integer('seats')->nullable();
            $table->string('image');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cars');
    }
};