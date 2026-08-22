import { migrate } from "drizzle-orm/expo-sqlite/migrator";

import migrations from "../../drizzle/migrations";
import { db } from "./index";

export async function runMigrations() {
  try {
    await migrate(db, migrations);

    console.log("Database migrations completed.");
  } catch (error) {
    console.error("Database migration failed:", error);
    throw error;
  }
}
