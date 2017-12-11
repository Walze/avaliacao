<?php
use App\Cargo;
use App\Estagiario;
use App\Localidade;
use App\Setor;
use App\User;
use \App\Avaliacao;
use \App\Competencia;
use \App\Indicador;
use \App\IndComp;

use Illuminate\Http\Request;

// Home data
Route::get('/', function () {
	$estag = Estagiario::select(
		'estagiarios.id',
		'estagiarios.nome',
		'setores.nome as setor',
		'localidades.nome as local',
		'cargos.nome as cargo',
		'niveis.nivel as nivel',
		'ultima_aval',
		'admissao'
	)
		->join('setores', 'estagiarios.setor_id', '=', 'setores.id')
		->join('localidades', 'estagiarios.localidade_id', '=', 'localidades.id')
		->join('cargos', 'estagiarios.cargo_id', '=', 'cargos.id')
		->join('niveis', 'estagiarios.nivel_id', '=', 'niveis.id')
		->groupBy('estagiarios.id')
		->get();

	return $estag;
});

// Form Data
Route::get('/form', function () {
	$data = [
		'setores' => Setor::all(),
		'localidades' => Localidade::all(),
		'cargos' => Cargo::all(),
	];
	return $data;
});

// User Related
Route::post('/cadastrar', function (Request $req) {

	$user = new User;

	$user->nome = $req->nome;
	$user->email = $req->email;
	$user->localidade_id = $req->localidade_id;
	$user->setor_id = $req->setor_id;
	$user->senha = $req->senha;

	$user->save();

	return 200;
});

Route::post('/login', function (Request $req) {
	$user = User::where('email', $req->email)->first();

	if ($user) {
		if ($user->senha == $req->senha) {
			unset($user->senha);
			unset($user->remember_token);

			return [
				'gestor' => $user,
				'avaliacoes' => Avaliacao::where('gestor_id', $user->id)->get()
			];
		} else {
			return response("Senha Errada", 500);
		}
	} else {
		return response("Usuário não encontrado", 404);
	}
});

//test
Route::get('/teste', function () {
	$data = IndComp::select(
		'ind_comp.id',
		'comp_id',
		'indicador_id',
		'indicadores.nome as indicador',
		'competencias.nome as competencia'
	)
		->join('indicadores', 'ind_comp.indicador_id', '=', 'indicadores.id')
		->join('competencias', 'ind_comp.comp_id', '=', 'competencias.id')->get();

	return $data;
});


//Indicadores
Route::get('/indicadores/{id}', function (Request $req, $id) {
	return [
		'competencia' => Competencia::where('id', $id)->first(),
		'comps' => Competencia::all(),
		'indicadores' => Indicador::all(),
		'cargos' => Cargo::all()
	];
});

Route::get('/ind', function () {
	return [
		'inds' => Indicador::all(),
		'comps' => Competencia::all()
	];
});






// Competencias
Route::get('/comp', function () {
	return [
		'competencias' => Competencia::all(),
		'indicadores' => Indicador::all()
	];
});

Route::post('/comp', function (Request $req) {
	Competencia::create($req->all());
});


// Ind_comp
Route::get('/ind_comp', function () {
	return IndComp::all();
});

Route::post('/ind_comp', function (Request $req) {
	$data = $req->all();
	IndComp::updateOrCreate([
		'indicador_id' => $data['indicador_id']
	], $data);

	return $data;
});



// Estagiario Related
Route::get('/estagiario/{id}', function ($id) {
	return [
		'estagiario' => Estagiario::where('id', $id)->first(),
		'avaliacoes' => Avaliacao::where('estagiario_id', $id)->get()
	];
});

Route::post('/editEstagiario/{id}', function (Request $req, $id) {
	return Estagiario::where('id', $id)->update($req->all());
});

Route::post('/estagiario', function (Request $req) {
	Estagiario::create($req->all());
	return 200;
});

Route::delete('/estagiario/{id}', function ($id) {
	Estagiario::find($id)->delete();

	return ':ok_hand:';
});






