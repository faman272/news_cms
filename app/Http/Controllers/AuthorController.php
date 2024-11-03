<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Author;
use Inertia\Inertia;

class AuthorController extends Controller
{
    public function index() {
        $authors = Author::orderBy('created_at', 'desc')->get();
        return Inertia::render("CMS/pages/Author/Authors", [
            "authors" => $authors
        ]);
    }

    public function create() {
        return Inertia::render("CMS/pages/Author/AddAuthor");
    }

    public function store(Request $request) {
        // Just Name and Email
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email'
        ]);
        $author = new Author();
        $author->name = $request->name;
        $author->email = $request->email;
        $author->save();

        return response()->json(['message' => 'Author created successfully!', 'author' => $author], 201);

    }

    public function edit($id) {
        $author = Author::find($id);
        return Inertia::render("CMS/pages/Author/EditAuthor", [
            "author" => $author
        ]);
    }

    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email'
        ]);

        $author = Author::find($id);
        $author->name = $request->name;
        $author->email = $request->email;
        $author->save();

        return response()->json(['message' => 'Author updated successfully!', 'author' => $author], 200);
    }


    public function destroy($id) {
        $author = Author::find($id);
        $author->delete();

        return response()->json(['message' => 'Author deleted successfully!'], 200);
    }

}
