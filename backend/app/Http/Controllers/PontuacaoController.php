<?php

namespace App\Http\Controllers;

use App\Models\Pontuacao;
use App\Model\Campeonato;
use Illuminate\Http\Request;

class PontuacaoController extends Controller
{
    public function comecaCampeonato(request $request){
        return Pontuacao::create([
            'campeonato_id' => $request->input('campeonato_id'),
            'time_id' => $request->input('time_id'),
            'pontos' => 0,
        ]);
    }

    public function listaPontuacaoCampeonato($campeonato_id){
        return Pontuacao::join('times', 'pontuacao_campeonato.time_id', '=', 'times.id')
        ->where('pontuacao_campeonato.campeonato_id', $campeonato_id)
        ->select('times.name as nome_time', 'pontuacao_campeonato.pontos as pontos')
        ->get();
    }

}
