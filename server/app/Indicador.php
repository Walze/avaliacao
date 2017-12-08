<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Indicador extends Model
{
    protected $table = 'indicadores';
    public $timestamps = false;

    protected $fillable = ['nome'];
}
