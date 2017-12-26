<?php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEstagiariosTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('estagiarios', function (Blueprint $table) {
			$table->increments('id');
			$table->string('nome');

			$table->integer('setor_id')->unsigned();
			$table->foreign('setor_id')->references('id')->on('setores');
			$table->integer('localidade_id')->unsigned();
			$table->foreign('localidade_id')->references('id')->on('localidades');
			$table->integer('cargo_id')->unsigned();
			$table->foreign('cargo_id')->references('id')->on('cargos');
			$table->integer('nivel_id')->unsigned();
			$table->foreign('nivel_id')->references('id')->on('niveis');

			$table->date('admissao');
			$table->dateTime('ultima_aval');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('estagiarios');
	}
}
