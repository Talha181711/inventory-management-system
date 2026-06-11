<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('items')->insert([

            // Samsung
            ['name' => 'Galaxy S24 128GB', 'amount' => 240000, 'brand_id' => 1, 'model_id' => 1],
            ['name' => 'Galaxy S24 256GB', 'amount' => 270000, 'brand_id' => 1, 'model_id' => 1],
            ['name' => 'Galaxy A55 128GB', 'amount' => 115000, 'brand_id' => 1, 'model_id' => 2],
            ['name' => 'Galaxy A55 256GB', 'amount' => 130000, 'brand_id' => 1, 'model_id' => 2],
            ['name' => 'Galaxy A55 Used', 'amount' => 90000, 'brand_id' => 1, 'model_id' => 2],

            // Apple
            ['name' => 'iPhone 15 128GB', 'amount' => 285000, 'brand_id' => 2, 'model_id' => 3],
            ['name' => 'iPhone 15 256GB', 'amount' => 320000, 'brand_id' => 2, 'model_id' => 3],
            ['name' => 'iPhone 14 128GB', 'amount' => 220000, 'brand_id' => 2, 'model_id' => 4],
            ['name' => 'iPhone 14 256GB', 'amount' => 250000, 'brand_id' => 2, 'model_id' => 4],
            ['name' => 'iPhone 14 Used', 'amount' => 175000, 'brand_id' => 2, 'model_id' => 4],

            // Xiaomi
            ['name' => 'Redmi Note 13 8GB', 'amount' => 70000, 'brand_id' => 3, 'model_id' => 5],
            ['name' => 'Redmi Note 13 Pro', 'amount' => 95000, 'brand_id' => 3, 'model_id' => 5],
            ['name' => 'Poco X6 8GB', 'amount' => 85000, 'brand_id' => 3, 'model_id' => 6],
            ['name' => 'Poco X6 12GB', 'amount' => 105000, 'brand_id' => 3, 'model_id' => 6],
            ['name' => 'Poco X6 Pro', 'amount' => 120000, 'brand_id' => 3, 'model_id' => 6],

            // Oppo
            ['name' => 'Oppo Reno 11', 'amount' => 110000, 'brand_id' => 4, 'model_id' => 7],
            ['name' => 'Oppo Reno 11 Pro', 'amount' => 145000, 'brand_id' => 4, 'model_id' => 7],
            ['name' => 'Oppo A78 8GB', 'amount' => 65000, 'brand_id' => 4, 'model_id' => 8],
            ['name' => 'Oppo A78 12GB', 'amount' => 78000, 'brand_id' => 4, 'model_id' => 8],
            ['name' => 'Oppo A78 Used', 'amount' => 50000, 'brand_id' => 4, 'model_id' => 8],

            // Vivo
            ['name' => 'Vivo V30 8GB', 'amount' => 115000, 'brand_id' => 5, 'model_id' => 9],
            ['name' => 'Vivo V30 12GB', 'amount' => 130000, 'brand_id' => 5, 'model_id' => 9],
            ['name' => 'Vivo Y28 6GB', 'amount' => 50000, 'brand_id' => 5, 'model_id' => 10],
            ['name' => 'Vivo Y28 8GB', 'amount' => 62000, 'brand_id' => 5, 'model_id' => 10],
            ['name' => 'Vivo Y28 Used', 'amount' => 40000, 'brand_id' => 5, 'model_id' => 10],

        ]);
    }
}