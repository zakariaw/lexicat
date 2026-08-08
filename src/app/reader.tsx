import { Text } from "@/components/ui/text";
import { View } from "react-native";

export default function Reader() {
  const Chapter = {
    id: "1",
    title_en: "The hearsayer.",
    title_ar: "بائع الأصنام",
    content:
      "قبْلَ أَيّام كَثيرَةِ. كَثيرَة جِداً.\nكانَ في قَريَةِ رَجلٌ مَشْهُور جِداً\nوَكَانَ اسم هَذَا الرجل آزَرَ.\nوَكَانَ آزَرُ يَبِيْعُ اْلأصنَامَ.\nوَكَانَ فِي هذِه الْقَرْيَةِ بيتٌ كَبيرٌ جدّاً.\nوَكَانَ في هذَا البيتَ أَصنام، أَصنَام كًثِيرَةٌ!جداً.\nوَكانَ الناسُ  يَسْجُدُونَ لِهذِه الأَصْنَامِ.\nوَكَانَ آزَرُ يَسْجُدُ لِهذِهِ الأَصْنَامَ.\nوَكَانَ آزَرُ يعبدُ هذِهِ الأَصنَام.",
  };

  return (
    <View>
      <Text className="text-black text-right text-base/18 p-4">
        {Chapter.content}
      </Text>
    </View>
  );
}
