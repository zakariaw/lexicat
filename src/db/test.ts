import { getBooks, getChapter } from "./queries";

export function testDatabase() {
  console.log("Books:", getBooks());
  console.log("Chapter 1 of Book 1:", getChapter(1, 1));
}
