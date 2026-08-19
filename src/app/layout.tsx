import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Novos Cursos Técnicos 2027 — EEEP Profª Maria Célia Pinheiro Falcão",
  description:
    "Conheça os novos cursos técnicos que chegarão à EEEP Professora Maria Célia Pinheiro Falcão a partir de 2027: Administração, Finanças, Fruticultura e Desenvolvimento de Sistemas.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('eeep_theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-gray-50 dark:bg-[#0B1120] text-gray-900 dark:text-white antialiased min-h-screen">
        <ThemeProvider>
          <Header />
          <main className="pt-16">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
