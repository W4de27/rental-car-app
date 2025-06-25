<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // ✅ Create the user with default role "user"
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'copy_pass' => $request->password,
            'password' => Hash::make($request->password),
            'role' => 'user', // 👈 Set default role
        ]);

        event(new Registered($user));

        Auth::login($user);

        // ✅ Redirect to the correct dashboard based on role
        if ($user->role === 'admin') {
            return redirect()->route('admin.index');
        } elseif ($user->role === 'manager') {
            return redirect()->route('manager.index'); 
        } elseif ($user->role === 'user') {
            return redirect()->route('user.index');
        }

        // 🚫 Remove or comment out this fallback if not needed
        // return redirect()->route('default.dashboard');
        
        return redirect('/'); // 👈 Optional fallback to homepage
    }
}
