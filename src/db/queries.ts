import { and, desc, eq, isNotNull } from "drizzle-orm";
import { db } from "./index";
import { booksTable, chaptersTable, volumesTable } from "./schema";

// ============================================================
// Get all volumes
// ============================================================

export function getVolumes() {
  return db
    .select({
      id: volumesTable.id,
      title_en: volumesTable.title_en,
      title_ar: volumesTable.title_ar,
      asset_hash: volumesTable.asset_hash,
    })
    .from(volumesTable)
    .all();
}

// ============================================================
// Get a particular volume
// ============================================================

export function getVolume(volumeId: number) {
  return db
    .select({
      id: volumesTable.id,
      title_en: volumesTable.title_en,
      title_ar: volumesTable.title_ar,
      asset_hash: volumesTable.asset_hash,
    })
    .from(volumesTable)
    .where(eq(volumesTable.id, volumeId))
    .get();
}

// ============================================================
// Get all books
// ============================================================

export function getBooks() {
  return db
    .select({
      id: booksTable.id,
      volume_id: booksTable.volume_id,
      title_en: booksTable.title_en,
      title_ar: booksTable.title_ar,
      asset_hash: booksTable.asset_hash,
    })
    .from(booksTable)
    .all();
}

// ============================================================
// Get a particular book
// ============================================================

export function getBook(bookId: number) {
  return db
    .select({
      id: booksTable.id,
      volume_id: booksTable.volume_id,
      title_en: booksTable.title_en,
      title_ar: booksTable.title_ar,
      asset_hash: booksTable.asset_hash,
    })
    .from(booksTable)
    .where(eq(booksTable.id, bookId))
    .get();
}

// ============================================================
// Get chapter
// ============================================================

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

// ============================================================
// Mark chapter as read
// ============================================================

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

// ============================================================
// Reset chapter read dates
// ============================================================

export function resetChapterReadDates() {
  db.update(chaptersTable)
    .set({
      last_read_at: null,
    })
    .where(isNotNull(chaptersTable.last_read_at))
    .run();
}

// ============================================================
// Get 3 most recently read chapters
// ============================================================

export function getRecentChapters() {
  return db
    .select()
    .from(chaptersTable)
    .where(isNotNull(chaptersTable.last_read_at))
    .orderBy(desc(chaptersTable.last_read_at))
    .limit(3)
    .all();
}
