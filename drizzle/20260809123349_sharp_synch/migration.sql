CREATE TABLE `chapters` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`title_en` text NOT NULL,
	`title_ar` text NOT NULL,
	`content` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `metadata` (
	`key` text PRIMARY KEY,
	`value` text NOT NULL
);
