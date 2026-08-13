"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Eixo } from "@/types";
import EixoIcon from "./EixoIcon";

interface EixoCardProps {
  eixo: Eixo;
}

export default function EixoCard({ eixo }: EixoCardProps) {
  return (
    <Link
      href={`/eixo/${eixo.slug}`}
      className="group block flex-shrink-0 w-80 sm:w-96 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6 shadow-sm hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-black/30 hover:border-[#168F6B]/40 dark:hover:border-[#168F6B]/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B]"
      aria-label={`Ver cursos do eixo ${eixo.nome}`}
    >
      {/* Icon */}
      <div className="mb-5">
        <EixoIcon icone={eixo.icone} cor={eixo.cor} size="md" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#168F6B] transition-colors">
        {eixo.nome}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
        {eixo.descricao}
      </p>

      {/* Course Chips */}
      {eixo.cursos && eixo.cursos.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {eixo.cursos.map((curso) => (
            <span
              key={curso.id}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${eixo.cor}18`,
                color: eixo.cor,
                border: `1px solid ${eixo.cor}30`,
              }}
            >
              {curso.nome}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="flex items-center gap-1 text-sm font-medium text-[#168F6B] group-hover:gap-2 transition-all">
        <span>Ver cursos</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </div>
    </Link>
  );
}
