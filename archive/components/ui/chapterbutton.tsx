import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { ChevronRight } from "lucide-react-native";
import { Pressable, View } from "react-native";

type ChapterButtonProps = {
  title_en: string;
  title_ar: string;
};

export default function ChapterButton(props: ChapterButtonProps) {
  return (
    <Pressable className="bg-gray-200 mt-4 mx-4 h-16 rounded-2xl flex-row items-center gap-4 px-4">
      <Button variant="outline" size="icon">
        <Icon as={ChevronRight} />
      </Button>
      <View className="flex-col">
        <Text className="text-black">{props.title_en}</Text>
        <Text className="text-black">{props.title_ar}</Text>
      </View>
    </Pressable>
  );
}
