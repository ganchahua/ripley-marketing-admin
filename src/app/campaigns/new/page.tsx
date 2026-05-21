"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Plus, Trash2, Clock, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle, ToggleLeft, ToggleRight } from 'lucide-react';

interface SkuItem {
  sku: string;
  weight: string;
  name: string;
  imageUrl: string;
  hasStock: boolean;
  status: 'idle' | 'loading' | 'success' | 'error';
}

export default function NewCampaignPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    urls: '',
    startDate: '',
    startHour: '00',
    startMinute: '00',
    endDate: '',
    endHour: '23',
    endMinute: '59',
    isActive: true // Control manual de estado sin importar el cronograma
  });

  const [skus, setSkus] = useState<SkuItem[]>([
    { sku: '', weight: '', name: '', imageUrl: '', hasStock: false, status: 'idle' }
  ]);

  const addSkuField = () => setSkus([...skus, { sku: '', weight: '', name: '', imageUrl: '', hasStock: false, status: 'idle' }]);
  
  const removeSkuField = (indexToRemove: number) => {
    if (skus.length > 1) {
      setSkus(skus.filter((_, index) => index !== indexToRemove));
    }
  };

  const validateSku = async (index: number, skuValue: string) => {
    if (!skuValue) return;

    const newSkus = [...skus];
    newSkus[index].status = 'loading';
    setSkus(newSkus);

    try {
      const res = await fetch(`/api/products/${skuValue}`);
      const data = await res.json();

      if (res.ok) {
        newSkus[index] = { 
          ...newSkus[index], 
          name: data.name,
          imageUrl: data.thumbnail,
          hasStock: data.hasStock,
          status: 'success' 
        };
      } else {
        newSkus[index].status = 'error';
        newSkus[index].name = 'SKU no existe';
        newSkus[index].hasStock = false;
      }
      setSkus([...newSkus]);
    } catch (err) {
      newSkus[index].status = 'error';
      setSkus([...newSkus]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-500">
      {/* Cabecera de Acción */}
      <div className="flex items-center justify-between">
        <button 
          type="button"
          onClick={() => router.back()}
          className="flex items-center text-slate-500 hover:text-slate-800 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> Volver
        </button>
        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center shadow-md transition-all active:scale-95 font-semibold">
          <Save className="w-5 h-5 mr-2" /> Guardar Campaña
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight text-center md:text-left">Configuración de Nueva Campaña</h1>
        
        <form className="space-y-10">
          {/* Sección 1: Información General */}
          <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              
              {/* Input de Nombre (Toma 2 columnas en pantallas medianas) */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Nombre de la Campaña</label>
                <input 
                  type="text" 
                  placeholder="Ej: Cyber Ripley - Laptops" 
                  className="input-field"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              {/* Control de Activación Manual (Toma 1 columna) */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Estado de Campaña</label>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, isActive: !formData.isActive})}
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg border font-medium transition-all ${
                    formData.isActive 
                      ? 'bg-green-50 border-green-200 text-green-700' 
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <span className="text-sm tracking-wide">
                    {formData.isActive ? 'Habilitada (On)' : 'Deshabilitada (Off)'}
                  </span>
                  <div className="transition-transform duration-200">
                    {formData.isActive ? (
                      <ToggleRight className="w-7 h-7 text-green-600" />
                    ) : (
                      <ToggleLeft className="w-7 h-7 text-slate-400" />
                    )}
                  </div>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">URLs de Destino</label>
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Bomba de Navegación</span>
              </div>
              <textarea 
                placeholder="/tecnologia, /computacion/laptops" 
                className="input-field min-h-[80px] py-3 resize-none"
                rows={2}
                value={formData.urls}
                onChange={(e) => setFormData({...formData, urls: e.target.value})}
              />
              <p className="text-xs text-slate-400 italic text-right">Separa las rutas con comas.</p>
            </div>
          </section>

          {/* Sección 2: Cronograma */}
          <section className="border-t border-slate-100 pt-8 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-800">Cronograma de Publicación</h2>
            </div>

            <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inicio */}
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase text-slate-400 tracking-widest">Inicio de Campaña</label>
                  <div className="grid grid-cols-1 gap-3">
                    <input type="date" className="input-field bg-white" />
                    <div className="flex gap-2">
                      <div className="flex-1 flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
                        <input type="number" placeholder="00" className="w-full px-3 py-2 outline-none text-center" />
                        <span className="bg-slate-50 px-2 py-2 text-[9px] font-bold text-slate-400 border-l border-slate-200">HR</span>
                      </div>
                      <div className="flex-1 flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
                        <input type="number" placeholder="00" className="w-full px-3 py-2 outline-none text-center" />
                        <span className="bg-slate-50 px-2 py-2 text-[9px] font-bold text-slate-400 border-l border-slate-200">MIN</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fin */}
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase text-slate-400 tracking-widest">Fin de Campaña</label>
                  <div className="grid grid-cols-1 gap-3">
                    <input type="date" className="input-field bg-white" />
                    <div className="flex gap-2">
                      <div className="flex-1 flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
                        <input type="number" placeholder="23" className="w-full px-3 py-2 outline-none text-center" />
                        <span className="bg-slate-50 px-2 py-2 text-[9px] font-bold text-slate-400 border-l border-slate-200">HR</span>
                      </div>
                      <div className="flex-1 flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
                        <input type="number" placeholder="59" className="w-full px-3 py-2 outline-none text-center" />
                        <span className="bg-slate-50 px-2 py-2 text-[9px] font-bold text-slate-400 border-l border-slate-200">MIN</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sección 3: Productos */}
          <section className="border-t border-slate-100 pt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">Productos y Distribución</h2>
              <button 
                type="button"
                onClick={addSkuField}
                className="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center bg-blue-50 px-4 py-2 rounded-full transition-all active:scale-95"
              >
                <Plus className="w-4 h-4 mr-1" /> Agregar SKU
              </button>
            </div>

            <div className="space-y-4">
              {skus.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-4 items-start md:items-center p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-200 transition-colors">
                  
                  {/* Previsualización */}
                  <div className="w-16 h-16 bg-slate-50 rounded-lg border border-slate-100 flex-shrink-0 flex items-center justify-center overflow-hidden relative group">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="preview" className="w-full h-full object-contain p-1" />
                    ) : item.status === 'loading' ? (
                      <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate-300" />
                    )}
                  </div>

                  {/* Inputs */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SKU Ripley</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Ej: 201835..." 
                          className={`input-field text-sm pr-8 ${item.status === 'error' ? 'border-red-400 ring-red-50' : ''}`}
                          value={item.sku}
                          onChange={(e) => {
                            const updated = [...skus];
                            updated[index].sku = e.target.value;
                            setSkus(updated);
                          }}
                          onBlur={(e) => validateSku(index, e.target.value)}
                        />
                        {item.status === 'success' && (
                          <CheckCircle2 className="w-4 h-4 text-green-500 absolute right-3 top-2.5" />
                        )}
                      </div>
                      
                      {item.name && (
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <span className={`text-[10px] font-bold truncate max-w-[150px] ${item.status === 'error' ? 'text-red-500' : 'text-blue-600'}`}>
                            {item.name}
                          </span>
                          {item.status === 'success' && (
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase flex items-center gap-1 ${
                              item.hasStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {item.hasStock ? 'En Stock' : 'Sin Stock'}
                              {!item.hasStock && <AlertCircle className="w-3 h-3" />}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Peso de Visualización (%)</label>
                      <input 
                        type="number" 
                        placeholder="Ej: 50" 
                        className="input-field text-sm"
                        value={item.weight}
                        onChange={(e) => {
                          const updated = [...skus];
                          updated[index].weight = e.target.value;
                          setSkus(updated);
                        }}
                      />
                    </div>
                  </div>

                  {/* Acciones */}
                  <button 
                    type="button"
                    onClick={() => removeSkuField(index)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all self-end md:self-center"
                    disabled={skus.length === 1}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}