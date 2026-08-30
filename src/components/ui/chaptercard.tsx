import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { BookOpenText } from "lucide-react-native";
import { Pressable, View } from "react-native";

type ChapterCardProps = {
  bookId: number;
  chapterNumber: number;
  title_en: string;
  title_ar: string;
};
export default function ChapterCard({
  bookId,
  chapterNumber,
  title_en,
  title_ar,
}: ChapterCardProps) {
  return (
    <Pressable
      onPress={() => router.push(`/reader/${bookId}/${chapterNumber}`)}
      className="bg-gray-200 h-16 rounded-2xl flex-row items-center gap-4 px-4"
    >
      <Button variant="outline" size="icon">
        <Icon as={BookOpenText} />
      </Button>
      <View className="flex-col">
        <Text className="text-black">{title_en}</Text>
        <Text className="text-black">{title_ar}</Text>
      </View>
    </Pressable>
  );
}
