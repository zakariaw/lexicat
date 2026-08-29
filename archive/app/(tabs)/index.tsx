import ChapterButton from "@/components/ui/chaptercard";
import { FlatList, View } from "react-native";

export default function Index() {
  const chapter = [
    {
      id: 1,
      title_en: "Ibrahim Story",
      title_ar: "قصة إبراهيم",
      last_read_at: "2023-06-01T10:30:00",
    },
    {
      id: 2,
      title_en: "Adam Story",
      title_ar: "قصة آدم",
      last_read_at: "2023-06-02T11:45:00",
    },
    {
      id: 3,
      title_en: "Yusuf Story",
      title_ar: "قصة يوسف",
      last_read_at: "2023-06-03T09:15:00",
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
