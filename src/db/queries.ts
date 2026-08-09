import { db } from "./index";
import { chaptersTable } from "./schema";
import { eq } from "drizzle-orm";

export async function getChapters() {
  return await db.select().from(chaptersTable);
}

export async function getChapterById(id: number) {
  const result = await db
    .select()
    .from(chaptersTable)
    .where(eq(chaptersTable.id, id))
    .limit(1);

  return result[0] ?? null;
}