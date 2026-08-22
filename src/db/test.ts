import {
  getBooks,
  getBook,
  getVolumes,
  getVolume,
  getChapter,
  getRecentChapters,
  markChapterAsRead,
  resetChapterReadDates,
} from "./queries";

export function testDatabase() {
  console.log("========================================");
  console.log("        DATABASE TEST START");
  console.log("========================================");

  // ============================================================
  // Get all volumes
  // ============================================================

  const volumes = getVolumes();

  console.log("\n--- All Volumes ---");
  console.log(volumes);

  // ============================================================
  // Get particular volume
  // ============================================================

  const volume = getVolume(1);

  console.log("\n--- Volume 1 ---");
  console.log(volume);

  // ============================================================
  // Get all books
  // ============================================================

  const books = getBooks();

  console.log("\n--- All Books ---");
  console.log(books);

  // ============================================================
  // Get particular book
  // ============================================================

  const book = getBook(1);

  console.log("\n--- Book 1 ---");
  console.log(book);

  // ============================================================
  // Get chapter
  // ============================================================

  const chapter = getChapter(1, 1);

  console.log("\n--- Book 1, Chapter 1 ---");
  console.log(chapter);

  // ============================================================
  // Mark chapter as read
  // ============================================================

  markChapterAsRead(1, 1);

  const readChapter = getChapter(1, 1);

  console.log("\n--- After Marking Chapter as Read ---");
  console.log(readChapter);

  // ============================================================
  // Get recent chapters
  // ============================================================

  const recentChapters = getRecentChapters();

  console.log("\n--- Recent Chapters ---");
  console.log(recentChapters);

  // ============================================================
  // Reset chapter read dates
  // ============================================================

  resetChapterReadDates();

  const resetChapter = getChapter(1, 1);

  console.log("\n--- After Resetting Read Dates ---");
  console.log(resetChapter);

  // ============================================================
  // Verify reset
  // ============================================================

  const recentAfterReset = getRecentChapters();

  console.log("\n--- Recent Chapters After Reset ---");
  console.log(recentAfterReset);

  console.log("\n========================================");
  console.log("        DATABASE TEST COMPLETE");
  console.log("========================================");
}