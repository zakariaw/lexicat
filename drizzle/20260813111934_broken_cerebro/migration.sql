CREATE TABLE `books` (
	`id` integer PRIMARY KEY,
	`title_en` text NOT NULL,
	`title_ar` text NOT NULL,
	`asset_hash` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `chapters` (
	`book_id` integer NOT NULL,
	`chapter_number` integer NOT NULL,
	`title_en` text NOT NULL,
	`title_ar` text NOT NULL,
	`content` text NOT NULL,
	`last_read_at` integer,
	CONSTRAINT `chapters_pk` PRIMARY KEY(`book_id`, `chapter_number`),
	CONSTRAINT `fk_chapters_book_id_books_id_fk` FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON DELETE CASCADE
);
