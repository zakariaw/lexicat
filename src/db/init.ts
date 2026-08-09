import { runMigrations } from "./migrate";
import { seedDatabase } from "./seed";

export async function initializeDatabase() {
  await runMigrations();
  await seedDatabase();
}
