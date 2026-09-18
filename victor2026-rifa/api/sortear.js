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
    if (!raw.length) {
      res.status(200).json({ error: 'Todavía no hay participantes registrados' });
      return;
    }
    const list = raw.map((s) => (typeof s === 'string' ? JSON.parse(s) : s));
    const winner = list[Math.floor(Math.random() * list.length)];

    await redis.set('ultimo_ganador', JSON.stringify({ ...winner, sorteadoEn: new Date().toISOString() }));

    res.status(200).json({ ganador: winner, total: list.length });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al sortear' });
  }
}
