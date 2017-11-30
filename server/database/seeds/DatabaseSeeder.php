<?php
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    DB::table('localidades')->insert([
      ['nome' => 'Rio de Janeiro'],
      ['nome' => 'São Paulo'],
      ['nome' => 'Minas Gerais'],
    ]);
    DB::table('setores')->insert([
      ['nome' => 'Ademir'],
      ['nome' => 'Talentos'],
      ['nome' => 'Vendas'],
      ['nome' => 'Recursos Humanos'],
      ['nome' => 'Financeiro'],
      ['nome' => 'Contábil']
    ]);

    DB::table('cargos')->insert([
      [
        'nome' => 'Relacionamento',
        'peso' => 1
      ],
      [
        'nome' => 'Novos Negócios',
        'peso' => 1
      ],
      [
        'nome' => 'Recursos Humanos',
        'peso' => 1
      ],
      [
        'nome' => 'Design EAD',
        'peso' => 1
      ],
      [
        'nome' => 'Marketing',
        'peso' => 1
      ],
      [
        'nome' => 'Qualidade',
        'peso' => 1
      ],
      [
        'nome' => 'SAC',
        'peso' => 1
      ]
    ]);

    DB::table('competencias')->insert([
      [
        'nome' => 'Técnica',
        'cargo_id' => 1
      ],
      [
        'nome' => 'Motivação',
        'cargo_id' => 1
      ],
      [
        'nome' => 'Orientação para Aprendizado',
        'cargo_id' => 1
      ],
      [
        'nome' => 'Foco no Cliente',
        'cargo_id' => 1
      ],
      [
        'nome' => 'Compromisso com o Resultado',
        'cargo_id' => 1
      ],
      [
        'nome' => 'Trabalho em Equipe',
        'cargo_id' => 1
      ]
    ]);

    DB::table('niveis')->insert([
      [
        'nivel' => 1,
        'bolsa' => 900
      ],
      [
        'nivel' => 2,
        'bolsa' => 1050
      ],
      [
        'nivel' => 3,
        'bolsa' => 1200
      ]
    ]);
  }
}
