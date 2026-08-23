import bookData from "@/assets/json/book.json";
import { booksTable, chaptersTable, volumesTable } from "./schema";

import { db } from "./index";

import { eq } from "drizzle-orm";

// ============================================================
// Data Flow Diagram

//               book.json
//                   │
//                   │
//                   ▼
//            ┌─────────────┐
//            │ seedBooks() │
//            └──────┬──────┘
//                   │
//         ┌─────────┴─────────┐
//         ▼                   ▼
//      Volumes          Standalone Books
//         │                   │
//         ▼                   ▼
//    Check hash          Check hash
//         │                   │
//    ┌────┴────┐         ┌────┴────┐
//    │         │         │         │
//  Same     Different   Same    Different
//    │         │         │         │
//    ▼         ▼         ▼         ▼
//   Skip     Rebuild    Skip     Rebuild
//               │                   │
//               ▼                   ▼
//         Volume + Books      Book + Chapters
//         + Chapters
// ============================================================

// ============================================================
// Types
// ============================================================

type ChapterAsset = {
  id: number;
  title_en: string;
  title_ar: string;
  content: string;
};

type BookAsset = {
  id: number;
  title_en: string;
  title_ar: string;
  chapters: ChapterAsset[];
  asset_hash?: string;
};

type VolumeAsset = {
  id: number;
  title_en: string;
  title_ar: string;
  asset_hash: string;
  books: BookAsset[];
};

type BookAssetFile = {
  volumes?: VolumeAsset[];
  books?: BookAsset[];
};

// ============================================================
// Delete book chapters
// ============================================================

function deleteBookChapters(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  bookId: number,
) {
  tx.delete(chaptersTable).where(eq(chaptersTable.book_id, bookId)).run();
}

// ============================================================
// Delete book
// ============================================================

function deleteBook(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  bookId: number,
) {
  deleteBookChapters(tx, bookId);

  tx.delete(booksTable).where(eq(booksTable.id, bookId)).run();
}

// ============================================================
// Delete volume
// ============================================================

function deleteVolume(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  volumeId: number,
) {
  const books = tx
    .select({
      id: booksTable.id,
    })
    .from(booksTable)
    .where(eq(booksTable.volume_id, volumeId))
    .all();

  for (const book of books) {
    deleteBookChapters(tx, book.id);
  }

  tx.delete(booksTable).where(eq(booksTable.volume_id, volumeId)).run();

  tx.delete(volumesTable).where(eq(volumesTable.id, volumeId)).run();
}

// ============================================================
// Get volume hash
// ============================================================

function getVolumeHash(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  volumeId: number,
) {
  const result = tx
    .select({
      asset_hash: volumesTable.asset_hash,
    })
    .from(volumesTable)
    .where(eq(volumesTable.id, volumeId))
    .limit(1)
    .all();

  return result[0]?.asset_hash ?? null;
}

// ============================================================
// Get standalone book
// ============================================================

function getBook(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  bookId: number,
) {
  const result = tx
    .select({
      volume_id: booksTable.volume_id,
      asset_hash: booksTable.asset_hash,
    })
    .from(booksTable)
    .where(eq(booksTable.id, bookId))
    .limit(1)
    .all();

  return result[0] ?? null;
}

// ============================================================
// Check volume hash
// ============================================================

function volumeIsCurrent(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  volume: VolumeAsset,
) {
  const storedHash = getVolumeHash(tx, volume.id);

  return storedHash === volume.asset_hash;
}

// ============================================================
// Check standalone book hash
// ============================================================

function bookIsCurrent(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  book: BookAsset,
) {
  const existingBook = getBook(tx, book.id);

  if (!existingBook) {
    return false;
  }

  return (
    existingBook.volume_id === null &&
    existingBook.asset_hash === book.asset_hash
  );
}

// ============================================================
// Insert volume
// ============================================================

function insertVolume(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  volume: VolumeAsset,
) {
  tx.insert(volumesTable)
    .values({
      id: volume.id,
      title_en: volume.title_en,
      title_ar: volume.title_ar,
      asset_hash: volume.asset_hash,
    })
    .run();
}

// ============================================================
// Insert book
// ============================================================

function insertBook(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  book: BookAsset,
  volumeId: number | null,
) {
  tx.insert(booksTable)
    .values({
      id: book.id,
      volume_id: volumeId,
      title_en: book.title_en,
      title_ar: book.title_ar,
      asset_hash: volumeId === null ? (book.asset_hash ?? null) : null,
    })
    .run();
}

// ============================================================
// Insert chapter
// ============================================================

function insertChapter(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  bookId: number,
  chapter: ChapterAsset,
) {
  tx.insert(chaptersTable)
    .values({
      book_id: bookId,
      chapter_number: chapter.id,
      title_en: chapter.title_en,
      title_ar: chapter.title_ar,
      content: chapter.content,
      last_read_at: null,
    })
    .run();
}

// ============================================================
// Insert chapters
// ============================================================

function insertChapters(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  book: BookAsset,
) {
  for (const chapter of book.chapters) {
    insertChapter(tx, book.id, chapter);
  }
}

// ============================================================
// Seed volume
// ============================================================

function seedVolume(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  volume: VolumeAsset,
) {
  const current = volumeIsCurrent(tx, volume);

  if (current) {
    return;
  }

  deleteVolume(tx, volume.id);

  insertVolume(tx, volume);

  for (const book of volume.books) {
    insertBook(tx, book, volume.id);
    insertChapters(tx, book);
  }
}

// ============================================================
// Seed standalone book
// ============================================================

function seedStandaloneBook(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  book: BookAsset,
) {
  const current = bookIsCurrent(tx, book);

  if (current) {
    return;
  }

  deleteBook(tx, book.id);

  insertBook(tx, book, null);
  insertChapters(tx, book);
}

// ============================================================
// Seed all volumes
// ============================================================

function seedVolumes(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  data: BookAssetFile,
) {
  for (const volume of data.volumes ?? []) {
    seedVolume(tx, volume);
  }
}

// ============================================================
// Seed standalone books
// ============================================================

function seedStandaloneBooks(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  data: BookAssetFile,
) {
  for (const book of data.books ?? []) {
    seedStandaloneBook(tx, book);
  }
}

// ============================================================
// Main seed
// ============================================================

export function seedBooks() {
  db.transaction((tx) => {
    seedVolumes(tx, bookData);
    seedStandaloneBooks(tx, bookData);
  });

  // ============================================================
  // Verify seed
  // ============================================================

  const volumes = db.select().from(volumesTable).all();

  const books = db.select().from(booksTable).all();

  const chapters = db.select().from(chaptersTable).all();

  console.log("========================================");
  console.log("📚 BOOK SEED COMPLETED");
  console.log("========================================");

  console.log(`Volumes:  ${volumes.length}`);
  console.log(`Books:    ${books.length}`);
  console.log(`Chapters: ${chapters.length}`);

  console.log("========================================");
}
