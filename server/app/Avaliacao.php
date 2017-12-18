<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Avaliacao extends Model
{
    protected $table = 'avaliacoes';
    public $timestamps = false;

    protected $fillable = ['estagiario_id', 'gestor_id', 'media', 'data'];
}
