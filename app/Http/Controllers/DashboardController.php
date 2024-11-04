<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\News;
use App\Models\Author;

class DashboardController extends Controller
{
    public function index() {
        $authorsCount = Author::count();
        $newsCount = News::count();

        $news = News::with("author")
        ->with("categories")
        ->orderBy("created_at", "desc")
        ->take(3)
        ->get();



        return Inertia::render("CMS/Dashboard", [
            "authorsCount" => $authorsCount,
            "newsCount" => $newsCount,
            "news" => $news
        ]);
    }
}
