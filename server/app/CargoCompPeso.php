<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class CargoCompPeso extends Model
{
    protected $table = 'cargo_comp_peso';
    public $timestamps = false;

    protected $fillable = ['cargo_id', 'comp_id', 'peso'];
}
