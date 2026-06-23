import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("vocab.db");

export function initDb() {
  db.execSync(`

    CREATE TABLE IF NOT EXISTS vocab_words (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      arabic TEXT,

      english TEXT

    );

  `);

  console.log("DB ready");

  seedWords();

  console.log("=== INITIAL ===");

  console.log(fetchWords());

  console.log("=== INSERT TEST ===");

  insertWord("ولد", "Boy");

  console.log("=== AFTER INSERT ===");

  console.log(fetchWords());
}

export function insertWord(arabic: string, english: string) {
  db.runSync(
    `INSERT INTO vocab_words (arabic, english) VALUES (?, ?)`,

    [arabic, english],
  );
}

export function fetchWords() {
  return db.getAllSync(`SELECT * FROM vocab_words`);
}

export function updateWordStatus(id: number, status: "known" | "unknown") {
  db.runSync(
    `UPDATE vocab_words SET status = ? WHERE id = ?`,

    [status, id],
  );
}

export function deleteWord(id: number) {
  db.runSync(
    `DELETE FROM vocab_words WHERE id = ?`,

    [id],
  );
}
export function seedWords() {
  const existing = db.getFirstSync(`

    SELECT COUNT(*) as count FROM vocab_words;

  `) as any;

  if (existing.count > 0) return;

  db.runSync(`

    INSERT INTO vocab_words (arabic, english)

    VALUES

    ('كتاب', 'Book'),

    ('بيت', 'House'),

    ('ماء', 'Water');

  `);

  console.log("Seeded words");
}
