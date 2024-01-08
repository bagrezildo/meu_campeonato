<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Time;
use App\Models\Campeonato;
use Illuminate\Http\Request;

class CampeonatoController extends Controller
{
    public function criaTime(request $request){
        return Time::create([
            'name' => $request->input('name'),
        ]);
    }

    public function listaTimes(){
        return Time::all();
    }

    public function buscaTime($id){
        return Time::find($id);
    }


    public function criaCampeonato(request $request){
        return Campeonato::create([
            'name' => $request->input('name'),
        ]);
    }

    public function listaCampeonatos(){
        return Campeonato::all();
    }

    public function resultadoCampeonato($campeonato_id){
        $partidas = DB::table('partidas')
            ->join('fase', 'partidas.fase_id', '=', 'fase.id')
            ->join('times as t1', 'partidas.time_casa_id', '=', 't1.id')
            ->join('times as t2', 'partidas.time_visitante_id', '=', 't2.id')
            ->where('partidas.campeonato_id', $campeonato_id)
            ->select(
                'fase.nome as fase',
                'partidas.gols_time_casa',
                'partidas.gols_time_visitante',
                't1.name as time_casa',
                't2.name as time_visitante',
                DB::raw("CASE WHEN t1.id = partidas.vencedor_id THEN t1.name ELSE t2.name END as nome_vencedor")
            )->get();

        return $partidas;
    }

    public function historicoCampeonatos(){
        $campeonatos = Campeonato::all();
        $historico = array();
        foreach($campeonatos as $campeonato){
            $historico[$campeonato->id] = DB::table('partidas')
            ->join('fase', 'partidas.fase_id', '=', 'fase.id')
            ->join('times as t1', 'partidas.time_casa_id', '=', 't1.id')
            ->join('times as t2', 'partidas.time_visitante_id', '=', 't2.id')
            ->where('partidas.campeonato_id', $campeonato->id)
            ->select(
                'fase.nome as fase',
                'partidas.gols_time_casa',
                'partidas.gols_time_visitante',
                't1.name as time_casa',
                't2.name as time_visitante',
                DB::raw("CASE WHEN t1.id = partidas.vencedor_id THEN t1.name ELSE t2.name END as nome_vencedor")
            )->get();
        }
        return $historico;
    }
    
}
