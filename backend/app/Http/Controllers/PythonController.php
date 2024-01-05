<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PythonController extends Controller
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

            return response()->json(['numero1' => $numero1, 'numero2' => $numero2]);

        }else{
            return response()->json(['erro' => 'Erro ao executar o script.', 'retorno'=> $retorno, 'output'=>$output, 'out'=>$out], 500);
        }

    }
}
