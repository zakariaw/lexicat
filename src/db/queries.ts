import { and, eq } from "drizzle-orm";
import { db } from "./index";
import { booksTable, chaptersTable } from "./schema";

export function getBooks() {
  return db
    .select({
      id: booksTable.id,
      title_en: booksTable.title_en,
      title_ar: booksTable.title_ar,
    })
    .from(booksTable)
    .all();
}

export function getChapter(bookId: number, chapterNumber: number) {
  return db
    .select()
    .from(chaptersTable)
    .where(
      and(
        eq(chaptersTable.book_id, bookId),
        eq(chaptersTable.chapter_number, chapterNumber),
      ),
    )
    .get();
}
