import { Text } from "@/components/ui/text";
import { TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

interface VocabCardProps {
  english: string;
  arabic: string;
  count: number;
  onDelete?: () => void;
  onEdit?: () => void;
}

export function VocabCard({
  english,
  arabic,
  count,
  onDelete,
  onEdit,
}: VocabCardProps) {
  const renderRightActions = () => (
    <View className="flex-row">
      <TouchableOpacity
        onPress={onDelete}
        className="bg-red-500 justify-center px-6"
      >
        <Text className="text-white">Delete</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onEdit}
        className="bg-blue-500 justify-center px-6"
      >
        <Text className="text-white">Edit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View className="h-16 border-2 flex-row justify-between items-center px-8 bg-white">
        <View>
          <Text>{english}</Text>
          <Text>x{count}</Text>
        </View>

        <Text>{arabic}</Text>
      </View>
    </Swipeable>
  );
}
