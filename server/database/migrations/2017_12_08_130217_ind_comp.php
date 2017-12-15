<?php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class IndComp extends Migration
{
    public function up()
    {
        Schema::create('ind_comp', function (Blueprint $table) {
            $table->increments('id')->onDelete('cascade');
            $table->integer('comp_id')->unsigned()->onDelete('cascade');
            $table->foreign('comp_id')->references('id')->on('competencias')->onDelete('cascade');
            $table->integer('indicador_id')->unsigned()->unique()->onDelete('cascade');
            $table->foreign('indicador_id')->references('id')->on('indicadores')->onDelete('cascade');
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
