import { getChapter, markChapterAsRead } from "@/db/queries";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function Reader() {
  const { bookId, chapterNumber } = useLocalSearchParams<{
    bookId: string;
    chapterNumber: string;
  }>();

  const [chapter, setChapter] = useState<
    ReturnType<typeof getChapter> | undefined
  >(undefined);

  useEffect(() => {
    if (!bookId || !chapterNumber) return;

    const data = getChapter(Number(bookId), Number(chapterNumber));

    setChapter(data);
    markChapterAsRead(Number(bookId), Number(chapterNumber));
  }, [bookId, chapterNumber]);

  if (!chapter) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Chapter not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerClassName="p-5 pb-10">
        {/* Chapter number */}
        <Text className=" pt-4 text-right text-lg text-black">
          {chapter.content}
        </Text>
      </ScrollView>
    </View>
  );
}
