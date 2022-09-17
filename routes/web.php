<?php

use App\Http\Controllers\ComputerBuildController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\HomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index']);

// Route::get('/', function () {
//     return redirect('/register');

//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('comp-build', ComputerBuildController::class)->middleware('hasanyrole:user|admin');
Route::name('admin.')->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->middleware('hasanyrole:admin|user')->name('index');
    Route::get('/admin/create', [AdminController::class, 'create'])->middleware('role:admin')->name('create');
    Route::post('/admin/store', [AdminController::class, 'store'])->middleware('role:admin')->name('store');

});




require __DIR__.'/auth.php';
