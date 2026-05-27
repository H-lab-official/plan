import { db } from './db';
import { defaultZones } from './zones-data';

const insert = db.prepare(`
  INSERT OR IGNORE INTO zones (id, level, color, top, left_pos, width, height)
  VALUES (@id, @level, @color, @top, @left, @width, @height)
`);

const seedAll = db.transaction((zones: typeof defaultZones) => {
  for (const zone of zones) {
    insert.run(zone);
  }
});

seedAll(defaultZones);

const count = db.prepare('SELECT COUNT(*) AS n FROM zones').get() as { n: number };
console.log(`Seeded ${count.n} zones`);
