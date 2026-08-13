import bookData from "@/assets/json/book.json";
import { eq } from "drizzle-orm";

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

// ----------------------------------------
// Get existing book
// ----------------------------------------

function getExistingBook(bookId: number) {
  return db.select().from(booksTable).where(eq(booksTable.id, bookId)).get();
}

// ----------------------------------------
// Check whether book needs to be seeded
// ----------------------------------------

function needsSeeding(book: BookJson) {
  const existingBook = getExistingBook(Number(book.id));

  // New book
  if (!existingBook) {
    return true;
  }

  // Content has changed
  return existingBook.asset_hash !== book.asset_hash;
}

// ----------------------------------------
// Insert or update book
// ----------------------------------------

function saveBook(book: BookJson) {
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
}

// ----------------------------------------
// Delete existing chapters
// ----------------------------------------

function deleteChapters(bookId: number) {
  db.delete(chaptersTable).where(eq(chaptersTable.book_id, bookId)).run();
}

// ----------------------------------------
// Insert chapters
// ----------------------------------------

function insertChapters(book: BookJson) {
  const bookId = Number(book.id);

  for (let i = 0; i < book.chapters.length; i++) {
    const chapter = book.chapters[i];

    db.insert(chaptersTable)
      .values({
        book_id: bookId,
        chapter_number: i + 1,
        title_en: chapter.title_en,
        title_ar: chapter.title_ar,
        content: chapter.content,
      })
      .run();
  }
}

// ----------------------------------------
// Replace all chapters for a book
// ----------------------------------------

function replaceChapters(book: BookJson) {
  const bookId = Number(book.id);

  deleteChapters(bookId);
  insertChapters(book);
}

// ----------------------------------------
// Seed one book
// ----------------------------------------

function seedBook(book: BookJson) {
  if (!needsSeeding(book)) {
    console.log(`Skipping "${book.title_en}" - hash matches`);
    return;
  }

  const existingBook = getExistingBook(Number(book.id));

  if (existingBook) {
    console.log(`Updating "${book.title_en}" - hash changed`);
  } else {
    console.log(`Inserting "${book.title_en}" - new book`);
  }

  saveBook(book);
  replaceChapters(book);
}

// ----------------------------------------
// Seed database
// ----------------------------------------

export function seedDatabase() {
  for (const book of books) {
    seedBook(book);
  }

  console.log("Database seeding complete.");
}
