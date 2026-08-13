import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eixos as eixosTable, cursos as cursosTable, perguntas as perguntasTable, alternativas as alternativasTable, respostasUsuario as respostasUsuarioTable, interesseUsuario as interesseUsuarioTable, } from "./schema";
import { eixosData, cursosData, quizData } from "../lib/seed-data";

const databaseUrl = process.env.DATABASE_URL;
const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

let pool: Pool | undefined;
let db: any;

if (databaseUrl) {
  // Use Postgres (Supabase) via DATABASE_URL
  pool =
    globalForDb.__arenaNextJsPostgresqlPool ??
    new Pool({
      connectionString: databaseUrl,
    });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__arenaNextJsPostgresqlPool = pool;
  }

  db = drizzle(pool);
} else {
  // Fallback: banco em memória (sem persistência)
  const genId = () => (typeof crypto !== "undefined" && (crypto as any).randomUUID ? (crypto as any).randomUUID() : Date.now().toString());

  const store: Record<string, any[]> = {
    eixos: [],
    cursos: [],
    perguntas: [],
    alternativas: [],
    respostas_usuario: [],
    interesse_usuario: [],
  };

  (function seedMemory() {
    store.eixos = eixosData.map((e) => ({ ...e, id: genId() }));
    store.cursos = coursesFromSeed(cursosData, store.eixos, genId);

    for (const cursoSlug of Object.keys(quizData)) {
      const curso = store.cursos.find((c) => c.slug === cursoSlug);
      if (!curso) continue;
      const perguntas = quizData[cursoSlug];
      for (let i = 0; i < perguntas.length; i++) {
        const p = perguntas[i];
        const perguntaId = genId();
        store.perguntas.push({ id: perguntaId, cursoId: curso.id, enunciado: p.enunciado, ordem: i + 1 });
        for (const alt of p.alternativas) {
          store.alternativas.push({ id: genId(), perguntaId, texto: alt.texto, correta: !!alt.correta });
        }
      }
    }
  })();

  function coursesFromSeed(cursosData: any[], eixos: any[], genIdFn: () => string) {
    return cursosData.map((c) => {
      const eixo = eixos.find((x) => x.slug === c.eixoSlug);
      return { ...c, id: genIdFn(), eixoId: eixo ? eixo.id : null };
    });
  }

  const tableMap = new Map<any, string>([
    [eixosTable, "eixos"],
    [cursosTable, "cursos"],
    [perguntasTable, "perguntas"],
    [alternativasTable, "alternativas"],
    [respostasUsuarioTable, "respostas_usuario"],
    [interesseUsuarioTable, "interesse_usuario"],
  ]);

  function resolveTable(tableObj: any): string {
    return tableMap.get(tableObj) ?? (typeof tableObj === "string" ? tableObj : "");
  }

  function cloneRows(rows: any[]) {
    return rows.map((r) => ({ ...r }));
  }

  function filterByValues(rows: any[], values: any[]): any[] {
    if (!values || values.length === 0) return rows;
    return rows.filter((row) => {
      return values.every((v) => Object.values(row).some((f) => f === v));
    });
  }

  db = {
    select() {
      return {
        from(tableObj: any) {
          const table = resolveTable(tableObj);
          let result = cloneRows(store[table] ?? []);
          const self: any = {
            where: (...args: any[]) => {
              const values: any[] = [];
              const collect = (v: any) => {
                if (v == null) return;
                if (Array.isArray(v)) return v.forEach(collect);
                if (typeof v === "object") return Object.values(v).forEach(collect);
                values.push(v);
              };
              args.forEach(collect);
              result = filterByValues(result, values);
              return self;
            },
            limit: (n: number) => {
              result = result.slice(0, n);
              return self;
            },
            then: (onFulfilled: any, onRejected: any) => Promise.resolve(result).then(onFulfilled, onRejected),
          };
          return self;
        },
      };
    },

    insert(tableObj: any) {
      const table = resolveTable(tableObj);
      return {
        values: (vals: any) => ({
          returning: async () => {
            const arr = Array.isArray(vals) ? vals : [vals];
            const inserted = arr.map((v) => ({ ...v, id: v.id ?? genId() }));
            store[table] = store[table].concat(inserted.map((r) => ({ ...r })));
            return inserted;
          },
        }),
      };
    },

    delete(tableObj: any) {
      const table = resolveTable(tableObj);
      return {
        where: (..._args: any[]) => ({
          then: (onFulfilled: any) => {
            store[table] = [];
            return Promise.resolve([]).then(onFulfilled);
          },
        }),
      };
    },
  };
}

export { pool, db };
