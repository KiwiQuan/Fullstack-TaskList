import db from "#db/client";

import { createTask } from "#db/queries/tasks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  for (let i = 1; i <= 3; i++) {
    const user = await createUser(`user${i}`, `password${i}`);

    for (let j = 1; j <= 5; j++) {
      await createTask(`Task ${j}`, false, user.id);
    }
  }
}
