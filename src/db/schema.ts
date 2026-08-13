import { int, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const booksTable = sqliteTable("books", {
  id: int().primaryKey(),

  title_en: text().notNull(),
  title_ar: text().notNull(),
  asset_hash: text().notNull(),
});

export const chaptersTable = sqliteTable(
  "chapters",
  {
    book_id: int()
      .notNull()
      .references(() => booksTable.id, {
        onDelete: "cascade",
      }),

    chapter_number: int().notNull(),

    title_en: text().notNull(),
    title_ar: text().notNull(),
    content: text().notNull(),

    last_read_at: int(),
  },
  (table) => [
    primaryKey({
      columns: [table.book_id, table.chapter_number],
    }),
  ],
);
