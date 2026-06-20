import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

type ConIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
};

export default function IconBox({
  name,
  size = 48,
  color = "black",
}: ConIconProps) {
  const iconSize = size * 0.5;

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size * 0.25,
          borderColor: color,
        },
      ]}
    >
      <Ionicons name={name} size={iconSize} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
  },
});
