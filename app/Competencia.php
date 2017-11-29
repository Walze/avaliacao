<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Competencia extends Model
{
    protected $table = 'competencias';
    public $timestamps = false;

    protected $fillable = ['nome', 'peso', 'cargo_id'];
}
