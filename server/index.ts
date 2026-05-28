import express from 'express';
import path from 'path';
import { getAllZones, updateZone } from './db';
import type { UpdateZoneBody } from './types';

const app = express();
const PORT = process.env.PORT || 3000;
const clientDist = path.join(process.cwd(), 'dist');

app.use(express.json());

app.get('/api/zones', (_req, res) => {
  res.json(getAllZones());
});

app.put('/api/zones/:id', (req, res) => {
  const { hasColor, assignedTo, boxLocation } = req.body as UpdateZoneBody;
  const updated = updateZone(req.params.id, hasColor, assignedTo, boxLocation);

  if (!updated) {
    res.status(404).json({ error: 'Zone not found' });
    return;
  }

  res.json(updated);
});

app.use(express.static(clientDist));

app.get('*', (_req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`4EVE Zone Manager running on http://localhost:${PORT}`);
});
