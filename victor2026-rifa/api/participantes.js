import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN
});

export default async function handler(req, res) {
  const key = req.query.key;

  if (!process.env.ADMIN_SECRET || key !== process.env.ADMIN_SECRET) {
    res.status(401).json({ error: 'No autorizado' });
    return;
  }

  try {
    const raw = await redis.lrange('participantes', 0, -1);
    const list = raw.map((s) => (typeof s === 'string' ? JSON.parse(s) : s));
    res.status(200).json({ total: list.length, participantes: list });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al leer la lista' });
  }
}
