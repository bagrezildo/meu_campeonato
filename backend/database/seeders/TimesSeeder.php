<?php

namespace Database\Seeders;

use App\Models\Time;
use Illuminate\Database\Seeder;

class TimesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $times = [
            ['name' => 'Palmeiras'],
            ['name' => 'Grêmio'],
            ['name' => 'Atlético-MG'],
            ['name' => 'Flamengo'],
            ['name' => 'Botafogo'],
            ['name' => 'Red Bull Bragantino'],
            ['name' => 'Fluminense'],
            ['name' => 'Athletico-PR'],
            ['name' => 'Internacional'],
            ['name' => 'Fortaleza'],
            ['name' => 'São Paulo'],
            ['name' => 'Cuiabá'],
            ['name' => 'Corinthians'],
            ['name' => 'Cruzeiro'],
            ['name' => 'Vasco'],
            ['name' => 'Bahia'],
            ['name' => 'Santos'],
            ['name' => 'Goiás'],
            ['name' => 'Coritiba'],
            ['name' => 'América-MG'],
        ];

        foreach ($times as $time) {
            Time::create($time);
        }

       // DB::table('times')->insert($times);
    }
}
