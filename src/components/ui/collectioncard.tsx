import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Pressable } from "react-native";

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

  return (
    <Pressable
      className="bg-gray-300 h-28 rounded-2xl items-center justify-center w-[48%] p-3"
      onPress={handlePress}
    >
      <Button variant="outline" size="icon">
        <Icon as={ChevronRight} />
      </Button>

      <Text className="text-black text-center">{props.title}</Text>
    </Pressable>
  );
}
