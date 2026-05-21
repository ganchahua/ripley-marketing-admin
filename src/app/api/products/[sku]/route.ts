import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  // En versiones recientes, params es una Promise
  { params }: { params: Promise<{ sku: string }> } 
) {
  // 1. DEBES usar await aquí para obtener el SKU real
  const { sku } = await params; 

  // DEBUG: Ahora sí verás el número en tu terminal
  console.log(`[Proxy] Solicitando SKU: ${sku}`);

  if (!sku || sku === 'undefined') {
    return NextResponse.json({ error: 'SKU no proporcionado' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api-pe.ripley.com/marketplace/ecommerce/search/v1/pe/products/by-sku/${sku}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Referer': 'https://www.ripley.com.pe/',
      },
      cache: 'no-store'
    });

    const text = await response.text();
    
    if (!text) {
      return NextResponse.json({ error: 'Ripley no devolvió datos' }, { status: 404 });
    }

    const data = JSON.parse(text);

    // Verificamos el stock en la ruta correcta del JSON de Ripley
    // Generalmente está en data.parentpricestock.stock
    const hasStock = data.parentpricestock?.stock === true;

    return NextResponse.json({
        name: data.name || "Producto Ripley",
        thumbnail: data.thumbnail || (data.images && data.images[0]?.src) || "",
        hasStock: hasStock, // Agregamos esta propiedad
        active: true
    });

  } catch (error: any) {
    console.error("Error en el servidor:", error.message);
    return NextResponse.json({ error: 'Error interno', details: error.message }, { status: 500 });
  }
}