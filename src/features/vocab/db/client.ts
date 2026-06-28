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

// db.execSync(`
// CREATE TABLE IF NOT EXISTS documents (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     title TEXT NOT NULL,
//     content TEXT,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE IF NOT EXISTS vocab_words (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     arabic TEXT NOT NULL,
//     english TEXT NOT NULL,
//     status TEXT NOT NULL DEFAULT 'unknown'
//         CHECK(status IN ('unknown', 'known')),
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//     UNIQUE(arabic, english)
// );

// CREATE TABLE IF NOT EXISTS document_vocab (
//     document_id INTEGER NOT NULL,
//     vocab_id INTEGER NOT NULL,
//     PRIMARY KEY(document_id, vocab_id),
//     FOREIGN KEY(document_id) REFERENCES documents(id),
//     FOREIGN KEY(vocab_id) REFERENCES vocab_words(id)
// );
// `);

// CREATE INDEX IF NOT EXISTS idx_doc_vocab_document
// ON document_vocab(document_id);

// CREATE INDEX IF NOT EXISTS idx_doc_vocab_vocab
// ON document_vocab(vocab_id);
