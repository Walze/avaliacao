<?php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCargoCompPesoTable extends Migration
{
    public function up()
    {
        Schema::create('cargo_comp_peso', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('cargo_id')->unsigned()->onDelete('cascade');
            $table->foreign('cargo_id')->references('id')->on('cargos')->onDelete('cascade');
            $table->integer('comp_id')->unsigned()->onDelete('cascade');
            $table->foreign('comp_id')->references('id')->on('competencias')->onDelete('cascade');
            $table->integer('peso');
        });
    }

    public function down()
    {
        Schema::drop('cargo_comp_peso');
    }
}
