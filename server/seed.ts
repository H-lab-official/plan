import { db } from './db';
import { defaultZones } from './zones-data';

const insert = db.prepare(`
  INSERT OR IGNORE INTO zones (id, level, color, top, left_pos, width, height, box_count)
  VALUES (@id, @level, @color, @top, @left, @width, @height, @boxCount)
`);

const updateBoxCount = db.prepare(`
  UPDATE zones SET box_count = @boxCount WHERE id = @id
`);

const seedAll = db.transaction((zones: typeof defaultZones) => {
  for (const zone of zones) {
    insert.run(zone);
    updateBoxCount.run({ id: zone.id, boxCount: zone.boxCount });
  }
});

seedAll(defaultZones);

const count = db.prepare('SELECT COUNT(*) AS n FROM zones').get() as { n: number };
const totalBoxes = db.prepare('SELECT COALESCE(SUM(box_count), 0) AS n FROM zones').get() as { n: number };
console.log(`Seeded ${count.n} zones (${totalBoxes.n} boxes total)`);
