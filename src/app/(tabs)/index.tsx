import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View className="bg-green-300 flex-1">
      <Pressable
        className="bg-blue-500 h-20 mx-4 my-4"
        onPress={() => router.push("/summary")}
      ></Pressable>
    </View>
  );
}
