<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CategoryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get("/", function () {
    return Inertia::render("News/pages/ListNews");
});

// Route::get("/news/{id}", function () {
//     return Inertia::render("News/DetailNews");
// });


// API NEWS:
// Get All News
Route::get("/api/news", [ApiController::class, "get_news"]);

// Get All Categories
Route::get("/api/categories", [ApiController::class, "get_categories"]);

// Get News by Category
Route::get("/api/category_news", [ApiController::class, "get_category_news"]);

// Get Detail News by ID
Route::get("/news/{slug}", [ApiController::class, "get_detail_news"]);


Route::get('/dashboard', function () {
    return Inertia::render('CMS/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



// Manage News


// Manage Category News
Route::get('/dashboard/categories', [CategoryController::class, 'index'])
->middleware(['auth', 'verified'])
->name('categories.index');


// Add category
Route::get('/dashboard/categories/create', [CategoryController::class, 'create'])
->middleware(['auth', 'verified']);
Route::post('/dashboard/categories', [CategoryController::class, 'store'])
->middleware(['auth', 'verified']);

// Edit category
Route::get('/dashboard/categories/{id}', [CategoryController::class, 'edit'])
->middleware(['auth', 'verified']);
Route::put('/dashboard/categories/{id}', [CategoryController::class, 'update'])
->middleware(['auth', 'verified']);

// Delete category
Route::delete('/dashboard/categories/{id}', [CategoryController::class, 'destroy'])
->middleware(['auth', 'verified']);



// Manage Author
Route::get('/dashboard/authors', [AuthorController::class, 'index'])
->middleware(['auth', 'verified']);
// Add Author
Route::get('/dashboard/authors/create', [AuthorController::class, 'create'])
->middleware(['auth', 'verified']);
Route::post('/dashboard/authors', [AuthorController::class, 'store'])
->middleware(['auth', 'verified']);

// Edit Author
Route::get('/dashboard/authors/{id}', [AuthorController::class, 'edit'])
->middleware(['auth', 'verified']);
Route::put('/dashboard/authors/{id}', [AuthorController::class, 'update'])
->middleware(['auth', 'verified']);
// Delete Author
Route::delete('/dashboard/authors/{id}', [AuthorController::class, 'destroy'])
->middleware(['auth', 'verified']);







Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
