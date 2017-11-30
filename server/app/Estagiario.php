<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Estagiario extends Model
{
    protected $table = 'estagiarios';
    public $timestamps = false;

    protected $fillable = [
        'nome', 'localidade_id', 'setor_id', 'cargo_id', 'nivel_id', 'ultima_aval', 'admissao', 'avaliado'
    ];
}
