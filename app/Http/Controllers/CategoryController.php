<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index() {
        $categories = Category::all();
        return Inertia::render("CMS/pages/CategoryNews/ListCategories", [
            "categories" => $categories
        ]);
    }


    public function create() {
        return Inertia::render("CMS/pages/CategoryNews/AddCategory");
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = new Category();
        $category->name = $request->name;
        $category->slug = $request->slug;
        $category->save();

        return response()->json(['message' => 'Category created successfully!', 'category' => $category], 201);
    }


    public function destroy($id) {
        $category = Category::find($id);
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully!'], 200);
    }

    public function edit($id) {
        $category = Category::find($id);
        return Inertia::render("CMS/pages/CategoryNews/EditCategory", [
            "category" => $category
        ]);
    }

    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = Category::find($id);
        $category->name = $request->name;
        $category->slug = $request->slug;
        $category->save();

        return response()->json(['message' => 'Category updated successfully!', 'category' => $category], 200);
    }


}
