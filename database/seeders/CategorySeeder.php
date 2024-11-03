<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Pendidikan Berkualitas', 'Kehidupan Sehat dan Sejahtera', 'Tanpa Kelaparan', 'Industri, Inovasi dan Infrastruktur', 'Berkurangnya Kesenjangan', 'Tanpa Kemiskinan', 
        ];

        foreach ($categories as $index => $categoryName) {
            Category::create([
                'name' => $categoryName, 
                'slug' => Str::slug($categoryName), // Membuat slug berdasarkan nama kategori
            ]);
        }
    }
}
