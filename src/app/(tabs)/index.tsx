import { FlatList, Pressable, View } from "react-native";

export default function Index() {
  const documents = [
    { id: 1, title: "Arabic Lesson 1" },
    { id: 2, title: "Arabic Lesson 2" },
    { id: 3, title: "Arabic Lesson 3" },
  ];

  return (
    <View className="bg-green-300 flex-1">
      <FlatList
        data={documents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable className="bg-blue-500 m-2 p-5"></Pressable>
        )}
      />
    </View>
  );
}
