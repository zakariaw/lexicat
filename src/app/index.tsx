import ChapterButton from "@/components/ui/chapterbutton";
import { getChapters } from "@/db/queries";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import { chaptersTable } from "@/db/schema";
import type { InferSelectModel } from "drizzle-orm";

type Chapter = InferSelectModel<typeof chaptersTable>;

export default function Index() {
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    async function loadChapters() {
      const data = await getChapters();
      setChapters(data);
    }

    loadChapters();
  }, []);

  return (
    <View className="bg-black flex-1">
      <FlatList
        data={chapters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ChapterButton
            id={item.id}
            title_en={item.title_en}
            title_ar={item.title_ar}
          />
        )}
      />
    </View>
  );
}
