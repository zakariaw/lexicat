import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("vocab.db");

export function initDb() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS vocab_words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        arabic TEXT NOT NULL,
        english TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'unknown'
            CHECK(status IN ('unknown', 'known')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(arabic, english)
    );
  `);
  console.log("DB ready");
}

export function deleteDb() {
  db.execSync(`DROP TABLE IF EXISTS vocab_words;`);
}
