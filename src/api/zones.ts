import type { Zone } from '../types/zone';

export async function fetchZones(): Promise<Zone[]> {
  const res = await fetch('/api/zones');
  if (!res.ok) throw new Error('Failed to load zones');
  return res.json();
}

export async function updateZoneApi(
  id: string,
  hasColor: number,
  assignedTo: string,
  boxLocation: string,
): Promise<Zone> {
  const res = await fetch(`/api/zones/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hasColor, assignedTo, boxLocation }),
  });
  if (!res.ok) throw new Error('Save failed');
  return res.json();
}
