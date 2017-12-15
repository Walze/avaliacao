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
            $table->integer('aval_id')->unsigned()->onDelete('cascade');
            $table->foreign('aval_id')->references('id')->on('avaliacoes')->onDelete('cascade');
            $table->integer('comp_id')->unsigned()->onDelete('cascade');
            $table->foreign('comp_id')->references('id')->on('competencias')->onDelete('cascade');
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
