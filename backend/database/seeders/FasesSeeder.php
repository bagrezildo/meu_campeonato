<?php

namespace Database\Seeders;

use App\Models\Fase;
use Illuminate\Database\Seeder;

class FasesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fases = [
            ['nome' => 'Quartas de Final'],
            ['nome' => 'Semifinal'],
            ['nome' => 'Final'],
            ['nome' => 'Terceiro Lugar'],
        ];

        foreach($fases as $fase){
            Fase::create($fase);
        }
       // DB::table('fases')->insert($fases);
    }
}
