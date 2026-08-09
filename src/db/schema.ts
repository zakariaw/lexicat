import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const chaptersTable = sqliteTable("chapters", {
  id: int().primaryKey({ autoIncrement: true }),
  title_en: text().notNull(),
  title_ar: text().notNull(),
  content: text().notNull(),
});


export const metadataTable = sqliteTable("metadata", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});