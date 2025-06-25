<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('car_id')->constrained()->onDelete('cascade');
            $table->string('phone');
            $table->unsignedBigInteger('reservation_code')->unique();
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('duration');
            $table->integer('total_price');
            $table->integer('price_paid')->default(0);
            $table->enum('status', ['Pending', 'Confirmed', 'Active', 'Completed', 'Cancelled'])->default('Pending');
            $table->enum('validation' , ['Validate' , 'No Validate']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reservations');
    }
};
