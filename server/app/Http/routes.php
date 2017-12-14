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
use App\Ind_Comp_Cargo;
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


// Indicador relationship tables
Route::get('/ind_rels', function () {
	return [
		'ind_comps' => IndComp::all(),
		'ind_cargos' => Ind_Comp_Cargo::all()
	];
});

Route::post('/ind_comp', function (Request $req) {
	$data = $req->all();
	IndComp::updateOrCreate([
		'indicador_id' => $data['indicador_id']
	], $data);

	return $data;
});

Route::post('/ind_cargo', function (Request $req) {
	$data = $req->all();

	if ($data['checked']) {

		Ind_Comp_Cargo::updateOrCreate([
			'indicador_id' => $data['indicador_id'],
			'cargo_id' => $data['cargo_id']
		], [
			'indicador_id' => $data['indicador_id'],
			'cargo_id' => $data['cargo_id']
		]);

	} else {
		Ind_Comp_Cargo::where('indicador_id', $data['indicador_id'])
			->where('cargo_id', $data['cargo_id'])
			->delete();
	}

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





// avaliacoes

Route::get('/avaliacao', function () {
	$indicadores = Cargo::select(
		'indicadores.nome as ind_nome',
		'ind_comp.comp_id as comp_id',
		'ind_cargo.indicador_id as indicador_id'
	)
		->where('cargos.id', 2)
		->join('ind_cargo', 'ind_cargo.cargo_id', '=', 'cargos.id')
		->join('indicadores', 'indicadores.id', '=', 'ind_cargo.indicador_id')
		->join('ind_comp', 'ind_comp.indicador_id', '=', 'ind_cargo.indicador_id')
		->get();



	return [
		'competencias' => Competencia::all(),
		'indicadores' => $indicadores
	];
});


Route::get('/asd', function () {
	$data = [
		'competencias' => Competencia::all(),
		'cargos' => Cargo::all(),
	];
	return $data;
});