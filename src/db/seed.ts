import bookData from "@/assets/json/book.json";

import { db } from "./index";
import { booksTable, chaptersTable } from "./schema";

type ChapterJson = {
  id: string;
  title_en: string;
  title_ar: string;
  content: string;
};

type BookJson = {
  id: string;
  title_en: string;
  title_ar: string;
  asset_hash: string;
  chapters: ChapterJson[];
};

const books = bookData as BookJson[];

export function seedDatabase() {
  for (const book of books) {
    // Insert the book
    db.insert(booksTable)
      .values({
        id: Number(book.id),
        title_en: book.title_en,
        title_ar: book.title_ar,
        asset_hash: book.asset_hash,
      })
      .onConflictDoUpdate({
        target: booksTable.id,
        set: {
          title_en: book.title_en,
          title_ar: book.title_ar,
          asset_hash: book.asset_hash,
        },
      })
      .run();

    // Insert the chapters
    for (let i = 0; i < book.chapters.length; i++) {
      const chapter = book.chapters[i];

      db.insert(chaptersTable)
        .values({
          book_id: Number(book.id),
          chapter_number: i + 1,

          title_en: chapter.title_en,
          title_ar: chapter.title_ar,
          content: chapter.content,
        })
        .onConflictDoUpdate({
          target: [chaptersTable.book_id, chaptersTable.chapter_number],
          set: {
            title_en: chapter.title_en,
            title_ar: chapter.title_ar,
            content: chapter.content,
          },
        })
        .run();
    }
  }
}
