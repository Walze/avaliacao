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
			$table->increments('id')->onDelete('cascade');
			$table->string('nome')->onDelete('cascade');

			$table->integer('setor_id')->unsigned()->onDelete('cascade');
			$table->foreign('setor_id')->references('id')->on('setores')->onDelete('cascade');
			$table->integer('localidade_id')->unsigned()->onDelete('cascade');
			$table->foreign('localidade_id')->references('id')->on('localidades')->onDelete('cascade');
			$table->integer('cargo_id')->unsigned()->onDelete('cascade');
			$table->foreign('cargo_id')->references('id')->on('cargos')->onDelete('cascade');
			$table->integer('nivel_id')->unsigned()->onDelete('cascade');
			$table->foreign('nivel_id')->references('id')->on('niveis')->onDelete('cascade');

			$table->date('admissao')->onDelete('cascade');
			$table->dateTime('ultima_aval')->onDelete('cascade');
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
