import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center gap-4">
      <View className="w-20 h-20 rounded-2xl border-2 bg-gray-300 justify-center items-center">
        <Ionicons name="book-outline" size={36} color="black" />
      </View>
      <Text className="font-bold text-base ">No reading yet</Text>
      <Text className="text-center text-base">
        Paste Arabic text or upload a file to start{"\n"} your first session.
      </Text>
      <Button className="bg-white w-72">
        <Ionicons name="add" size={24} color="black" />
        <Text className="text-black">Start your first reading</Text>
      </Button>
    </View>
  );
}
