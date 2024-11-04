<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;
use App\Models\News;
use App\Models\Category;
use Inertia\Inertia;
use Log;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    public function index()
    {
        // With author
        $news = News::with("author")->with("categories")->orderBy("created_at", "desc")->get();
        return Inertia::render("CMS/pages/News/News", [
            "news" => $news
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        $authors = Author::all();
        
        return Inertia::render("CMS/pages/News/AddNews", [
            "categories" => $categories,
            "authors" => $authors
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:news',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'author_id' => 'required|exists:authors,id',
            'categories' => 'required|array',
            'categories.*' => 'exists:categories,id',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images/news', 'public');
        }

        $news = News::create([
            'title' => $request->title,
            'slug' => $request->slug,
            'subtitle' => $request->subtitle,
            'content' => $request->content,
            'image' => $imagePath,
            'author_id' => $request->author_id,
        ]);

        $news->categories()->attach($request->categories);

        return Inertia::render("CMS/pages/News/News");
    }

    public function edit($id)
    {
        $news = News::with("categories")->find($id);
        $categories = Category::all();
        $authors = Author::all();
        return Inertia::render("CMS/pages/News/EditNews", [
            "news" => $news,
            "categories" => $categories,
            "authors" => $authors
        ]);
    }

    public function update(Request $request, $id)
    {
        $news = News::find($id);
        if (!$news) {
            return response()->json(['error' => 'News not found'], 404);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string',
            'content' => 'required|string',
            'author_id' => 'required|exists:authors,id',
            'categories' => 'array',
            'categories.*' => 'exists:categories,id',
        ]);
        

        $news->title = $request->title;
        $news->slug = $request->slug;
        $news->subtitle = $request->subtitle;
        $news->content = $request->content;
        $news->author_id = $request->author_id;
        $news->categories()->sync($request->categories);
        $news->save();

        return response()->json(['message' => 'Category updated successfully!', 'news' => $news], 200);

    }


    // khusus update image
    public function updateImage(Request $request, $id)
    {
        $news = News::find($id);
        if (!$news) {
            return response()->json(['error' => 'News not found'], 404);
        }

        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Delete old image
        if ($news->image) {
            Storage::disk('public')->delete($news->image);
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images/news', 'public');
        }

        $news->image = $imagePath;
        $news->save();

        return response()->json(['message' => 'Image updated successfully!', 'news' => $news], 200);
    }

    public function destroy($id)
    {
        $news = News::find($id);
        if (!$news) {
            return response()->json(['error' => 'News not found'], 404);
        }

        $news->categories()->detach();
        $news->delete();

        return response()->json(['message' => 'News deleted successfully']);
    }

}
