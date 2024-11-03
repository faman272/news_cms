<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $guarded = [];

    public function categories() {
        return $this->belongsToMany(Category::class);
    }

    public function author() {
        return $this->belongsTo(Author::class);
    }
}
