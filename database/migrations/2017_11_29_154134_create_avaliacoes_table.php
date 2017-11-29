<?php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAvaliacoesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('avaliacoes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('gestor_id')->unsigned();
            $table->foreign('gestor_id')->references('id')->on('gestores');
            $table->integer('estagiario_id')->unsigned();
            $table->foreign('estagiario_id')->references('id')->on('estagiarios');
            $table->integer('media');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('avaliacoes');
    }
}
