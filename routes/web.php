<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\CategoryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", function () {
    return Inertia::render("News/Index");
});

// API NEWS:
Route::prefix('api')->group(function () {
    // Get All News
    Route::get("/news", [ApiController::class, "get_news"]);

    // Get All Categories
    Route::get("/categories", [ApiController::class, "get_categories"]);

    // Get News by Category
    Route::get("/category_news", [ApiController::class, "get_category_news"]);
});

// Detail News
Route::get("/news/{slug}", [ApiController::class, "get_detail_news"]);

// Dashboard
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Manage Categories
    Route::prefix('dashboard/categories')->group(function () {
        Route::get('/', [CategoryController::class, 'index'])->name('categories.index');
        Route::get('/create', [CategoryController::class, 'create']);
        Route::post('/', [CategoryController::class, 'store']);
        Route::get('/{id}', [CategoryController::class, 'edit']);
        Route::put('/{id}', [CategoryController::class, 'update']);
        Route::delete('/{id}', [CategoryController::class, 'destroy']);
    });

    // Manage Authors
    Route::prefix('dashboard/authors')->group(function () {
        Route::get('/', [AuthorController::class, 'index']);
        Route::get('/create', [AuthorController::class, 'create']);
        Route::post('/', [AuthorController::class, 'store']);
        Route::get('/{id}', [AuthorController::class, 'edit']);
        Route::put('/{id}', [AuthorController::class, 'update']);
        Route::delete('/{id}', [AuthorController::class, 'destroy']);
    });

    // Manage News
    Route::prefix('dashboard/news')->group(function () {
        Route::get('/', [NewsController::class, 'index']);
        Route::get('/create', [NewsController::class, 'create']);
        Route::post('/create', [NewsController::class, 'store']);
        Route::get('/{id}', [NewsController::class, 'edit']);
        Route::put('/{id}', [NewsController::class, 'update']);
        Route::post('/image/{id}', [NewsController::class, 'updateImage']);
        Route::delete('/{id}', [NewsController::class, 'destroy']);
    });
});

require __DIR__.'/auth.php';
