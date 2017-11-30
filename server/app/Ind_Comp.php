<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Ind_Comp extends Model
{
    protected $table = 'ind_comp';
    public $timestamps = false;

    protected $fillable = ['comp_id', 'nome', 'cargo_id'];
}
