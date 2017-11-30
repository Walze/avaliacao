<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Nivel extends Model
{
    protected $table = 'niveis';
    public $timestamps = false;

    protected $fillable = ['nivel', 'bolsa'];
}
