import { and, desc, eq, isNotNull } from "drizzle-orm";
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

export function markChapterAsRead(bookId: number, chapterNumber: number) {
  db.update(chaptersTable)
    .set({
      last_read_at: Date.now(),
    })
    .where(
      and(
        eq(chaptersTable.book_id, bookId),
        eq(chaptersTable.chapter_number, chapterNumber),
      ),
    )
    .run();
}

export function resetChapterReadDates() {
  db.update(chaptersTable)
    .set({
      last_read_at: null,
    })
    .where(isNotNull(chaptersTable.last_read_at))
    .run();
}

export function getRecentChapters() {
  return db
    .select()
    .from(chaptersTable)
    .where(isNotNull(chaptersTable.last_read_at))
    .orderBy(desc(chaptersTable.last_read_at))
    .limit(3)
    .all();
}
