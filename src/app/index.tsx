import { CollectionCard } from "@/components/ui/collectioncard";
import { LibraryItem, getLibraryItems } from "@/db/queries";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export default function Index() {
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);

  useEffect(() => {
    // router.push("/component-preview");
    const data = getLibraryItems();
    setLibraryItems(data);
  }, []);
  return (
    <View className="bg-white flex-1 flex-row flex-wrap gap-2 p-4">
      <FlatList
        data={libraryItems}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        numColumns={2}
        contentContainerClassName="bg-white p-4 gap-2"
        columnWrapperClassName="gap-2"
        renderItem={({ item }) => (
          <CollectionCard id={item.id} type={item.type} title={item.title_en} />
        )}
      />
    </View>
  );
}

// return (
//   <FlatList
//     data={libraryItems}
//     keyExtractor={(item) => `${item.type}-${item.id}`}
//     renderItem={({ item }) => (
//       <ChapterButton
//         title={item.title_en}
//         onPress={() => {
//           if (item.type === "volume") {
//             router.push(`/volume/${item.id}`);
//           } else {
//             router.push(`/book/${item.id}`);
//           }
//         }}
//       />
//     )}
//   />
// );
