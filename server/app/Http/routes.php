<?php
use App\Localidade;
use App\Setor;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\User;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/form', function () {
    $data = [
        'setores' => Setor::all(),
        'localidades' => Localidade::all(),
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

Route::post('/login', function (Request $req) {

    if (Auth::attempt(['email' => $req->email, 'senha' => $req->senha])) {
        $user = Auth::user();

        return $user;
    }

});