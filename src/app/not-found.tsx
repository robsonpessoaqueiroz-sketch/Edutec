import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-[#168F6B]/10 flex items-center justify-center mb-6">
        <Search className="w-10 h-10 text-[#168F6B]" aria-hidden="true" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
      <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Página não encontrada
      </p>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#168F6B] text-white font-semibold rounded-xl hover:bg-[#127558] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B] focus-visible:ring-offset-2"
      >
        <ArrowLeft className="w-5 h-5" aria-hidden="true" />
        Voltar para início
      </Link>
    </div>
  );
}
