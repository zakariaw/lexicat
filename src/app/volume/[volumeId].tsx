import BookCard from "@/components/ui/bookcard";
import { getBooksByVolume } from "@/db/queries";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export default function BookList() {
  const { volumeId } = useLocalSearchParams<{ volumeId: string }>();

  const [books, setBooks] = useState<ReturnType<typeof getBooksByVolume>>([]);

  useEffect(() => {
    if (!volumeId) return;

    const data = getBooksByVolume(Number(volumeId));

    setBooks(data);
  }, [volumeId]);

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={books}
        keyExtractor={(item) => String(item.id)}
        contentContainerClassName="p-4 gap-2"
        renderItem={({ item }) => (
          <BookCard
            id={item.id}
            title_en={item.title_en}
            title_ar={item.title_ar}
          />
        )}
      />
    </View>
  );
}
