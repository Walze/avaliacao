<?php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notas', function (Blueprint $table) {
            $table->increments('id');
            $table->smallInteger('nota');
            $table->integer('id_aval')->unsigned();
            $table->foreign('id_aval')->references('id')->on('avaliacoes');
            $table->integer('id_comp')->unsigned();
            $table->foreign('id_comp')->references('id')->on('competencias');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notas');
    }
}
