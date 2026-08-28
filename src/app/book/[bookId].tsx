import ChapterButton from "@/components/ui/chapterbutton";
import { getChapters } from "@/db/queries";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export default function BookList() {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();

  const [chapters, setChapters] = useState<ReturnType<typeof getChapters>>([]);

  useEffect(() => {
    if (!bookId) return;

    const data = getChapters(Number(bookId));

    setChapters(data);
  }, [bookId]);

  return (
    <View className="flex-1 bg-white">
      ß
      <FlatList
        data={chapters}
        keyExtractor={(item) => `${item.book_id}-${item.chapter_number}`}
        numColumns={2}
        contentContainerClassName="p-4 gap-2"
        columnWrapperClassName="gap-2"
        renderItem={({ item }) => (
          <ChapterButton
            id={0}
            title_en={item.title_en}
            title_ar={item.title_ar}
          />
        )}
      />
    </View>
  );
}
