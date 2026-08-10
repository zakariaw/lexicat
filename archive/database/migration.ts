import { db } from "./client";

type NewDocument = {
  title: string;
  content: string;
};

const documents: NewDocument[] = [
  {
    title: "First Arabic lesson",
    content: "هذا كتاب",
  },
  {
    title: "Second Arabic lesson",
    content: "هذا قلم",
  },
];



export function runMigration(): void {
  for (const document of documents) {
    const alreadyExists = db.getFirstSync<{ id: number }>(
      "SELECT id FROM documents WHERE title = ? LIMIT 1",
      [document.title],
    );

    if (alreadyExists) {
      console.log("Already in database:", alreadyExists.id);
      continue;
    }

    const result = db.runSync(
      "INSERT INTO documents (title, content) VALUES (?, ?)",
      [document.title, document.content],
    );

    console.log(
      `Inserted "${document.title}" with id ${result.lastInsertRowId}`,
    );
  }
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
