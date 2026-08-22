import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

/**
 * Volumes
 *
 * A volume contains one or more books.
 *
 * The volume owns the asset_hash for the entire volume.
 */
export const volumesTable = sqliteTable("volumes", {
  id: integer("id").primaryKey(),

  title_en: text("title_en").notNull(),
  title_ar: text("title_ar").notNull(),

  asset_hash: text("asset_hash").notNull(),
});

/**
 * Books
 *
 * A book can either:
 *
 * 1. Belong to a volume
 *    volume_id = volume ID
 *    asset_hash = null
 *
 * 2. Be a standalone book
 *    volume_id = null
 *    asset_hash = its own asset hash
 */
export const booksTable = sqliteTable("books", {
  id: integer("id").primaryKey(),

  volume_id: integer("volume_id").references(() => volumesTable.id, {
    onDelete: "set null",
  }),

  title_en: text("title_en").notNull(),
  title_ar: text("title_ar").notNull(),

  /**
   * Only used for standalone books.
   *
   * Books belonging to a volume use the volume's asset_hash.
   */
  asset_hash: text("asset_hash"),
});

/**
 * Chapters
 *
 * A chapter is uniquely identified by:
 *
 *   book_id + chapter_number
 *
 * Example:
 *
 *   (1, 1) = Book 1, Chapter 1
 *   (1, 2) = Book 1, Chapter 2
 *   (2, 1) = Book 2, Chapter 1
 */
export const chaptersTable = sqliteTable(
  "chapters",
  {
    book_id: integer("book_id")
      .notNull()
      .references(() => booksTable.id, {
        onDelete: "cascade",
      }),

    chapter_number: integer("chapter_number").notNull(),

    title_en: text("title_en").notNull(),
    title_ar: text("title_ar").notNull(),

    content: text("content").notNull(),

    /**
     * Unix timestamp.
     *
     * null = chapter has never been read.
     */
    last_read_at: integer("last_read_at"),
  },
  (table) => [
    primaryKey({
      columns: [table.book_id, table.chapter_number],
    }),
  ],
);
