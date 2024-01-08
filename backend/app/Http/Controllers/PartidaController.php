<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Partida;
use App\Models\Pontuacao;

class PartidaController extends Controller
{
    //
    public function jogar(){

        $caminhoScript = "/Users/matheus/Documents/projects/trade/meu_campeonato/teste.py";

        $output = null;
        $retorno = null;

        exec("python3 {$caminhoScript}", $output, $retorno);
        $out = shell_exec("python3 {$caminhoScript}");
        if($retorno === 0 && count($output) === 2){
            $numero1 = (int)$output[0];
            $numero2 = (int)$output[1];

            return ['gols_time_casa' => $numero1, 'gols_time_visitante' => $numero2];

        }else{
            return response()->json(['erro' => 'Erro ao executar o script.', 'retorno'=> $retorno, 'output'=>$output, 'out'=>$out], 500);
        }

    }

    public function criaPartida(request $request){
        $campeonato_id = $request->input('campeonato_id');
        $time_casa_id = $request->input('time_casa_id');
        $time_visitante_id = $request->input('time_visitante_id');
        
        $gols = $this->jogar();
        $gols_time_casa = $gols['gols_time_casa'];
        $gols_time_visitante = $gols['gols_time_visitante'];
        
        if($gols_time_casa > $gols_time_visitante){
            $vencedor_id = $time_casa_id;
            $perdedor_id = $time_visitante_id;
        }else if($gols_time_casa < $gols_time_visitante){
            $vencedor_id = $time_visitante_id;
            $perdedor_id = $time_casa_id;
        } else {
            $vencedor_id = $time_casa_id;
            $perdedor_id = $time_visitante_id;
        }

        $pontos_casa = $gols_time_casa - $gols_time_visitante;
        $pontos_visitante = $gols_time_visitante - $gols_time_casa;

        // Atualiza a pontuação do time da casa
        Pontuacao::where('campeonato_id', $campeonato_id)
        ->where('time_id', $time_casa_id)
        ->update(['pontos' => \DB::raw("pontos + $pontos_casa")]);

        // Atualiza a pontuação do time visitante
        Pontuacao::where('campeonato_id', $campeonato_id)
        ->where('time_id', $time_visitante_id)
        ->update(['pontos' => \DB::raw("pontos + $pontos_visitante")]);

        return Partida::create([
            'campeonato_id' =>$campeonato_id,
            'time_casa_id' => $time_casa_id,
            'time_visitante_id' => $time_visitante_id,
            'gols_time_casa' => $gols_time_casa,
            'gols_time_visitante' => $gols_time_visitante,
            'fase_id' => $request->input('fase_id'),
            'vencedor_id' => $vencedor_id,
            'perdedor_id' => $perdedor_id

        ]);
    }

    public function listaVencedoresFase($campeonato_id, $fase_id, $partida_id){
        $partida = Partida::find($partida_id);

    }

    public function listaPartidas(){
        return Partida::all();
    }

    public function listaPartidasCampeonato($campeonato_id){
        return Partida::where('campeonato_id', $campeonato_id)->get();
    }
    

}
