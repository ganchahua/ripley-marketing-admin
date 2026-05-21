export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Encabezado del Módulo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Panel de Control</h1>
          <p className="text-slate-500">Gestiona las bombas de navegación y personalización.</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto w-full">

          {/* Grid de tarjetas de ejemplo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-700">Campañas</h3>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-700">Productos</h3>
              <p className="text-2xl font-bold text-purple-600">1,240</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-700">Banners</h3>
              <p className="text-2xl font-bold text-orange-600">5</p>
            </div>
          </div>
        </div>
    </div>
    
  );
}