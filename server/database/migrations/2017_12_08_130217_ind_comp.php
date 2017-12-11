<?php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class IndComp extends Migration
{
    public function up()
    {
        Schema::create('ind_comp', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('comp_id')->unsigned();
            $table->foreign('comp_id')->references('id')->on('competencias');
            $table->integer('indicador_id')->unsigned()->unique();
            $table->foreign('indicador_id')->references('id')->on('indicadores');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('ind_comp');
    }
}
