import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  try {
    const body = req.body || {};
    const nombre = String(body.nombre || '').trim().slice(0, 120);
    const area = String(body.area || '').trim().slice(0, 120);

    if (!nombre || !area) {
      res.status(400).json({ error: 'Faltan datos (nombre y área son obligatorios)' });
      return;
    }

    const entry = {
      nombre,
      area,
      fecha: new Date().toISOString()
    };

    await kv.rpush('participantes', JSON.stringify(entry));

    res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'No se pudo registrar. Intenta de nuevo.' });
  }
}
