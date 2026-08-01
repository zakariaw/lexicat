import { db } from "./client";

export type Document = {
  id: number;
  title: string;
};

export async function getDocuments(): Promise<Document[]> {
  const result = await db.getAllAsync<Document>(
    "SELECT id, title FROM Document ORDER BY created_at DESC",
  );

  return result;
}

// export type VocabStatus = "known" | "unknown";

// // CREATE
// export function insertWord(
//   arabic: string,
//   english: string,
//   status: VocabStatus = "unknown",
// ) {
//   return db.runSync(
//     `
//     INSERT INTO vocab_words (arabic, english, status)
//     VALUES (?, ?, ?);
//       `,
//     [arabic, english, status],
//   );
// }

// // READ
// export function fetchWords() {
//   return db.getAllSync(`
//     SELECT * FROM vocab_words
//     ORDER BY id DESC;
//   `);
// }

// // SEARCH
// export function searchWords(term: string) {
//   return db.getAllSync(
//     `
//     SELECT * FROM vocab_words
//     WHERE arabic LIKE ? OR english LIKE ?
//     ORDER BY id DESC;
//     `,
//     [`%${term}%`, `%${term}%`],
//   );
// }

// // UPDATE STATUS
// export function updateWordStatus(id: number, status: "known" | "unknown") {
//   db.runSync(
//     `
//     UPDATE vocab_words
//     SET status = ?
//     WHERE id = ?;
//     `,
//     [status, id],
//   );
// }

// // DELETE
// export function deleteWord(id: number) {
//   db.runSync(
//     `
//     DELETE FROM vocab_words
//     WHERE id = ?;
//     `,
//     [id],
//   );
// }
