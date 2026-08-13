export interface Eixo {
  id: string;
  slug: string;
  nome: string;
  descricao: string;
  icone: string;
  cor: string;
  cursos?: Curso[];
}

export interface Curso {
  id: string;
  eixoId: string | null;
  slug: string;
  nome: string;
  descricao: string;
  oQueAprender: string;
  ondeAtuar: string;
  habilidades: string;
  eixo?: Eixo;
}

export interface Pergunta {
  id: string;
  cursoId: string | null;
  enunciado: string;
  ordem: number;
  alternativas: Alternativa[];
}

export interface Alternativa {
  id: string;
  perguntaId: string | null;
  texto: string;
  correta: boolean;
}

export interface RespostaUsuario {
  id: string;
  sessaoId: string;
  cursoId: string | null;
  perguntaId: string | null;
  alternativaId: string | null;
  acertou: boolean;
  createdAt: Date | null;
}

export interface InteresseUsuario {
  id: string;
  sessaoId: string;
  cursoId: string | null;
  status: "quero" | "talvez" | "nao_quero";
  updatedAt: Date | null;
}

export type InteresseStatus = "quero" | "talvez" | "nao_quero";

export interface QuizResult {
  perguntaId: string;
  enunciado: string;
  alternativaEscolhidaId: string;
  alternativaCorretaId: string;
  acertou: boolean;
  textoEscolhido: string;
  textoCorreto: string;
}
