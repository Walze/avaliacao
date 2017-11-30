<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cargo extends Model
{
    protected $table = 'cargos';
    public $timestamps = false;

    protected $fillable = ['nome', 'duracao', 'peso'];
}
