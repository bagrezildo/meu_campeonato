<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PythonController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CampeonatoController;
use App\Http\Controllers\PartidaController;
use App\Http\Controllers\PontuacaoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::post('register', [\App\Http\Controllers\AuthController::class, 'register']);
Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [\App\Http\Controllers\AuthController::class, 'user']);
    Route::post('logout', [\App\Http\Controllers\AuthController::class, 'logout']);

    Route::post('/criaTime', [CampeonatoController::class, 'criaTime']);
    Route::get('/listaTimes', [CampeonatoController::class, 'listaTimes']);
    Route::get('/jogar', [PartidaController::class, 'jogar']);

    Route::post('/criaCampeonato', [CampeonatoController::class, 'criaCampeonato']);
    Route::get('/buscaTime/{id}', [CampeonatoController::class, 'buscaTime']);

    Route::post('/começaCampeonato', [CampeonatoController::class, 'começaCampeonato']);
    Route::get('/listaPontuacaoCampeonato/{campeonato_id}', [PontuacaoController::class, 'listaPontuacaoCampeonato']);
    Route::post('/criaPartida', [PartidaController::class, 'criaPartida']);
    Route::get('/listaCampeonatos', [CampeonatoController::class, 'listaCampeonatos']);

    Route::post('/comecaCampeonato', [PontuacaoController::class, 'comecaCampeonato']);
    Route::get('/listaPartidas', [PartidaController::class, 'listaPartidas']);

    Route::get('/listaPartidasCampeonato/{id}', [PartidaController::class, 'listaPartidasCampeonato']);

    Route::get('/resultadoCampeonato/{campeonato_id}', [CampeonatoController::class, 'resultadoCampeonato']);
    Route::get('/historicoCampeonatos', [CampeonatoController::class, 'historicoCampeonatos']);




});
