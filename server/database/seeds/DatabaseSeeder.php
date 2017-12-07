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
        'descricao' => 'Capacidade de se manter atualizado com as informações necessárias ao bom desempenho de suas atividades.'
      ],
      [
        'nome' => 'Motivação',
        'descricao' => 'Capacidade de manter-se motivado e engajado com o negócio, superando dificuldades e apresentando soluções.'
      ],
      [
        'nome' => 'Orientação para Aprendizado',
        'descricao' => 'Predisposição para oferecer produtos ou serviços antecipando as necessidades dos clientes.'
      ],
      [
        'nome' => 'Foco no Cliente',
        'descricao' => 'Orienta suas atitudes visando a valorização de relações positivas que favoreçam a fidelização do cliente.'
      ],
      [
        'nome' => 'Compromisso com o Resultado',
        'descricao' => 'Capacidade de transmitir idéias e fatos de forma clara, objetiva e transparente, de maneira que sua abordagem favoreça o entendimento e a construção de bons relacionamentos.'
      ],
      [
        'nome' => 'Trabalho em Equipe',
        'descricao' => 'Trabalha cooperativamente, integrando-se ao grupo em que atua visando o alcance dos objetivos propostos.'
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


    DB::table('ind_comp')->insert([
      [
        'nome' => 'Realiza suas atividades demonstrando conhecimento das soluções de comunicação digital oferecidas pela empresa.',
        'comp_id' => 1
      ],
      [
        'nome' => 'Executa seu trabalho evidenciando conhecimento do  sistema corporativo.',
        'comp_id' => 1
      ],
      [
        'nome' => 'Realiza atividades demonstrando conhecimento das rotinas e procedimentos relacionados às suas funções.',
        'comp_id' => 1
      ],
      [
        'nome' => 'Busca manter-se atualizado através de matérias disponíveis na intranet e cursos oferecidos pela empresa.',
        'comp_id' => 1
      ],
      [
        'nome' => '',
        'comp_id' => 2
      ],
      [
        'nome' => '',
        'comp_id' => 2
      ],
      [
        'nome' => '',
        'comp_id' => 2
      ],
      [
        'nome' => '',
        'comp_id' => 2
      ],
      [
        'nome' => '',
        'comp_id' => 3
      ],
      [
        'nome' => '',
        'comp_id' => 3
      ],
      [
        'nome' => '',
        'comp_id' => 3
      ],
      [
        'nome' => '',
        'comp_id' => 3
      ],
      [
        'nome' => '',
        'comp_id' => 4
      ],
      [
        'nome' => '',
        'comp_id' => 4
      ],
      [
        'nome' => '',
        'comp_id' => 4
      ],
      [
        'nome' => '',
        'comp_id' => 4
      ],
      [
        'nome' => '',
        'comp_id' => 5
      ],
      [
        'nome' => '',
        'comp_id' => 5
      ],
      [
        'nome' => '',
        'comp_id' => 5
      ],
      [
        'nome' => '',
        'comp_id' => 5
      ],
      [
        'nome' => '',
        'comp_id' => 6
      ],
      [
        'nome' => '',
        'comp_id' => 6
      ],
      [
        'nome' => '',
        'comp_id' => 6
      ],
      [
        'nome' => '',
        'comp_id' => 6
      ],

    ]);
  }
}
