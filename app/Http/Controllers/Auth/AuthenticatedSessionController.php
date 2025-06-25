<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */

// In AuthenticatedSessionController.php

public function store(Request $request)
{
    $credentials = $request->only('email', 'password');

    // Attempt to log in the user
    if (Auth::attempt($credentials)) {
        $user = Auth::user();

        // Check the user's role and redirect accordingly
        if ($user->role === 'admin') {
            return redirect()->route('admin.index'); // Redirect to admin dashboard
        } elseif ($user->role === 'manager') {
            return redirect()->route('manager.index'); // ✅ This will call ManagerController@index
        } elseif ($user->role === 'user') {
            return redirect()->route('user.index'); // Redirect to user dashboard
        }
        return redirect('/');
    }

    // If login failed, return back with an error message
    return back()->withErrors([
        'email' => 'The provided credentials do not match our records.',
    ]);
}



    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
