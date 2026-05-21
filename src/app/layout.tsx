"use client"; 
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Menu } from 'lucide-react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="es">
      {/* Añadimos h-full para asegurar que el body ocupe todo el alto */}
      <body className="bg-gray-50 h-full overflow-hidden text-slate-900">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

          {/* 1. Quitamos el overflow-y-auto de este contenedor */}
          <div className="flex flex-col flex-1 w-full overflow-hidden">
            
            {/* Header móvil - Se queda fijo arriba */}
            <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b shadow-sm z-10">
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label="Abrir menú"
              >
                <Menu className="w-6 h-6" />
              </button>
              <span className="font-bold">Ripley Admin</span>
              <div className="w-6" /> 
            </header>

            {/* 2. El 'main' es el ÚNICO que debe tener el scroll */}
            {/* Quitamos min-h-screen para que use el espacio restante del flex-col */}
            <main className="flex-1 bg-slate-50 overflow-y-auto overflow-x-hidden">
              <div className="p-4 md:p-8 lg:p-10 max-w-[1600px] mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}