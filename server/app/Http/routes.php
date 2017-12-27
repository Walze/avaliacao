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
use App\CargoCompPeso;
use App\Nota;





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

Route::post('/editarGestor', function (Request $req) {
	$user = User::find($req->id)->first();

	$user->nome = $req->nome;
	$user->email = $req->email;
	$user->localidade_id = $req->localidade_id;
	$user->setor_id = $req->setor_id;
	$user->save();

	return $user;
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

Route::delete('/delind/{id}', function ($id) {
	Indicador::find($id)->delete();

	return 'ok';
});

Route::post('/ind/{id}', function (Request $req, $id) {
	Indicador::find($id)->update($req->all());
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

Route::post('/comp/{id}', function (Request $req, $id) {
	Competencia::find($id)->update($req->all());
});

Route::delete('/comp/{id}', function ($id) {
	Competencia::destroy($id);

	return $id;
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
Route::post('/notas', function (Request $req) {
	DB::table('notas')->insert($req->all());
});

Route::get('/notas/{aval}', function ($aval) {
	return Nota::where('aval_id', $aval)->get();
});

Route::post('/EditAval', function (Request $req) {
	foreach ($req->notas as $i => $nota) {
		unset($nota['id']);
		$notaDB = Nota::where('ind_id', $nota['ind_id'])->where('aval_id', $nota['aval_id'])->first();
		if ($notaDB) {
			$notaDB->nota = $nota['nota'];
			$notaDB->save();
		} else {
			DB::table('notas')->insert($nota);
		}
	}

	$aval = Avaliacao::where('id', $req->aval['id'])->first();
	$aval->media = $req->aval['media'];
	$aval->save();

	return 'noice';
});

Route::get('/avaliacaoShow/{id}', function ($id) {
	return Avaliacao::where('id', $id)->get();
});

Route::get('/avaliacao/{cargo_id}', function ($cargo_id) {

	$indicadores = Cargo::select(
		'*'
	)
		->where('cargos.id', $cargo_id)
		->join('ind_cargo', 'ind_cargo.cargo_id', '=', 'cargos.id')
		->join('ind_comp', 'ind_comp.indicador_id', '=', 'ind_cargo.indicador_id')
		->join('indicadores', 'indicadores.id', '=', 'ind_cargo.indicador_id')
		->get();
	$relacoes = CargoCompPeso::select('*')
		->where('cargo_id', $cargo_id)
		->get();

	$competencias = Competencia::all();

	$avaliacao = [];

	foreach ($relacoes as $i1 => $relacao) {
		foreach ($competencias as $i2 => $comp) {
			if ($relacao->comp_id == $comp->id) {
				$avaliacao[$i1] = new stdClass();

				$avaliacao[$i1]->id = $i1;
				$avaliacao[$i1]->comp_id = $relacao->comp_id;
				$avaliacao[$i1]->peso = $relacao->peso;
				$avaliacao[$i1]->nome = $comp->nome;
				$avaliacao[$i1]->descricao = $comp->descricao;
				$avaliacao[$i1]->indicadores = [];
				$avaliacao[$i1]->ind_count = 0;

				foreach ($indicadores as $i3 => $ind) {
					if ($ind->comp_id == $comp->id) {
						$avaliacao[$i1]->ind_count++;
						unset($ind->cargo_id,
							$ind->duracao_meses);
						array_push($avaliacao[$i1]->indicadores, $ind);
					}
				}
			}
		}
	}

	return $avaliacao;
});

Route::post('/avaliar', function (Request $req) {
	$aval = Avaliacao::create($req->all());

	$estag = Estagiario::find($req->estagiario_id);

	if($estag->nivel_id != 3 && $aval->media >= 2.8) {
		$estag->nivel_id++;
	}

	$estag->ultima_aval = $req->data;
	$estag->save();

	return $aval->id;
});
