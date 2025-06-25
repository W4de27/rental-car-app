<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $cars = Car::where('availability', 'available')->get();

    return Inertia::render('User/Dashboard', [
        'cars' => $cars,
    ]);
}



    /**
     * Show the form for creating a new resource.
     */

    public function create($carId)
{
    $car = Car::findOrFail($carId);

    return Inertia::render('User/CreateReserve', [
        'car' => $car,
    ]);
}

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    $request->validate([
        'car_id' => 'required|exists:cars,id',
        'phone' => 'required|string|max:20',
        'start_date' => 'required|date|after_or_equal:today',
        'end_date' => 'required|date|after:start_date',
    ]);

    // Get car and user
    $car = Car::findOrFail($request->car_id);
    $user = Auth::user();

    // Calculate duration (in days)
    $start = Carbon::parse($request->start_date);
    $end = Carbon::parse($request->end_date);
    $duration = $start->diffInDays($end);

    // Calculate total price
    $totalPrice = $car->daily_price * $duration;

    // Generate reservation code (Option 1: max + 1)
    $lastCode = Reservation::max('reservation_code') ?? 99999;
    $reservationCode = $lastCode + 1;

    // Create reservation
    Reservation::create([
        'user_id' => $user->id,
        'car_id' => $car->id,
        'phone' => $request->phone,
        'reservation_code' => $reservationCode,
        'start_date' => $request->start_date,
        'end_date' => $request->end_date,
        'duration' => $duration,
        'total_price' => $totalPrice,
        'status' => 'Pending',
        'price_paid' => 0,
        'validation' => 'No Validate',
    ]);

    return redirect()->route('user.history')->with('success', 'Reservation created successfully!');
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
{
    $car = Car::findOrFail($id);

    return Inertia::render('User/ShowCar', [
        'car' => $car
    ]);
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        // return Inertia::render('User/HistoryReservation');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
{
    $reservation = Reservation::findOrFail($id);
    $reservation->delete();

    return redirect()->route('user.history')->with('success', 'Car deleted successfully.');
}

    
    public function history()
{
    // Fetch reservations for the logged-in user
    $reservations = Reservation::with('car') // Eager load car info if needed
        ->where('user_id', Auth::id())
        ->orderBy('created_at', 'desc')
        ->get();

    // Fetch the logged-in user's information
    $user = Auth::user(); // This retrieves the currently authenticated user

    // Pass both reservations and user info to the frontend
    return Inertia::render('User/HistoryReservation', [
        'reservations' => $reservations,
        'user' => $user, // Use a different name for the user info
    ]);
}

}
