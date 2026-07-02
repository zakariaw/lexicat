import { VocabCard } from "@/components/ui/vocabcard";
import { View } from "react-native";

export default function KnownScreen() {
  return (
    <View className="flex-1 flex-col">
      <VocabCard
        title="School"
        count="14x"
        arabicText="هاريس"
        pressed={false}
        onPressedChange={(value) => console.log(value)}
      />
    </View>
  );
}
