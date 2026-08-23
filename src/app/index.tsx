import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { ChevronRight } from "lucide-react-native";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="bg-white flex-1 flex-row flex-wrap gap-2 p-4">
      <View className="bg-gray-300 h-28 rounded-2xl items-center gap-2 justify-center w-[48%]">
        <Button variant="outline" size="icon">
          <Icon as={ChevronRight} />
        </Button>
        <Text className="text-black">Chapter 1</Text>

        <Text className="text-black">Chapter 1</Text>
      </View>
    </View>
  );
}

// export default function Index() {
// const [chapters, setChapters] = useState<Chapter[]>([]);
// useEffect(() => {
//   async function loadChapters() {
//     const data = await getChapters();
//     setChapters(data);
//   }
//   loadChapters();
// }, []);
// return (
//   <View className="bg-black flex-1">
//     <FlatList
//       data={chapters}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={({ item }) => (
//         <ChapterButton
//           id={item.id}
//           title_en={item.title_en}
//           title_ar={item.title_ar}
//         />
//       )}
//     />
//   </View>
// );
// }

// const libraryItems = getLibraryItems();

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
