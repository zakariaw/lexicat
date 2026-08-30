import ChapterCard from "@/components/ui/chaptercard";
import { CollectionCard } from "@/components/ui/collectioncard";
import { Text } from "@/components/ui/text";
import { LibraryItem, getLibraryItems, getRecentChapters } from "@/db/queries";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

// TODO: Make Most Recent Instant with Zustand

export default function Index() {
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
  const [recentChapters, setRecentChapters] = useState<
    ReturnType<typeof getRecentChapters>
  >([]);
  useEffect(() => {
    // router.push("/component-preview");
    const library = getLibraryItems();
    const recent = getRecentChapters();
    setLibraryItems(library);
    setRecentChapters(recent);
  }, []);
  return (
    <View className="bg-white flex-1 p-4">
      <Text className="text-black text-lg font-bold pb-4">Recent Chapter</Text>
      <FlatList
        data={libraryItems}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        numColumns={2}
        columnWrapperClassName="gap-2"
        ListHeaderComponentClassName="gap-4"
        ListHeaderComponent={
          <>
            {recentChapters.map((item) => (
              <ChapterCard
                key={`${item.book_id}-${item.chapter_number}`}
                bookId={item.book_id}
                chapterNumber={item.chapter_number}
                title_en={item.title_en}
                title_ar={item.title_ar}
              />
            ))}

            <Text className="text-black text-lg font-bold pb-4 pt-4">
              Collection
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <CollectionCard id={item.id} type={item.type} title={item.title_en} />
        )}
      />
    </View>
  );
}
