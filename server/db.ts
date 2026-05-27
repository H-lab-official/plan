import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import type { Zone, ZoneRow } from './types';

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, 'zones.db'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS zones (
    id           TEXT PRIMARY KEY,
    level        TEXT NOT NULL,
    color        TEXT,
    top          TEXT,
    left_pos     TEXT,
    width        TEXT,
    height       TEXT,
    has_color    INTEGER DEFAULT 0,
    assigned_to  TEXT DEFAULT '',
    updated_at   TEXT DEFAULT (datetime('now'))
  );
`);

function rowToZone(row: ZoneRow): Zone {
  return {
    id: row.id,
    level: row.level,
    color: row.color,
    top: row.top,
    left: row.left_pos,
    width: row.width,
    height: row.height,
    hasColor: row.has_color,
    assignedTo: row.assigned_to,
    updatedAt: row.updated_at,
  };
}

export function getAllZones(): Zone[] {
  const rows = db.prepare('SELECT * FROM zones ORDER BY id').all() as ZoneRow[];
  return rows.map(rowToZone);
}

export function updateZone(
  id: string,
  hasColor: number | string | undefined,
  assignedTo: string | undefined,
): Zone | null {
  const result = db
    .prepare(`
      UPDATE zones
      SET has_color = ?, assigned_to = ?, updated_at = datetime('now')
      WHERE id = ?
    `)
    .run(Number(hasColor) || 0, assignedTo ?? '', id);

  if (result.changes === 0) return null;

  const row = db.prepare('SELECT * FROM zones WHERE id = ?').get(id) as ZoneRow;
  return rowToZone(row);
}

export { db };
