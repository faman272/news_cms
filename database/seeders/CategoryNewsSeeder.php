<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\News;
use App\Models\Category;
use App\Models\CategoryNews;

class CategoryNewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $categories_id = Category::pluck("id")->toArray();
        $news_id = News::pluck("id")->toArray();


        foreach (range(1, 10) as $i) {
            CategoryNews::create([
                "news_id" => $faker->randomElement($news_id),
                "category_id"=> $faker->randomElement($categories_id),
            ]);
        }

    }
}
