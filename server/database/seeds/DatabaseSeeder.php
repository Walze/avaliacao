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
        'nome' => 'Competência Técnica',
        'descricao' => 'Capacidade de se manter atualizado com as informações necessárias ao bom desempenho de suas atividades.'
      ],
      [
        'nome' => 'Automotivação',
        'descricao' => 'Capacidade de manter-se motivado e engajado com o negócio, superando dificuldades e apresentando soluções.'
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
        'nome' => 'Foco no Cliente Interno',
        'descricao' => 'Predisposição para atender as demandas dos clientes internos, proporcionado um serviço de qualidade.'
      ],
      [
        'nome' => 'Foco em Resultado',
        'descricao' => 'Predisposição para oferecer produtos ou serviços antecipando as necessidades dos clientes.'
      ],
      [
        'nome' => 'Compromisso com o Resultado',
        'descricao' => 'Capacidade de transmitir idéias e fatos de forma clara, objetiva e transparente, de maneira que sua abordagem favoreça o entendimento e a construção de bons relacionamentos.'
      ],
      [
        'nome' => 'Trabalho em Equipe',
        'descricao' => 'Trabalha cooperativamente, integrando-se ao grupo em que atua visando o alcance dos objetivos propostos.'
      ],
      [
        'nome' => 'Comunicação',
        'descricao' => 'Capacidade de transmitir idéias e fatos de forma clara, objetiva e transparente, de maneira que sua abordagem favoreça o entendimento e a construção de bons relacionamentos.'
      ],
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


    DB::table('indicadores')->insert([
      [
        'nome' => "Executa seu trabalho evidenciando conhecimento do  sistema corporativo."
      ],
      [
        'nome' => "Realiza atividades demonstrando conhecimento das rotinas e procedimentos relacionados às suas funções."
      ],
      [
        'nome' => "Busca manter-se atualizado através de matérias disponíveis na intranet e cursos oferecidos pela empresa."
      ],
      [
        'nome' => "Demonstra motivação para executar suas tarefas diárias."
      ],
      [
        'nome' => "Não se acomoda com resultados obtidos, buscando sempre superá-los."
      ],
      [
        'nome' => "Evidencia atitude positiva para resolver problemas."
      ],
      [
        'nome' => "Suporta críticas construtivas, transformando-as em insumo para sua evolução profissional."
      ],
      [
        'nome' => "Apresenta bom índice negociação de sites."
      ],
      [
        'nome' => "Apresenta bom índice de atendimento/mês."
      ],
      [
        'nome' => "Apresenta bom índice de finalização de atendimento mês."
      ],
      [
        'nome' => "Apresenta agilidade e qualidade no cadastramento de ofertas e ações de pós-venda do produto site."
      ],
      [
        'nome' => "Antecipa-se na busca de informações objetivando a fidelização do cliente."
      ],
      [
        'nome' => "Propõe soluções adequadas às necessidades do cliente."
      ],
      [
        'nome' => "Demonstra capacidade de estabelecer relações de confiança com os clientes."
      ],
      [
        'nome' => "Orienta os clientes compartilhando informações relevantes para seu negócio."
      ],
      [
        'nome' => "Transmite ao cliente a informação completa e suficiente."
      ],
      [
        'nome' => "Transmite ao cliente suas idéias com clareza, segurança e credibilidade."
      ],
      [
        'nome' => "Demonstra capacidade de persuasão e negociação."
      ],
      [
        'nome' => "Comunica-se por escrito de forma clara e acessível ao interlocutor."
      ],
      [
        'nome' => "Compartilha informação com os colegas e coopera sempre que percebe alguma dificuldade na execução do trabalho."
      ],
      [
        'nome' => "Sua atuação é caracterizada pelo respeito nos relacionamentos em todos os âmbitos."
      ],
      [
        'nome' => "Atua como facilitador e motivador em seu ambiente de trabalho, estimulando atitudes positivas."
      ],
      [
        'nome' => "Busca relacionamento com outros colegas para compartilhar experiências e encontrar oportunidades de melhoria."
      ],
      [
        'nome' => "Realiza suas atividades demonstrando conhecimento das soluções de comunicação digital oferecidas pela empresa."
      ],
      [
        'nome' => "Executa seu trabalho evidenciando conhecimento dos aplicativos e sistemas utilizados por sua área."
      ],
      [
        'nome' => "Possui entendimento do negócio, compreendendo o impacto de suas atividades para os resultados empresariais."
      ],
      [
        'nome' => "Não desiste diante de situações adversas, persistindo na superação dos obstáculos."
      ],
      [
        'nome' => "Cumpre os prazos estabelecidos."
      ],
      [
        'nome' => "Apresenta qualidade em suas entregas."
      ],
      [
        'nome' => "Inova, buscando soluções mais eficientes para realizar suas tarefas."
      ],
      [
        'nome' => "Organiza e prioriza suas tarefas de forma a alcançar os resultados estabelecidos."
      ],
      [
        'nome' => "Antecipa-se na busca de informações objetivando a fidelização ou a aquisição de clientes e usuários."
      ],
      [
        'nome' => "Propõe soluções adequadas ao cumprimento do objetivo de conquista e fidelização de clientes e usuários."
      ],
      [
        'nome' => "Sugere ações que tenham objetivo de melhorar a usabilidade ou a audiência dos produtos."
      ],
      [
        'nome' => "Acompanha os movimentos do mercado de buscas e analisa os possíveis impactos na divulgação dos nossos clientes."
      ],
      [
        'nome' => "Comunica-se com o gestor que há dúvida sobre uma atividade."
      ],
      [
        'nome' => "Transmite suas idéias com clareza, segurança e credibilidade."
      ],
      [
        'nome' => "Executa seu trabalho evidenciando conhecimento das plataformas de EAD e seleção a distância."
      ],
      [
        'nome' => "Entra em contato com o gestor da área para alinhamento do perfil da vaga."
      ],
      [
        'nome' => "Atende as demandas de seleção demonstrando cordialidade em seus contatos por email e telefone."
      ],
      [
        'nome' => "Sugere ações que tenham objetivo de alcançar de maneira eficaz o perfil solicitado pelo requisitante da vaga."
      ],
      [
        'nome' => "Compartilha com o requisitante da vaga informações relevantes sobre o processo seletivo."
      ],
      [
        'nome' => "Comunica-se com o gestor sempre que há dúvida sobre uma atividade."
      ],
      [
        'nome' => "Expressa suas ideias com clareza e precisão, tanto verbalmente quanto por escrito."
      ],
      [
        'nome' => "Evidencia segurança ao falar em público."
      ],
      [
        'nome' => "Comunica-se de maneira agradável e empática com candidatos, clientes internos, gestor e pares."
      ],
      [
        'nome' => "Executa seu trabalho evidenciando conhecimento em HTML e CSS."
      ],
      [
        'nome' => "Executa seu trabalho demonstrando conhecimento no Photoshop e outras ferramentas de edição."
      ],
      [
        'nome' => "Evidencia conhecimento de diferentes bancos de imagens."
      ],
      [
        'nome' => "Apresenta qualidade e agilidade em suas entregas."
      ],
      [
        'nome' => "Dedicação à pesquisa de novas ferramentas."
      ],
      [
        'nome' => "Procura inovar ou criar novos métodos na realização das atividades."
      ],
      [
        'nome' => "Capacidade de sugerir melhorias para os materiais desenvolvidos pela área (storyboards, banners, apresentações)."
      ],
      [
        'nome' => "Capacidade de perceber, idealizar e propor novas alternativas para problemas."
      ],
      [
        'nome' => "Comunica-se com o gestor ou analista sempre que há dúvida sobre uma atividade."
      ],
      [
        'nome' => "Procura informar a equipe antecipadamente quando há inviabilidade no projeto."
      ],
      [
        'nome' => "Executa seu trabalho evidenciando domínio dos aplicativos e sistemas utilizados por sua área, agregando conhecimento acadêmico."
      ],
      [
        'nome' => "Realiza atividades demonstrando conhecimento das rotinas e procedimentos relacionadas às suas funções."
      ],
      [
        'nome' => "Identifica oportunidades a partir da correta análise do mercado em que atua, apresentando sugestão de mídias inovadoras,  de parcerias estratégicas, presença em eventos, foco de trabalho em setor estratégico etc.."
      ],
      [
        'nome' => "Apresenta capacidade de negociação com fornecedores e parceiros, observando ética e objetivos corporativos."
      ],
      [
        'nome' => "Monitora e avalia corretamente a atuação da concorrência, identificando possíveis oportunidades ou ameaças para a empresa."
      ],
      [
        'nome' => "Demonstra atenção ao público interno, identificando possíveis necessidades latentes (material de apoio, brindes, treinamento etc.)."
      ],
      [
        'nome' => "Interage com os gestores e colegas de trabalho de forma objetiva e concisa."
      ],
      [
        'nome' => "Utiliza-se de linguagem formal e informal de forma adequada às diversas situações."
      ],
      [
        'nome' => "Executa seu trabalho evidenciando domínio do sistema corporativo."
      ],
      [
        'nome' => "Desempenha suas funções demonstrando conhecimento das soluções de comunicação digital oferecidas pela empresa."
      ],
      [
        'nome' => "Executa seu trabalho evidenciando conhecimento do sistema corporativo."
      ],
      [
        'nome' => "Exerce suas funções evidenciando conhecimento das rotinas e procedimentos relacionados às suas funções."
      ],
      [
        'nome' => "Demonstra motivação para desempenhar suas tarefas diárias."
      ],
      [
        'nome' => "Não desiste diante de situações adversas, persistindo na superação de obstáculos."
      ],
      [
        'nome' => "Interage com a redes sociais da empresa (facebook, instagram, blog) evidenciando engajamento com o negócio."
      ],
      [
        'nome' => "Oferece ao cliente outras soluções de comunicação."
      ],
      [
        'nome' => "Incentiva o uso da área de cliente."
      ],
      [
        'nome' => "Registra as solicitações de atendimento."
      ],
      [
        'nome' => "Realiza marcações no atendimento: alteração de anúncio, inclusão de AG, orientação de navegação e outros."
      ],
      [
        'nome' => "Apresenta escuta empática sendo capaz de identificar às necessidades do cliente."
      ],
      [
        'nome' => "Orienta o cliente, compartilhando informações que possam esclarecer eventuais dúvidas."
      ],
      [
        'nome' => "Transmite credibilidade no atendimento, conseguindo estabelecer relação de confiança com o cliente."
      ],
      [
        'nome' => "Expressa ideias com clareza e objetividade, tanto verbalmente quanto por escrito."
      ],
      [
        'nome' => "Comunica-se de forma eficaz  com clientes internos/externos, gestor e pares."
      ],
      [
        'nome' => "Evidencia capacidade de persuasão e negociação na retenção do produto."
      ],
      [
        'nome' => "Apresenta ausência de vícios de linguagem."
      ],
      [
        'nome' => "Constrói relações de trabalho colaborativas, considerando as ideias e opiniões diferentes das suas."
      ]
    ]);


    DB::table('ind_comp')->insert(array(
      0 => array('comp_id' => 5, 'indicador_id' => 1, ),
      1 => array('comp_id' => 5, 'indicador_id' => 2, ),
      2 => array('comp_id' => 5, 'indicador_id' => 3, ),
      3 => array('comp_id' => 4, 'indicador_id' => 4, ),
      4 => array('comp_id' => 7, 'indicador_id' => 5, ),
      5 => array('comp_id' => 4, 'indicador_id' => 6, ),
      6 => array('comp_id' => 4, 'indicador_id' => 7, ),
      7 => array('comp_id' => 4, 'indicador_id' => 8, ),
      8 => array('comp_id' => 5, 'indicador_id' => 9, ),
      9 => array('comp_id' => 5, 'indicador_id' => 10, ),
      10 => array('comp_id' => 4, 'indicador_id' => 11, ),
      11 => array('comp_id' => 4, 'indicador_id' => 12, ),
      12 => array('comp_id' => 5, 'indicador_id' => 13, ),
      13 => array('comp_id' => 8, 'indicador_id' => 14, ),
      14 => array('comp_id' => 1, 'indicador_id' => 15, ),
      15 => array('comp_id' => 8, 'indicador_id' => 16, ),
      16 => array('comp_id' => 5, 'indicador_id' => 17, ),
      17 => array('comp_id' => 5, 'indicador_id' => 18, ),
      18 => array('comp_id' => 5, 'indicador_id' => 19, ),
      19 => array('comp_id' => 8, 'indicador_id' => 20, ),
      20 => array('comp_id' => 7, 'indicador_id' => 21, ),
      21 => array('comp_id' => 7, 'indicador_id' => 22, ),
      22 => array('comp_id' => 7, 'indicador_id' => 23, ),
      23 => array('comp_id' => 7, 'indicador_id' => 24, ),
      24 => array('comp_id' => 7, 'indicador_id' => 25, ),
      25 => array('comp_id' => 7, 'indicador_id' => 26, ),
      26 => array('comp_id' => 8, 'indicador_id' => 27, ),
      27 => array('comp_id' => 4, 'indicador_id' => 28, ),
      28 => array('comp_id' => 5, 'indicador_id' => 29, ),
      29 => array('comp_id' => 5, 'indicador_id' => 30, ),
      30 => array('comp_id' => 5, 'indicador_id' => 31, ),
      31 => array('comp_id' => 7, 'indicador_id' => 32, ),
      32 => array('comp_id' => 3, 'indicador_id' => 33, ),
      33 => array('comp_id' => 3, 'indicador_id' => 34, ),
      34 => array('comp_id' => 1, 'indicador_id' => 35, ),
      35 => array('comp_id' => 5, 'indicador_id' => 36, ),
      36 => array('comp_id' => 3, 'indicador_id' => 37, ),
      37 => array('comp_id' => 7, 'indicador_id' => 38, ),
      38 => array('comp_id' => 1, 'indicador_id' => 39, ),
      39 => array('comp_id' => 7, 'indicador_id' => 40, ),
      40 => array('comp_id' => 1, 'indicador_id' => 41, ),
      41 => array('comp_id' => 1, 'indicador_id' => 42, ),
      42 => array('comp_id' => 1, 'indicador_id' => 43, ),
      43 => array('comp_id' => 1, 'indicador_id' => 44, ),
      44 => array('comp_id' => 1, 'indicador_id' => 45, ),
      45 => array('comp_id' => 1, 'indicador_id' => 46, ),
      46 => array('comp_id' => 1, 'indicador_id' => 47, ),
      47 => array('comp_id' => 1, 'indicador_id' => 48, ),
      48 => array('comp_id' => 1, 'indicador_id' => 49, ),
      49 => array('comp_id' => 7, 'indicador_id' => 50, ),
      50 => array('comp_id' => 7, 'indicador_id' => 51, ),
      51 => array('comp_id' => 5, 'indicador_id' => 52, ),
      52 => array('comp_id' => 4, 'indicador_id' => 53, ),
      53 => array('comp_id' => 4, 'indicador_id' => 54, ),
      54 => array('comp_id' => 3, 'indicador_id' => 55, ),
      55 => array('comp_id' => 7, 'indicador_id' => 56, ),
      56 => array('comp_id' => 5, 'indicador_id' => 57, ),
      57 => array('comp_id' => 3, 'indicador_id' => 58, ),
      58 => array('comp_id' => 3, 'indicador_id' => 59, ),
      59 => array('comp_id' => 3, 'indicador_id' => 60, ),
      60 => array('comp_id' => 4, 'indicador_id' => 61, ),
      61 => array('comp_id' => 4, 'indicador_id' => 62, ),
      62 => array('comp_id' => 5, 'indicador_id' => 63, ),
      63 => array('comp_id' => 5, 'indicador_id' => 64, ),
      64 => array('comp_id' => 1, 'indicador_id' => 65, ),
      65 => array('comp_id' => 7, 'indicador_id' => 66, ),
      66 => array('comp_id' => 5, 'indicador_id' => 67, ),
      67 => array('comp_id' => 5, 'indicador_id' => 68, ),
      68 => array('comp_id' => 5, 'indicador_id' => 69, ),
      69 => array('comp_id' => 1, 'indicador_id' => 70, ),
      70 => array('comp_id' => 1, 'indicador_id' => 71, ),
      71 => array('comp_id' => 4, 'indicador_id' => 72, ),
      72 => array('comp_id' => 1, 'indicador_id' => 73, ),
      73 => array('comp_id' => 4, 'indicador_id' => 74, ),
      74 => array('comp_id' => 8, 'indicador_id' => 75, ),
      75 => array('comp_id' => 5, 'indicador_id' => 76, ),
      76 => array('comp_id' => 5, 'indicador_id' => 77, ),
      77 => array('comp_id' => 3, 'indicador_id' => 78, ),
      78 => array('comp_id' => 7, 'indicador_id' => 79, ),
      79 => array('comp_id' => 7, 'indicador_id' => 80, ),
      80 => array('comp_id' => 5, 'indicador_id' => 81, ),
      81 => array('comp_id' => 7, 'indicador_id' => 82, ),
      82 => array('comp_id' => 7, 'indicador_id' => 83, ),
    ));
  }
}
