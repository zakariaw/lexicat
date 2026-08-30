import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { BookText } from "lucide-react-native";
import { Pressable, View } from "react-native";

type BookCardProps = {
  id: number;
  title_en: string;
  title_ar: string;
};

export default function BookCard({ id, title_en, title_ar }: BookCardProps) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/book/[bookId]",
          params: {
            bookId: String(id),
          },
        })
      }
      className="bg-gray-200 h-16 rounded-2xl flex-row items-center gap-4 px-4"
    >
      <Button variant="outline" size="icon">
        <Icon as={BookText} />
      </Button>

      <View className="flex-col">
        <Text className="text-black">{title_en}</Text>
        <Text className="text-black">{title_ar}</Text>
      </View>
    </Pressable>
  );
}
