<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManagerController extends Controller
{
    // 🔍 Show all admins
    public function index()
{
    $cars = Car::all(); // Fetch all cars from the database

    return Inertia::render('Manager/Dashboard', [
        'cars' => $cars, // Pass cars to your Dashboard
    ]);
}


    // ➕ Show create form
    public function create()
    {
        $admins = User::where('role', 'admin')
                    ->select(['id', 'name', 'email', 'copy_pass', 'created_at'])
                    ->latest()
                    ->get()
                    ->map(function ($admin) {
                        return [
                            'id' => $admin->id,
                            'name' => $admin->name,
                            'email' => $admin->email,
                            'copy_pass' => $admin->copy_pass,
                            'created_at' => $admin->created_at,
                        ];
                    });

        return Inertia::render('Manager/CreateAdmin', [
            'admins' => $admins,
        ]);
    }


    // 💾 Store new admin
    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:6',
    ]);

    User::create([
        'name' => $request->name,
        'email' => $request->email,
        'copy_pass' => $request->password,
        'password' => bcrypt($request->password),
        'role' => 'admin',
    ]);

    return redirect()->back()->with('success', 'Admin created successfully.');
}


    // show list of admins
    public function show(string $id)
{
    $car = Car::findOrFail($id);

    return Inertia::render('Manager/ShowCar', [
        'car' => $car
    ]);
}


    // ✏️ Show edit form
    public function edit(User $admin)
    {
        //
    }

    // 🛠️ Update admin
    public function update(Request $request, User $admin)
    {
        //
    }

    // 🗑️ Delete admin
    public function destroy(User $manager)
{
    if ($manager->role === 'admin') {
        $manager->delete();
        return redirect()->back()->with('success', 'Admin deleted successfully.');
    }

    return redirect()->back()->with('error', 'Only admins can be deleted here.');
}



public function reservations()
{
    // Fetch all reservations with their associated car and user
    $reservations = Reservation::with(['car', 'user']) // Eager load car and user
        ->orderBy('created_at', 'desc')
        ->get();

    return Inertia::render('Manager/Reservations', [
        'reservations' => $reservations,
    ]);
}

}
