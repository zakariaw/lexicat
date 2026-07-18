import { Button } from "@/components/ui/button";
import { IconSquare } from "@/components/ui/iconsquare";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center gap-4">
      <IconSquare icon="book-outline" />
      <Text className="font-bold text-base ">No reading yet</Text>
      <Text className="text-center text-base">
        Paste Arabic text or upload a file to start{"\n"} your first session.
      </Text>
      <Button className="bg-white w-72" onPress={() => router.push("/upload")}>
        <Ionicons name="add" size={24} color="black" />
        <Text className="text-black">Start your first reading</Text>
      </Button>
    </View>
  );
}
