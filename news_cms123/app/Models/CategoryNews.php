<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryNews extends Model
{
    use HasFactory;

    protected $guarded = [];
    
    public function category() {
        return $this->belongsToMany(Category::class, "category_id");
    }

    public function news() {
        return $this->belongsToMany(News::class);
    }

}
