import { runMigrations } from "./migrate";
import { seedDatabase } from "./seed";
import { testDatabase } from "./test";

export async function initializeDatabase() {
  await runMigrations();
  await seedDatabase();
  testDatabase();
}
