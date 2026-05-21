import Link from 'next/link';
import { Rocket, Box, LogOut, LayoutDashboard, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Overlay para móviles: oscurece el fondo cuando el menú está abierto */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 flex flex-col
      `}>
        <div className="p-6 text-2xl font-bold border-b border-slate-800 flex justify-between items-center">
          <span>Ripley <span className="text-blue-400">Admin</span></span>
          <button onClick={() => setIsOpen(false)} className="lg:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/" className="flex items-center p-3 hover:bg-slate-800 rounded-lg transition-colors">
            <LayoutDashboard className="mr-3 w-5 h-5" /> Dashboard
          </Link>
          <Link href="/campaigns" className="flex items-center p-3 hover:bg-slate-800 rounded-lg transition-colors">
            <Rocket className="mr-3 w-5 h-5" /> Campañas
          </Link>
          <Link href="/products" className="flex items-center p-3 hover:bg-slate-800 rounded-lg transition-colors">
            <Box className="mr-3 w-5 h-5" /> Productos
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center p-3 w-full text-red-400 hover:bg-slate-800 rounded-lg">
            <LogOut className="mr-3 w-5 h-5" /> Salir
          </button>
        </div>
      </div>
    </>
  );
}