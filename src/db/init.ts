import { runMigrations } from "./migrate";
import { seedBooks } from "./seed";

export async function initializeDatabase() {
  await runMigrations();
  seedBooks();
  // testDatabase();
}
