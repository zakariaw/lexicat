import ChapterButton from "@/components/ui/chapterbutton";
import { FlatList, View } from "react-native";

export default function Index() {
  const chapter = [
    {
      id: 1,
      title_en: "Ibrahim Story",
      title_ar: "قصة إبراهيم",
    },
    {
      id: 2,
      title_en: "Adam Story",
      title_ar: "قصة آدم",
    },
    {
      id: 3,
      title_en: "Yusuf Story",
      title_ar: "قصة يوسف",
    },
  ];

  return (
    <View className="bg-black flex-1">
      <FlatList
        data={chapter}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ChapterButton title_en={item.title_en} title_ar={item.title_ar} />
        )}
      />
    </View>
  );
}
