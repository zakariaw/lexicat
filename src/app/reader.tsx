import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReaderScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      className="bg-green-500"
      edges={["bottom"]}
    >
      <View className="flex-1 bg-green-500"></View>

      <View className="border-t bg-white p-4"></View>
    </SafeAreaView>
  );
}
