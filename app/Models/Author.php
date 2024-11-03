<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Author extends Model
{
    use HasFactory;

    public $incrementing = false; // Nonaktifkan auto-increment untuk UUID

    protected static function boot()
    {
        parent::boot();

        // Menetapkan UUID sebelum membuat data
        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    public function news() {
        return $this->hasMany(News::class);
    }
}
