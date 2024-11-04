<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;
use App\Models\Category;
use App\Models\CategoryNews;
use Inertia\Inertia;


class ApiController extends Controller
{
    public function get_news() {
        // $news = News::orderBy("created_at","desc")->get();

        $news = News::with("categories")
        ->orderBy('created_at', 'desc')
        ->get();

        return response()->json($news);
    }

    public function get_categories() {
        $categories = Category::orderBy("created_at","desc")->get();

        return response()->json($categories);
    }


    public function get_category_news() {
        $category_news = CategoryNews::all();
        return response()->json($category_news);
    }

    public function get_detail_news($slug) {
        
        $news = News::with('categories')->where("slug", $slug)->first();

        $author = $news->author->name;

        // Paginate max 3 order by created_at desc
        
        $otherNews = News::where("id", "!=", $news->id)->orderBy("created_at", "desc")->take(3)->get();

        return Inertia::render("News/pages/DetailNews", [
            "news" => $news,
            "author" => $author,
            "otherNews" => $otherNews
        ]);
    }
}
