<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePartidasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('partidas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campeonato_id')->constrained('campeonatos');
            $table->foreignId('time_casa_id')->constrained('times');
            $table->foreignId('time_visitante_id')->constrained('times');
            $table->integer('gols_time_casa');
            $table->integer('gols_time_visitante');
            $table->foreignId('fase_id')->constrained('fase');
            $table->foreignId('vencedor_id')->constrained('times');
            $table->foreignId('perdedor_id')->constrained('times');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('partidas');
    }
}
