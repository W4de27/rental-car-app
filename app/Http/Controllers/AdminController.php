<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Container\Attributes\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cars = Car::all(); // Fetch all cars from the database

    return Inertia::render('Admin/Dashboard', [
        'cars' => $cars, // Pass cars to your Dashboard
    ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/CreateCar');
    }

    /**
     * Store a newly created resource in storage.
     */

public function store(Request $request)
{
    // 1. Validate the form data
    $request->validate([
        'model' => 'required|string|max:255',
        'year' => 'required|integer|min:1900|max:' . date('Y'),
        'transmission' => 'required|in:Manual,Automatic',
        'fuel_type' => 'required|in:Essence,Diesel,Hybride',
        'daily_price' => 'required|numeric|min:0',
        'slug' => 'required|in:City,Off-Road,Luxury,Family,Economic,Prestige',
        'seats' => 'nullable|integer|min:4|max:11',
        'image' => 'required|image',
    ]);

    // 2. Handle the image upload
    $imagePath = $request->file('image')->store('cars', 'public');

    // 3. Generate random stars and reviews
    $randomStars = rand(3, 5);
    $randomReviews = rand(100000, 1000000);

    // 4. Create the car record
    Car::create([
        'model' => $request['model'],
        'year' => $request['year'],
        'transmission' => $request['transmission'],
        'fuel_type' => $request['fuel_type'],
        'daily_price' => $request['daily_price'],
        'slug' => $request['slug'],
        'seats' => $request['seats'],
        'image' => $imagePath,
        'stars' => $randomStars,
        'reviews' => $randomReviews,
    ]);

    // 5. Redirect or return response
    return redirect()->route('admin.index')->with('success', 'Car created successfully!');
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
{
    $car = Car::findOrFail($id);

    return Inertia::render('Admin/ShowCar', [
        'car' => $car
    ]);
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $car = Car::findOrFail($id);
    return Inertia::render('Admin/EditCar', [
        'car' => $car
    ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
{
    $car = Car::findOrFail($id); // Manually find the car

    $validated = $request->validate([
        'model' => 'required|string|max:255',
        'year' => 'required|integer|min:1900|max:' . date('Y'),
        'transmission' => 'required|in:Manual,Automatic',
        'fuel_type' => 'required|in:Essence,Diesel,Hybride',
        'daily_price' => 'required|numeric|min:0',
        'slug' => 'required|in:City,Off-Road,Luxury,Family,Economic,Prestige',
        'seats' => 'nullable|integer|min:4|max:11',
        'image' => 'image|mimes:jpg,jpeg,png,gif,webp,svg|max:2048', // Optional image
    ]);

    if ($request->hasFile('image')) {
        $validated['image'] = $request->file('image')->store('cars', 'public');
    }

    $car->update($validated);

    return redirect()->route('admin.index')->with('success', 'Car updated!');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
{
    $car = Car::findOrFail($id);

    $car->delete();

    return redirect()->route('admin.index')->with('success', 'Car deleted successfully.');
}


}
