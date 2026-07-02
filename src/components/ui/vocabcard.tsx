import { Toggle, ToggleIcon } from "@/components/ui/toggle";
import { Bold } from "lucide-react-native";
import { Text, View } from "react-native";

type VocabCardProps = {
  title: string;
  count: string | number;
  arabicText: string;
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
};

export function VocabCard({
  title,
  count,
  arabicText,
  pressed,
  onPressedChange,
}: VocabCardProps) {
  return (
    <View className="h-18 bg-red-200 flex-row items-center justify-between px-4">
      <View className="flex-col">
        <Text>{title}</Text>
        <Text>{count}</Text>
      </View>

      <View className="flex-row items-center gap-2">
        <Text>{arabicText}</Text>

        <Toggle pressed={pressed} onPressedChange={onPressedChange}>
          <ToggleIcon as={Bold} />
        </Toggle>
      </View>
    </View>
  );
}
