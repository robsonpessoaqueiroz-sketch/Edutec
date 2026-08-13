import {
  pgTable,
  uuid,
  text,
  boolean,
  integer,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const eixos = pgTable("eixos", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  nome: text("nome").notNull(),
  descricao: text("descricao").notNull(),
  icone: text("icone").notNull(),
  cor: text("cor").notNull().default("#168F6B"),
});

export const cursos = pgTable("cursos", {
  id: uuid("id").primaryKey().defaultRandom(),
  eixoId: uuid("eixo_id").references(() => eixos.id),
  slug: text("slug").unique().notNull(),
  nome: text("nome").notNull(),
  descricao: text("descricao").notNull(),
  oQueAprender: text("o_que_aprender").notNull(),
  ondeAtuar: text("onde_atuar").notNull(),
  habilidades: text("habilidades").notNull(),
});

export const perguntas = pgTable("perguntas", {
  id: uuid("id").primaryKey().defaultRandom(),
  cursoId: uuid("curso_id").references(() => cursos.id),
  enunciado: text("enunciado").notNull(),
  ordem: integer("ordem").notNull(),
});

export const alternativas = pgTable("alternativas", {
  id: uuid("id").primaryKey().defaultRandom(),
  perguntaId: uuid("pergunta_id").references(() => perguntas.id),
  texto: text("texto").notNull(),
  correta: boolean("correta").notNull(),
});

export const respostasUsuario = pgTable("respostas_usuario", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessaoId: text("sessao_id").notNull(),
  cursoId: uuid("curso_id").references(() => cursos.id),
  perguntaId: uuid("pergunta_id").references(() => perguntas.id),
  alternativaId: uuid("alternativa_id").references(() => alternativas.id),
  acertou: boolean("acertou").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const interesseUsuario = pgTable(
  "interesse_usuario",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sessaoId: text("sessao_id").notNull(),
    cursoId: uuid("curso_id").references(() => cursos.id),
    status: text("status").notNull(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [unique("interesse_usuario_sessao_curso").on(table.sessaoId, table.cursoId)]
);
