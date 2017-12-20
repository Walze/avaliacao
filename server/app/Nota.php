<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Nota extends Model
{
    protected $table = 'notas';
    public $timestamps = false;

    protected $fillable = ['id_aval', 'id_comp', 'nota', 'ind_id', 'peso'];
}
