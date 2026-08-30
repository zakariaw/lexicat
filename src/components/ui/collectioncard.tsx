import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { BookText, SquareLibrary } from "lucide-react-native";
import { Pressable, View } from "react-native";

type CollectionCardProps = {
  id: number;
  type: "volume" | "book";
  title: string;
};

export function CollectionCard(props: CollectionCardProps) {
  const handlePress = () => {
    if (props.type === "volume") {
      router.push({
        pathname: "/volume/[volumeId]",
        params: { volumeId: String(props.id) },
      });
    } else {
      router.push({
        pathname: "/book/[bookId]",
        params: { bookId: String(props.id) },
      });
    }
  };

  const CardIcon = props.type === "volume" ? SquareLibrary : BookText;
  return (
    <Pressable
      onPress={handlePress}
      className="w-[48%] h-28 rounded-2xl bg-gray-300"
    >
      <View className="h-16 items-center justify-center">
        <Button variant="outline" size="icon">
          <Icon as={CardIcon} />
        </Button>
      </View>

      <View className="h-12 w-full">
        <Text className="text-black text-center text-sm">{props.title}</Text>
      </View>
    </Pressable>
  );
}
