import {
  getBooks,
  getChapter,
  markChapterAsRead,
  resetChapterReadDates,
} from "./queries";

export async function testDatabase() {
  console.log("===== DATABASE TEST =====");

  // Get books
  const books = getBooks();

  console.log("Books:");
  console.log(books);

  // Get chapter
  const chapter = getChapter(1, 1);

  console.log("Chapter 1 of Book 1:");
  console.log(chapter);

  // Mark chapter as read
  markChapterAsRead(1, 1);

  const readChapter = getChapter(1, 1);

  console.log("After marking Chapter 1 as read:");
  console.log(readChapter);

  // Reset all chapter read dates
  resetChapterReadDates();

  const resetChapter = getChapter(1, 1);

  console.log("After resetting read dates:");
  console.log(resetChapter);

  console.log("===== TEST COMPLETE =====");
}
