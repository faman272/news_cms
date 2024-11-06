I have controller right here:

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

And Route Right Here:
Routes web.php:
Route::put('dashboard/news/{id}', [NewsController::class, 'update']);
