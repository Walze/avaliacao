<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ind_Comp_Cargo extends Model
{
    protected $table = 'ind_comp_cargo';
    public $timestamps = false;

    protected $fillable = ['ind_comp_id', 'cargo_id'];
}
