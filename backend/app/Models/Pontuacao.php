<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pontuacao extends Model
{
    use HasFactory;

    protected $table = 'pontuacao_campeonato';

    protected $fillable = [
        'campeonato_id',
        'time_id',
        'pontos',
    ];
}
