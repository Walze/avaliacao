<?php
use App\Cargo;
use App\Estagiario;
use App\Localidade;
use App\Setor;
use App\User;
use \App\Avaliacao;
use \App\Competencia;
use \App\Ind_Comp;

use Illuminate\Http\Request;

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

Route::get('/form', function () {
	$data = [
		'setores' => Setor::all(),
		'localidades' => Localidade::all(),
		'cargos' => Cargo::all(),
	];
	return $data;
});

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

Route::get('/comp', function () {
	return [
		'competencias' => Competencia::all(),
		'indicadores' => Ind_Comp::all()
	];
});