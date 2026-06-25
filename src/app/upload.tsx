import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
export default function UploadScreen() {
  return (
    <View className="flex-1 px-4">
      <View className="flex-14 pt-8 gap-4">
        <Text>Arabic Text</Text>
        <Textarea
          placeholder="Type your message here."
          className="max-w-md h-92"
        ></Textarea>
      </View>
      <View className="flex-2">
        <Button className="bg-white max-w h-12">
          <Ionicons name="add" size={24} color="black" />
          <Text className="text-black ">Start your first reading</Text>
        </Button>
      </View>
    </View>
  );
}

// <View>
//   <View>
//     <Text></Text>
//     <Textarea
//       placeholder="Type your message here."
//       className="max-w-md"
//     ></Textarea>
//   </View>
//   <View>
//     <Button className="bg-white w-72">
//       <Ionicons name="add" size={24} color="black" />
//       <Text className="text-black">Start your first reading</Text>
//     </Button>
//   </View>
// </View>
