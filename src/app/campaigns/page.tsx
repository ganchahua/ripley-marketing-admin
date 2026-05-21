"use client";
import Link from 'next/link';
import { Edit, Trash2, Eye, Plus, Search } from 'lucide-react';


export default function CampaignsPage() {
  // Datos de ejemplo (Esto vendrá de tu API en Atlas)
  const campaigns = [
    {
      id: "1",
      name: "Cyber Ripley - Calzado",
      urls: ["/calzado", "/zapatillas-hombre"],
      schedule: "15/05 - 20/05",
      skus: 5,
      status: "Activa"
    },
    {
      id: "2",
      name: "Bomba Home Office",
      urls: ["/tecnologia", "/muebles-oficina"],
      schedule: "18/05 - 25/05",
      skus: 3,
      status: "Programada"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Encabezado del Módulo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Módulo de Campañas</h1>
          <p className="text-slate-500 text-sm">Gestiona las bombas de navegación y personalización.</p>
        </div>
        <Link href="/campaigns/new">
          <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm">
            <Plus className="w-5 h-5 mr-2" /> Nueva Campaña
          </button>
        </Link>
      
      </div>

      {/* Barra de Filtros Rápida */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o URL..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select className="px-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none">
          <option>Todos los estados</option>
          <option>Activa</option>
          <option>Programada</option>
          <option>Finalizada</option>
        </select>
      </div>

      {/* Tabla CRUD */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Campaña</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">URLs Destino</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Vigencia</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">SKUs</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Estado</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{camp.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {camp.urls.map((url, index) => (
                        <span key={index} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                          {url}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{camp.schedule}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-semibold">{camp.skus}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      camp.status === 'Activa' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {camp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Ver detalle">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" title="Editar">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Eliminar">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}