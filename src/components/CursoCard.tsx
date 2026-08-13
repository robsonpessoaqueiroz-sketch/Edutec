"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Curso, Eixo } from "@/types";
import EixoIcon from "./EixoIcon";

interface CursoCardProps {
  curso: Curso;
  eixo?: Eixo;
}

export default function CursoCard({ curso, eixo }: CursoCardProps) {
  const cor = eixo?.cor ?? "#168F6B";
  const icone = eixo?.icone ?? "Briefcase";

  return (
    <Link
      href={`/curso/${curso.slug}`}
      className="group block bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-black/30 hover:border-[#168F6B]/40 dark:hover:border-[#168F6B]/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B]"
      aria-label={`Ver detalhes do curso ${curso.nome}`}
    >
      <div className="flex items-start gap-4">
        <EixoIcon icone={icone} cor={cor} size="sm" />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#168F6B] transition-colors mb-1">
            {curso.nome}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {curso.descricao}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#168F6B] group-hover:gap-2 transition-all">
        <span>Ver curso e fazer quiz</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </div>
    </Link>
  );
}
