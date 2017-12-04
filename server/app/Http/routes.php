<?php
use App\Cargo;
use App\Estagiario;
use App\Localidade;
use App\Setor;
use App\User;

use Illuminate\Http\Request;

Route::get('/', function () {
	return Estagiario::select(
		'estagiarios.id',
		'estagiarios.nome',
		'setores.nome as setor',
		'localidades.nome as local',
		'cargos.nome as cargo',
		'niveis.nivel as nivel',
		'ultima_aval',
		'admissao',
		'avaliado'
	)
		->join('setores', 'estagiarios.setor_id', '=', 'setores.id')
		->join('localidades', 'estagiarios.localidade_id', '=', 'localidades.id')
		->join('cargos', 'estagiarios.cargo_id', '=', 'cargos.id')
		->join('niveis', 'estagiarios.nivel_id', '=', 'niveis.id')
		->get();
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

Route::post('/estagiario', function (Request $req) {
	Estagiario::create($req->all());
	return 200;
});

Route::post('/login', function (Request $req) {
	$user = User::where('email', $req->email)->first();

	if ($user) {
		if ($user->senha == $req->senha) {
			unset($user->senha);
			unset($user->remember_token);

			return $user;
		} else {
			return response("Senha Errada", 500);
		}
	} else {
		return response("Usuário não encontrado", 404);
	}

});