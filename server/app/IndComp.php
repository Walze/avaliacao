<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class IndComp extends Model
{
    protected $table = 'ind_comp';
    public $timestamps = false;

    protected $fillable = ['indicador_id', 'comp_id'];
}
