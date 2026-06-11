<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModelItemSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('modelitem')->insert([
            ['brand_id' => 1, 'name' => 'Galaxy S24'],
            ['brand_id' => 1, 'name' => 'Galaxy A55'],

            ['brand_id' => 2, 'name' => 'iPhone 15'],
            ['brand_id' => 2, 'name' => 'iPhone 14'],

            ['brand_id' => 3, 'name' => 'Redmi Note 13'],
            ['brand_id' => 3, 'name' => 'Poco X6'],

            ['brand_id' => 4, 'name' => 'Oppo Reno 11'],
            ['brand_id' => 4, 'name' => 'Oppo A78'],

            ['brand_id' => 5, 'name' => 'Vivo V30'],
            ['brand_id' => 5, 'name' => 'Vivo Y28'],
        ]);
    }
}