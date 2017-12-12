<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ind_Comp_Cargo extends Model
{
    protected $table = 'ind_cargo';
    public $timestamps = false;

    protected $fillable = ['indicador_id', 'cargo_id'];
}
