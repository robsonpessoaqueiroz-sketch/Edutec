"use client";

import Link from "next/link";
import { Sun, Moon, Menu, X, GraduationCap } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 dark:bg-[#0B1120]/90 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <Link
            href="/"
            className="flex items-center gap-2 min-w-0 flex-1 mr-4"
            aria-label="Ir para página inicial"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#168F6B] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#168F6B] leading-tight hidden sm:block truncate">
                EEEP Profª Maria Célia Pinheiro Falcão
              </p>
              <p className="text-xs font-bold text-[#168F6B] leading-tight sm:hidden truncate">
                EEEP Maria Célia
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight hidden sm:block">
                Novos Cursos Técnicos — 2027
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-[#168F6B] dark:hover:text-[#168F6B] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B] rounded"
            >
              Início
            </Link>
            <Link
              href="/eixo/gestao-e-negocios"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-[#168F6B] dark:hover:text-[#168F6B] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B] rounded"
            >
              Gestão e Negócios
            </Link>
            <Link
              href="/eixo/recursos-naturais"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-[#168F6B] dark:hover:text-[#168F6B] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B] rounded"
            >
              Recursos Naturais
            </Link>
            <Link
              href="/eixo/info-e-comunicacao"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-[#168F6B] dark:hover:text-[#168F6B] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B] rounded"
            >
              Info & Comunicação
            </Link>
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B]"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </nav>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B]"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B]"
            >
              {menuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-800 mt-1 pt-3 flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#168F6B] transition-colors"
            >
              Início
            </Link>
            <Link
              href="/eixo/gestao-e-negocios"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#168F6B] transition-colors"
            >
              Gestão e Negócios
            </Link>
            <Link
              href="/eixo/recursos-naturais"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#168F6B] transition-colors"
            >
              Recursos Naturais
            </Link>
            <Link
              href="/eixo/info-e-comunicacao"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#168F6B] transition-colors"
            >
              Info & Comunicação
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
