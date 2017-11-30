<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Gestor extends Model
{
    protected $table = 'gestores';
    public $timestamps = false;

    protected $fillable = ['nome', 'setor_id', 'localidade_id'];
}
