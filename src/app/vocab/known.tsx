import { Text, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

export default function KnownScreen() {
  const renderRightActions = () => {
    return (
      <View className="flex-row items-center">
        <TouchableOpacity className="bg-red-500 justify-center px-6 h-16">
          <Text className="text-white">Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-blue-500 justify-center px-6 h-16">
          <Text className="text-white">Edit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View className="h-16 border-2 flex-row justify-between items-center px-8 bg-white">
        <View>
          <Text>School</Text>
          <Text>x14</Text>
        </View>

        <Text>كتاب</Text>
      </View>
    </Swipeable>
  );
}
