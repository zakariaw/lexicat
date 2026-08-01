import { View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

type IconSquareProps = {
  icon: keyof typeof Ionicons.glyphMap;
  size?: number;
};

export function IconSquare({
  icon,

  size = 36,
}: IconSquareProps) {
  return (
    <View className="w-20 h-20 rounded-2xl border-2 bg-gray-300 justify-center items-center">
      <Ionicons name={icon} size={size} color="black" />
    </View>
  );
}
