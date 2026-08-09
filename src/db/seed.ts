import { eq } from "drizzle-orm";
import { db } from "./index";
import { chaptersTable, metadataTable } from "./schema";

import asset from "@/assets/json/asset.json";
import book from "@/assets/json/book.json";

export async function seedChapters() {
  for (const chapter of book) {
    await db.insert(chaptersTable).values({
      id: Number(chapter.id),
      title_en: chapter.title_en,
      title_ar: chapter.title_ar,
      content: chapter.content,
    });
  }
}

export async function seedMetadata() {
  await db
    .insert(metadataTable)
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
}

export async function seedDatabase() {
  const assetHash = asset.asset_hash;

  // 1. Check if metadata exists
  const existingMetadata = await db
    .select()
    .from(metadataTable)
    .where(eq(metadataTable.key, "asset_hash"))
    .limit(1);

  const existingHash = existingMetadata[0]?.value;

  // 2. No metadata exists
  if (!existingHash) {
    console.log("No asset hash found. Seeding database...");

    await seedChapters();
    await seedMetadata();

    console.log("Database seeded.");
    return;
  }

  // 3. Hash matches
  if (existingHash === assetHash) {
    console.log("Asset hash matches. Database is up to date.");
    return;
  }

  // 4. Hash is different
  console.log("Asset hash changed.");
  console.log("Destroying existing chapter data and reseeding...");

  await db.transaction(async (tx) => {
    // Delete old chapters
    await tx.delete(chaptersTable);

    // Insert new chapters
    for (const chapter of book) {
      await tx.insert(chaptersTable).values({
        id: Number(chapter.id),
        title_en: chapter.title_en,
        title_ar: chapter.title_ar,
        content: chapter.content,
      });
    }

    // Update metadata
    await tx
      .insert(metadataTable)
      .values({
        key: "asset_hash",
        value: assetHash,
      })
      .onConflictDoUpdate({
        target: metadataTable.key,
        set: {
          value: assetHash,
        },
      });
  });

  console.log("Database successfully reseeded.");
}
