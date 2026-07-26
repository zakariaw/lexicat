import { db } from "./client";

const json = `{
  "title": "First Arabic lesson",
  "content": "هذا كتاب"
}`;

type NewDocument = {
  title: string;
  content: string;
};

// TODO: Just check if there is any data in the database or particular to verify migration was successful.

export function runMigration(): void {
  const document = JSON.parse(json) as NewDocument;

  const alreadyExists = db.getFirstSync<{ id: number }>(
    "SELECT id FROM documents WHERE title = ? LIMIT 1",
    [document.title],
  );

  if (alreadyExists) {
    console.log("Already in database:", alreadyExists.id);
    return;
  }

  const result = db.runSync(
    "INSERT INTO documents (title, content) VALUES (?, ?)",
    [document.title, document.content],
  );

  console.log("Inserted document:", result.lastInsertRowId);
}

export type Document = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export function getAllDocuments(): Document[] {
  return db.getAllSync<Document>("SELECT * FROM documents ORDER BY id DESC");
}
