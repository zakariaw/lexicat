import { Text } from "@/components/ui/text";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center gap-2">
      <View className="w-24 h-24 rounded-2xl border-2 bg-primary"></View>
      <Text>
        Default: <Text variant="code">text-foreground</Text>
      </Text>
      <Text>
        Default: <Text variant="code">text-foreground</Text>
      </Text>
    </View>
  );
}
