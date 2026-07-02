import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("vocab.db");

export function initDb() {
  db.execSync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS vocab (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lemma TEXT NOT NULL UNIQUE,
      english TEXT NOT NULL,
      pos TEXT NOT NULL,
      root TEXT,
      status TEXT DEFAULT 'unknown'
        CHECK(status IN ('unknown', 'known'))
    );

    CREATE TABLE IF NOT EXISTS document_vocab (
      document_id INTEGER NOT NULL,
      vocab_id INTEGER NOT NULL,
      frequency INTEGER DEFAULT 1,

      PRIMARY KEY (document_id, vocab_id),

      FOREIGN KEY (document_id)
        REFERENCES documents(id)
        ON DELETE CASCADE,

      FOREIGN KEY (vocab_id)
        REFERENCES vocab(id)
        ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS word_forms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vocab_id INTEGER NOT NULL,
      feature TEXT NOT NULL,
      value TEXT NOT NULL,

      FOREIGN KEY (vocab_id)
        REFERENCES vocab(id)
        ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS document_stats (
      document_id INTEGER PRIMARY KEY,

      total_tokens INTEGER DEFAULT 0,
      unique_vocab INTEGER DEFAULT 0,
      known_vocab INTEGER DEFAULT 0,
      unknown_vocab INTEGER DEFAULT 0,

      FOREIGN KEY (document_id)
        REFERENCES documents(id)
        ON DELETE CASCADE
    );
  `);
}

export function clearDatabase() {
  db.execSync(`
    DROP TABLE IF EXISTS documents;
    DROP TABLE IF EXISTS vocab;
    DROP TABLE IF EXISTS document_vocab;
    DROP TABLE IF EXISTS word_forms;
    DROP TABLE IF EXISTS document_stats;
  `);
}
