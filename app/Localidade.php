<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Localidade extends Model
{
    protected $table = 'localidades';
    public $timestamps = false;

    protected $fillable = ['nome'];
}
