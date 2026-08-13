export const eixosData = [
  {
    slug: "gestao-e-negocios",
    nome: "Gestão e Negócios",
    descricao: "Liderança e estratégia para formar os gestores do amanhã.",
    icone: "Briefcase",
    cor: "#2563EB",
  },
  {
    slug: "recursos-naturais",
    nome: "Recursos Naturais",
    descricao: "Sustentabilidade e inovação para o desenvolvimento regional.",
    icone: "Leaf",
    cor: "#16A34A",
  },
  {
    slug: "info-e-comunicacao",
    nome: "Info & Comunicação",
    descricao: "Tecnologia de ponta e conectividade global.",
    icone: "Monitor",
    cor: "#7C3AED",
  },
];

export const cursosData = [
  {
    eixoSlug: "gestao-e-negocios",
    slug: "administracao",
    nome: "Administração",
    descricao:
      "O curso técnico em Administração forma profissionais capazes de organizar, planejar e gerir empresas e organizações com eficiência e responsabilidade. Você aprenderá a coordenar equipes, elaborar planos estratégicos e tomar decisões fundamentadas.",
    oQueAprender:
      "Gestão de pessoas e liderança de equipes|Marketing e estratégias de vendas|Contabilidade e controle financeiro|Processos administrativos e organizacionais|Compras, estoque e logística|Empreendedorismo e inovação empresarial",
    ondeAtuar:
      "Empresas privadas de todos os setores|Órgãos públicos e instituições governamentais|Organizações sem fins lucrativos|Comércio, indústria e serviços|Empreendimento próprio como gestor e empreendedor",
    habilidades:
      "Organização e planejamento estratégico|Comunicação assertiva e interpessoal|Liderança e gestão de conflitos|Tomada de decisões sob pressão|Raciocínio analítico e visão sistêmica",
  },
  {
    eixoSlug: "gestao-e-negocios",
    slug: "financas",
    nome: "Finanças",
    descricao:
      "O curso técnico em Finanças prepara profissionais especializados no planejamento, controle e organização de recursos financeiros de empresas e indivíduos. O foco está em administrar o dinheiro com inteligência, controlar gastos e apoiar decisões financeiras estratégicas.",
    oQueAprender:
      "Contabilidade básica e avançada|Matemática financeira e cálculo de juros|Fluxo de caixa e controle de despesas|Orçamento empresarial e familiar|Análise de investimentos e rentabilidade|Custos, precificação e análise financeira",
    ondeAtuar:
      "Bancos, corretoras e instituições financeiras|Departamentos financeiros de empresas|Contabilidades e escritórios de assessoria|Mercado de capitais e investimentos|Gestão financeira pública e privada",
    habilidades:
      "Organização e atenção aos detalhes|Raciocínio lógico e matemático|Responsabilidade e ética profissional|Análise crítica de dados financeiros|Planejamento e disciplina financeira",
  },
  {
    eixoSlug: "recursos-naturais",
    slug: "fruticultura",
    nome: "Fruticultura",
    descricao:
      "O curso técnico em Fruticultura forma profissionais aptos para a produção, manejo e comercialização de frutas, contribuindo para o desenvolvimento sustentável da agricultura regional e nacional.",
    oQueAprender:
      "Preparo, conservação e fertilidade do solo|Técnicas de adubação e nutrição de plantas|Irrigação, drenagem e manejo hídrico|Controle de pragas, doenças e plantas daninhas|Mecanização agrícola e uso de equipamentos|Técnicas de cultivo de fruteiras tropicais e temperadas|Colheita, pós-colheita e comercialização de frutas",
    ondeAtuar:
      "Propriedades rurais e fazendas frutícolas|Empresas agrícolas e agroindústrias|Cooperativas e associações de produtores|Órgãos de assistência técnica e extensão rural|Pesquisa e desenvolvimento agropecuário",
    habilidades:
      "Responsabilidade ambiental e práticas sustentáveis|Capacidade de trabalho ao ar livre|Observação técnica e diagnóstico de problemas|Organização e planejamento da produção agrícola|Adaptabilidade e resiliência no campo",
  },
  {
    eixoSlug: "info-e-comunicacao",
    slug: "desenvolvimento-de-sistemas",
    nome: "Desenvolvimento de Sistemas",
    descricao:
      "O curso técnico em Desenvolvimento de Sistemas prepara profissionais para criar, desenvolver e manter sistemas, aplicativos e soluções digitais que transformam a forma como empresas e pessoas interagem com a tecnologia.",
    oQueAprender:
      "Lógica de programação e algoritmos|Linguagens de programação (Python, JavaScript, Java e outras)|Desenvolvimento de websites e aplicativos mobile|Banco de dados e modelagem de dados|Análise e levantamento de requisitos de sistemas|Fundamentos de redes e infraestrutura de TI|Testes, qualidade de software e boas práticas",
    ondeAtuar:
      "Empresas de tecnologia e startups|Departamentos de TI de empresas de todos os setores|Desenvolvimento freelancer e remoto|Criação de produtos digitais próprios|Consultorias e agências digitais",
    habilidades:
      "Raciocínio lógico e pensamento computacional|Resolução criativa de problemas|Trabalho em equipe e metodologias ágeis|Aprendizado contínuo e autodidata|Criatividade e inovação digital",
  },
];

export const quizData: Record<
  string,
  { enunciado: string; alternativas: { texto: string; correta: boolean }[] }[]
> = {
  administracao: [
    {
      enunciado:
        "O curso de Administração prepara o estudante para atuar principalmente em qual área?",
      alternativas: [
        {
          texto: "Organização, planejamento e gestão de empresas e equipes",
          correta: true,
        },
        {
          texto: "Desenvolvimento de aplicativos e sistemas de software",
          correta: false,
        },
        {
          texto: "Produção e colheita de frutas em propriedades rurais",
          correta: false,
        },
        {
          texto: "Controle de investimentos em bolsa de valores",
          correta: false,
        },
      ],
    },
    {
      enunciado:
        "Qual das seguintes disciplinas você espera estudar no curso de Administração?",
      alternativas: [
        { texto: "Lógica de programação e linguagens de código", correta: false },
        { texto: "Irrigação, adubação e controle de pragas", correta: false },
        {
          texto: "Gestão de pessoas, marketing e processos administrativos",
          correta: true,
        },
        { texto: "Matemática financeira e análise de investimentos", correta: false },
      ],
    },
    {
      enunciado:
        "Um técnico em Administração é frequentemente chamado para resolver situações de:",
      alternativas: [
        { texto: "Programação de sistemas e correção de bugs", correta: false },
        {
          texto: "Conflitos entre colaboradores, metas não atingidas e processos desorganizados",
          correta: true,
        },
        { texto: "Análise de solo e preparo para plantio", correta: false },
        { texto: "Cálculo de fluxo de caixa e taxas de juros", correta: false },
      ],
    },
    {
      enunciado: "Empreendedorismo é um conteúdo presente no curso de Administração?",
      alternativas: [
        {
          texto: "Sim, pois o curso incentiva o desenvolvimento de negócios próprios",
          correta: true,
        },
        { texto: "Não, empreendedorismo é exclusivo do curso de Finanças", correta: false },
        {
          texto: "Apenas superficialmente, pois o foco é em tecnologia agrícola",
          correta: false,
        },
        { texto: "Não, o curso foca apenas em programação de sistemas", correta: false },
      ],
    },
    {
      enunciado:
        "Qual habilidade pessoal é mais desenvolvida no técnico em Administração?",
      alternativas: [
        { texto: "Raciocínio lógico para resolução de bugs de software", correta: false },
        { texto: "Resistência física para trabalho no campo", correta: false },
        { texto: "Especialização em cálculos avançados de matemática", correta: false },
        {
          texto: "Liderança, comunicação e tomada de decisões",
          correta: true,
        },
      ],
    },
    {
      enunciado: "Onde um técnico em Administração pode trabalhar?",
      alternativas: [
        { texto: "Apenas em fazendas e cooperativas agrícolas", correta: false },
        { texto: "Somente em empresas de tecnologia e startups", correta: false },
        {
          texto: "Em empresas privadas, órgãos públicos, comércio, indústria e serviços",
          correta: true,
        },
        {
          texto: "Exclusivamente em bancos e instituições financeiras",
          correta: false,
        },
      ],
    },
    {
      enunciado: "O que significa 'gestão de estoque' no contexto da Administração?",
      alternativas: [
        { texto: "Controlar o código-fonte de programas de computador", correta: false },
        {
          texto: "Controlar a quantidade de produtos armazenados para suprir a demanda sem desperdício",
          correta: true,
        },
        { texto: "Gerenciar a colheita e armazenagem de frutas", correta: false },
        { texto: "Calcular taxas de retorno de investimentos financeiros", correta: false },
      ],
    },
    {
      enunciado: "O estudo de marketing faz parte do currículo de Administração?",
      alternativas: [
        {
          texto: "Sim, o marketing é fundamental para atrair e fidelizar clientes em qualquer negócio",
          correta: true,
        },
        {
          texto: "Não, marketing é exclusivo de cursos de comunicação digital",
          correta: false,
        },
        {
          texto: "Apenas quando o aluno escolhe a área de agronegócio",
          correta: false,
        },
        { texto: "Não, o curso foca apenas em contabilidade avançada", correta: false },
      ],
    },
    {
      enunciado:
        "Na rotina de um administrador, qual tarefa é mais comum?",
      alternativas: [
        { texto: "Escrever linhas de código para desenvolver sistemas", correta: false },
        { texto: "Aplicar fertilizantes e controlar irrigação no campo", correta: false },
        { texto: "Elaborar planilhas de controle financeiro de investimentos", correta: false },
        {
          texto: "Planejar metas, organizar equipes e acompanhar resultados empresariais",
          correta: true,
        },
      ],
    },
    {
      enunciado:
        "Contabilidade básica é um conteúdo que o técnico em Administração estuda?",
      alternativas: [
        {
          texto: "Sim, pois controlar receitas, despesas e resultados faz parte da gestão empresarial",
          correta: true,
        },
        {
          texto: "Não, contabilidade é exclusiva do curso de Finanças",
          correta: false,
        },
        { texto: "Sim, mas apenas para calcular produtividade no campo", correta: false },
        {
          texto: "Não, o curso foca somente em recursos humanos e marketing",
          correta: false,
        },
      ],
    },
  ],
  financas: [
    {
      enunciado:
        "O curso técnico em Finanças foca principalmente em qual área do conhecimento?",
      alternativas: [
        {
          texto: "Planejamento, controle e organização de recursos financeiros",
          correta: true,
        },
        {
          texto: "Criação de sistemas e aplicativos de gestão empresarial",
          correta: false,
        },
        { texto: "Manejo sustentável de culturas frutíferas", correta: false },
        {
          texto: "Liderança de equipes e processos administrativos gerais",
          correta: false,
        },
      ],
    },
    {
      enunciado: "Qual disciplina é central no curso de Finanças?",
      alternativas: [
        { texto: "Lógica de programação e banco de dados", correta: false },
        { texto: "Irrigação, adubação e controle fitossanitário", correta: false },
        { texto: "Gestão de pessoas e marketing empresarial", correta: false },
        {
          texto: "Matemática financeira, fluxo de caixa e análise de investimentos",
          correta: true,
        },
      ],
    },
    {
      enunciado: "Um técnico em Finanças tem como principal responsabilidade:",
      alternativas: [
        {
          texto: "Desenvolver e testar software para empresas de tecnologia",
          correta: false,
        },
        {
          texto: "Administrar recursos financeiros, controlar gastos e apoiar decisões econômicas",
          correta: true,
        },
        { texto: "Coordenar a colheita e comercialização de produtos agrícolas", correta: false },
        {
          texto: "Planejar campanhas de marketing e estratégias de vendas",
          correta: false,
        },
      ],
    },
    {
      enunciado: "O que é fluxo de caixa, estudado no curso de Finanças?",
      alternativas: [
        {
          texto: "O registro e controle das entradas e saídas de dinheiro de uma empresa ou pessoa",
          correta: true,
        },
        {
          texto: "O sistema de irrigação utilizado em plantações de fruticultura",
          correta: false,
        },
        { texto: "A sequência lógica de execução de um programa de computador", correta: false },
        {
          texto: "O fluxo de informações entre os setores de uma empresa",
          correta: false,
        },
      ],
    },
    {
      enunciado: "Onde o técnico em Finanças pode atuar profissionalmente?",
      alternativas: [
        { texto: "Principalmente em fazendas e cooperativas agrícolas", correta: false },
        { texto: "Exclusivamente em empresas de tecnologia e startups", correta: false },
        {
          texto: "Em bancos, corretoras, empresas de todos os setores e mercado de capitais",
          correta: true,
        },
        { texto: "Apenas em órgãos públicos de fiscalização tributária", correta: false },
      ],
    },
    {
      enunciado: "O curso de Finanças ensina sobre análise de investimentos?",
      alternativas: [
        {
          texto: "Sim, analisar investimentos é fundamental para a área financeira",
          correta: true,
        },
        {
          texto: "Não, investimentos são estudados apenas em cursos superiores de economia",
          correta: false,
        },
        { texto: "Apenas no contexto de investimentos em tecnologia agrícola", correta: false },
        {
          texto: "Não, o foco é exclusivamente em gestão de pessoas e equipes",
          correta: false,
        },
      ],
    },
    {
      enunciado:
        "Qual habilidade pessoal é mais valorizada no profissional de Finanças?",
      alternativas: [
        { texto: "Criatividade artística e design gráfico", correta: false },
        { texto: "Resistência física e capacidade de trabalhar ao ar livre", correta: false },
        { texto: "Habilidade para liderar grandes equipes e motivar colaboradores", correta: false },
        {
          texto: "Organização, atenção a detalhes, ética e raciocínio lógico-matemático",
          correta: true,
        },
      ],
    },
    {
      enunciado: "Custos e orçamento empresarial são conteúdos do curso de Finanças?",
      alternativas: [
        {
          texto: "Sim, controlar custos e elaborar orçamentos são tarefas centrais do financeiro",
          correta: true,
        },
        { texto: "Não, esses conteúdos fazem parte apenas do curso de Administração", correta: false },
        {
          texto: "Apenas orçamento é ensinado, custos ficam para a área contábil",
          correta: false,
        },
        { texto: "Não, o curso foca apenas em matemática teórica", correta: false },
      ],
    },
    {
      enunciado:
        "Na rotina de um profissional de Finanças, o que ele mais realiza?",
      alternativas: [
        { texto: "Escreve e revisa código de sistemas financeiros digitais", correta: false },
        { texto: "Realiza visitas a campo para avaliar colheitas e produção", correta: false },
        {
          texto: "Analisa relatórios financeiros, controla despesas e orienta decisões econômicas",
          correta: true,
        },
        {
          texto: "Coordena equipes de vendas e define estratégias de marketing",
          correta: false,
        },
      ],
    },
    {
      enunciado:
        "O técnico em Finanças pode trabalhar com gestão financeira pública?",
      alternativas: [
        {
          texto: "Sim, instituições públicas também precisam de profissionais para controlar suas finanças",
          correta: true,
        },
        {
          texto: "Não, o setor público utiliza apenas economistas com formação superior",
          correta: false,
        },
        { texto: "Apenas em prefeituras de pequenos municípios", correta: false },
        { texto: "Não, o curso é voltado exclusivamente para o setor privado", correta: false },
      ],
    },
  ],
  fruticultura: [
    {
      enunciado:
        "O curso técnico em Fruticultura prepara o profissional para trabalhar com:",
      alternativas: [
        {
          texto: "Produção, manejo e comercialização de frutas",
          correta: true,
        },
        { texto: "Desenvolvimento de sistemas de irrigação digital", correta: false },
        { texto: "Gestão financeira de cooperativas agropecuárias", correta: false },
        { texto: "Marketing e vendas de produtos agrícolas", correta: false },
      ],
    },
    {
      enunciado: "Qual disciplina faz parte do curso de Fruticultura?",
      alternativas: [
        { texto: "Lógica de programação e banco de dados", correta: false },
        { texto: "Matemática financeira e fluxo de caixa", correta: false },
        {
          texto: "Controle de pragas, doenças e manejo fitossanitário",
          correta: true,
        },
        { texto: "Marketing digital e estratégias de vendas online", correta: false },
      ],
    },
    {
      enunciado:
        "O técnico em Fruticultura estuda técnicas de preparo e conservação do solo. Por quê?",
      alternativas: [
        { texto: "Para criar sistemas digitais de monitoramento de fazendas", correta: false },
        { texto: "Para calcular o retorno financeiro de cada colheita", correta: false },
        {
          texto: "Porque um solo saudável é a base para o bom desenvolvimento e produção de frutas",
          correta: true,
        },
        {
          texto: "Para desenvolver fertilizantes químicos em laboratório",
          correta: false,
        },
      ],
    },
    {
      enunciado: "Irrigação e drenagem são conteúdos do curso de Fruticultura?",
      alternativas: [
        {
          texto: "Sim, o manejo correto da água é essencial para o cultivo de fruteiras",
          correta: true,
        },
        {
          texto: "Não, esses conteúdos fazem parte de cursos de engenharia civil",
          correta: false,
        },
        { texto: "Apenas irrigação é estudada, drenagem fica para a agronomia", correta: false },
        { texto: "Não, o curso foca apenas na parte comercial da produção", correta: false },
      ],
    },
    {
      enunciado: "Onde o técnico em Fruticultura pode trabalhar?",
      alternativas: [
        { texto: "Apenas em laboratórios de pesquisa em universidades", correta: false },
        { texto: "Somente em empresas de tecnologia do agronegócio", correta: false },
        { texto: "Exclusivamente em órgãos governamentais de fiscalização", correta: false },
        {
          texto: "Em propriedades rurais, empresas agrícolas, cooperativas e extensão rural",
          correta: true,
        },
      ],
    },
    {
      enunciado: "O curso de Fruticultura incentiva práticas sustentáveis?",
      alternativas: [
        {
          texto: "Sim, o curso valoriza técnicas que preservam o meio ambiente e garantem produção sustentável",
          correta: true,
        },
        {
          texto: "Não, sustentabilidade é exclusivamente abordada em cursos de meio ambiente",
          correta: false,
        },
        { texto: "Apenas quando aplicado ao mercado exportador", correta: false },
        {
          texto: "Não, o foco é apenas na produtividade máxima sem restrições",
          correta: false,
        },
      ],
    },
    {
      enunciado:
        "Mecanização agrícola é um conteúdo abordado no curso de Fruticultura?",
      alternativas: [
        { texto: "Não, máquinas agrícolas são estudadas apenas em cursos de mecânica", correta: false },
        { texto: "Apenas de forma teórica, sem aplicação prática", correta: false },
        {
          texto: "Sim, o uso de máquinas e equipamentos agrícolas aumenta a produtividade das fruticultura",
          correta: true,
        },
        { texto: "Não, o curso foca apenas em técnicas manuais de cultivo", correta: false },
      ],
    },
    {
      enunciado:
        "Qual habilidade pessoal é mais importante para o técnico em Fruticultura?",
      alternativas: [
        {
          texto: "Raciocínio lógico para desenvolver programas de computador",
          correta: false,
        },
        { texto: "Capacidade de negociação e liderança em ambientes corporativos", correta: false },
        {
          texto: "Responsabilidade ambiental, observação técnica e adaptabilidade ao campo",
          correta: true,
        },
        { texto: "Habilidade matemática para análise de investimentos financeiros", correta: false },
      ],
    },
    {
      enunciado:
        "O técnico em Fruticultura aprende sobre colheita e pós-colheita de frutas?",
      alternativas: [
        {
          texto: "Sim, a colheita e o manejo pós-colheita são fundamentais para a qualidade e comercialização",
          correta: true,
        },
        { texto: "Não, isso é responsabilidade apenas do engenheiro agrônomo", correta: false },
        { texto: "Apenas sobre colheita; pós-colheita é área de logística", correta: false },
        { texto: "Não, o foco é apenas no cultivo, sem abordar colheita", correta: false },
      ],
    },
    {
      enunciado:
        "Na rotina de um técnico em Fruticultura, o que é mais comum?",
      alternativas: [
        { texto: "Passar horas codificando sistemas de gestão agrícola", correta: false },
        {
          texto: "Monitorar plantações, avaliar sanidade das plantas e orientar o manejo da produção",
          correta: true,
        },
        { texto: "Elaborar relatórios financeiros e controlar orçamentos de fazendas", correta: false },
        { texto: "Realizar vendas porta a porta de frutas para supermercados", correta: false },
      ],
    },
  ],
  "desenvolvimento-de-sistemas": [
    {
      enunciado:
        "O curso técnico em Desenvolvimento de Sistemas forma profissionais para:",
      alternativas: [
        { texto: "Planejar e gerir equipes em empresas de tecnologia", correta: false },
        { texto: "Controlar finanças e investimentos de startups digitais", correta: false },
        {
          texto: "Criar, desenvolver e manter sistemas, aplicativos e soluções digitais",
          correta: true,
        },
        { texto: "Produzir e comercializar softwares agrícolas", correta: false },
      ],
    },
    {
      enunciado: "Qual conteúdo é central no curso de Desenvolvimento de Sistemas?",
      alternativas: [
        { texto: "Gestão de pessoas e planejamento estratégico", correta: false },
        {
          texto: "Lógica de programação, linguagens de programação e banco de dados",
          correta: true,
        },
        { texto: "Controle de pragas e técnicas de cultivo agrícola", correta: false },
        { texto: "Matemática financeira e análise de investimentos", correta: false },
      ],
    },
    {
      enunciado:
        "O técnico em Desenvolvimento de Sistemas aprende a criar websites e aplicativos?",
      alternativas: [
        {
          texto: "Sim, o desenvolvimento web e mobile é parte central do curso",
          correta: true,
        },
        {
          texto: "Não, websites são criados por designers gráficos, não técnicos de sistemas",
          correta: false,
        },
        { texto: "Apenas websites estáticos sem funcionalidades", correta: false },
        { texto: "Não, o curso foca exclusivamente em bancos de dados", correta: false },
      ],
    },
    {
      enunciado: "Por que banco de dados é estudado no curso de Desenvolvimento de Sistemas?",
      alternativas: [
        { texto: "Para controlar estoque de produtos em empresas de varejo", correta: false },
        { texto: "Para gerenciar a produção agrícola e o fluxo de colheitas", correta: false },
        {
          texto: "Porque todo sistema precisa armazenar, organizar e recuperar dados de forma eficiente",
          correta: true,
        },
        { texto: "Para calcular o retorno financeiro de projetos tecnológicos", correta: false },
      ],
    },
    {
      enunciado: "O que é lógica de programação, estudada no curso?",
      alternativas: [
        {
          texto: "A capacidade de criar sequências de instruções para resolver problemas computacionais",
          correta: true,
        },
        { texto: "A lógica usada para organizar processos administrativos em empresas", correta: false },
        {
          texto: "Uma técnica de planejamento financeiro baseada em algoritmos",
          correta: false,
        },
        { texto: "O método de planejamento de colheitas e rotação de culturas", correta: false },
      ],
    },
    {
      enunciado: "Onde o técnico em Desenvolvimento de Sistemas pode trabalhar?",
      alternativas: [
        { texto: "Apenas em grandes empresas de tecnologia como Google e Microsoft", correta: false },
        { texto: "Somente no setor público de tecnologia da informação", correta: false },
        {
          texto: "Em empresas de tecnologia, startups, agências digitais, como freelancer e em qualquer setor que use tecnologia",
          correta: true,
        },
        { texto: "Exclusivamente em cooperativas de software livre", correta: false },
      ],
    },
    {
      enunciado:
        "O curso inclui fundamentos de redes e infraestrutura de TI?",
      alternativas: [
        {
          texto: "Sim, entender redes e infraestrutura é importante para um desenvolvedor completo",
          correta: true,
        },
        { texto: "Não, redes são exclusivas do curso de Técnico em Informática", correta: false },
        { texto: "Apenas conceitos teóricos, sem nenhuma aplicação prática", correta: false },
        { texto: "Não, o curso foca apenas em linguagens de programação front-end", correta: false },
      ],
    },
    {
      enunciado:
        "Qual habilidade pessoal é mais desenvolvida no curso de Desenvolvimento de Sistemas?",
      alternativas: [
        { texto: "Liderança e gestão de conflitos em equipes corporativas", correta: false },
        { texto: "Resistência física e adaptação ao trabalho ao ar livre", correta: false },
        { texto: "Organização financeira e controle de orçamentos", correta: false },
        {
          texto: "Raciocínio lógico, resolução de problemas e criatividade digital",
          correta: true,
        },
      ],
    },
    {
      enunciado:
        "Testes e qualidade de software são abordados no curso?",
      alternativas: [
        {
          texto: "Sim, garantir que o software funcione corretamente é responsabilidade do desenvolvedor",
          correta: true,
        },
        { texto: "Não, testes são realizados apenas por engenheiros de software sênior", correta: false },
        { texto: "Apenas testes manuais básicos são ensinados", correta: false },
        { texto: "Não, o curso foca somente na criação do código", correta: false },
      ],
    },
    {
      enunciado:
        "Na rotina de um desenvolvedor de sistemas, o que é mais comum?",
      alternativas: [
        { texto: "Elaborar relatórios financeiros e analisar indicadores de performance", correta: false },
        { texto: "Fazer visitas técnicas a clientes para avaliar processos administrativos", correta: false },
        { texto: "Trabalhar no campo monitorando sistemas de irrigação digital", correta: false },
        {
          texto: "Escrever e testar código, resolver bugs e criar novas funcionalidades para sistemas",
          correta: true,
        },
      ],
    },
  ],
};
