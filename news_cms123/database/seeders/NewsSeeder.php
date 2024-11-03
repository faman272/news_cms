<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\News;
use App\Models\Author;
use App\Models\Category;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Mendapatkan semua id dari tabel author
        $authors_id = Author::pluck("id")->toArray();

        foreach (range(1, 10) as $i) {
            News::create([
                'title' => $faker->sentences(1, true),
                'slug'=> $faker->slug,
                'subtitle' => $faker->sentences(3, true),
                'content' => $faker->paragraphs(10, true),
                'author_id' => $faker->randomElement($authors_id),
                'image' => "images/berita$i.jpg",
            ]);
        }
    }
}
