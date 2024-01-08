<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partida extends Model
{
    use HasFactory;

    protected $fillable = [
        'campeonato_id',
        'time_casa_id',
        'time_visitante_id',
        'gols_time_casa',
        'gols_time_visitante',
        'fase_id',
        'vencedor_id',
        'perdedor_id'
    ];
}
