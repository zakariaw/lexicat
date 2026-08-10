import { eq } from "drizzle-orm";
import { db } from "./index";
import { chaptersTable, metadataTable } from "./schema";

import asset from "@/assets/json/asset.json";
import book from "@/assets/json/book.json";

/**
 * Insert all chapters from book.json into the database.
 */
export async function insertChapters() {
  for (const chapter of book) {
    await db.insert(chaptersTable).values({
      id: Number(chapter.id),
      title_en: chapter.title_en,
      title_ar: chapter.title_ar,
      content: chapter.content,
    });
  }
}

/**
 * Delete all existing chapters.
 */
export async function deleteChapters() {
  await db.delete(chaptersTable);
}

/**
 * Get the asset hash currently stored in the database.
 */
export async function getStoredAssetHash() {
  const result = await db
    .select()
    .from(metadataTable)
    .where(eq(metadataTable.key, "asset_hash"))
    .limit(1);

  return result[0]?.value;
}

/**
 * Save the current asset hash to the database.
 *
 * If the hash already exists, update it.
 */
export async function saveAssetHash(hash: string) {
  await db
    .insert(metadataTable)
    .values({
      key: "asset_hash",
      value: hash,
    })
    .onConflictDoUpdate({
      target: metadataTable.key,
      set: {
        value: hash,
      },
    });
}

/**
 * Seed the database for the first time.
 */
export async function seedNewDatabase() {
  await insertChapters();
  await saveAssetHash(asset.asset_hash);
}

/**
 * Replace the existing chapters with the new book data.
 *
 * Everything happens inside one transaction.
 */

// TODO : Aysnc fix Sqlite error :
export async function reseedDatabase() {
  db.transaction((tx) => {
    // Delete old chapters
    tx.delete(chaptersTable);

    // Insert new chapters
    for (const chapter of book) {
      tx.insert(chaptersTable).values({
        id: Number(chapter.id),
        title_en: chapter.title_en,
        title_ar: chapter.title_ar,
        content: chapter.content,
      });
    }

    // Update the stored hash
    tx.insert(metadataTable)
      .values({
        key: "asset_hash",
        value: asset.asset_hash,
      })
      .onConflictDoUpdate({
        target: metadataTable.key,
        set: {
          value: asset.asset_hash,
        },
      });
  });
}

/**
 * Check whether the database needs to be seeded or updated.
 */
export async function seedDatabase() {
  const currentAssetHash = asset.asset_hash;
  const storedAssetHash = await getStoredAssetHash();

  // First installation
  if (!storedAssetHash) {
    console.log("No asset hash found. Seeding database...");

    await seedNewDatabase();

    console.log("Database seeded.");
    return;
  }

  // Database is already up to date
  if (storedAssetHash === currentAssetHash) {
    console.log("Asset hash matches. Database is up to date.");
    return;
  }

  // Asset has changed
  console.log("Asset hash changed.");
  console.log("Reseeding database...");

  await reseedDatabase();

  console.log("Database successfully reseeded.");
}
