<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;



class ReservationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    // Fetch all reservations with their associated car and user
    $reservations = Reservation::with(['car', 'user']) // Eager load car and user
        ->orderBy('created_at', 'desc')
        ->get();

    return Inertia::render('Admin/AllReservations', [
        'reservations' => $reservations,
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
{
    $reservation = Reservation::with('user')->findOrFail($id); // eager load user
    $car = Car::findOrFail($reservation->car_id);
    $user = $reservation->user; // get the user who made the reservation

    return Inertia::render('Admin/EditReservation', [
        'reservation' => $reservation,
        'car' => $car,
        'user' => $user
    ]);
}


    /**
     * Update the specified resource in storage.
     */




public function update(Request $request, $id)
{
    // Find the reservation by ID
    $reservation = Reservation::findOrFail($id);

    // Validate incoming request data
    $validated = $request->validate([
        'phone' => 'required|string|max:20',
        'start_date' => 'required|date',
        'end_date' => 'required|date|after_or_equal:start_date',
        'price_paid' => 'required|numeric|min:0',
        'status' => 'required|in:Pending,Confirmed,Active,Completed,Cancelled',
        'validation' => 'nullable|in:Validate,No Validate',
    ]);

    // Fetch the associated car
    $car = Car::findOrFail($reservation->car_id);

    // Calculate duration and total price
    $start = Carbon::parse($request->start_date);
    $end = Carbon::parse($request->end_date);
    $duration = $start->diffInDays($end);
    $totalPrice = $car->daily_price * $duration;

    // Update car availability based on reservation status
    if ($request->status === 'Confirmed' && $car->availability !== 'not_available') {
        $car->update(['availability' => 'not_available']);
    } elseif ($request->status === 'Completed' && $car->availability !== 'available') {
        $car->update(['availability' => 'available']);
    }

    // Update the reservation
    $reservation->update([
        ...$validated,
        'duration' => $duration,
        'total_price' => $totalPrice,
    ]);

    // Redirect back with success
    return redirect()->route('reservation.index')->with('success', 'Reservation updated successfully.');
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
{
    $reservation = Reservation::findOrFail($id);
    $reservation->delete();

    return redirect()->route('reservation.index')->with('success', 'Car deleted successfully.');
}

    
}
