import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VocabCard } from "@/components/ui/vocabcard";
import { ChevronRight } from "lucide-react-native";
import { View } from "react-native";

export default function UnknownScreen() {
  return (
    <View style={{ flex: 1 }} className="flex-col">
      <View className="flex-row  items-center bg-amber-100 px-4 gap-2 py-2">
        <Input
          className="flex-4"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
          placeholder="Email"
        />
        <Button className="flex-1" variant="outline" size="icon">
          <Icon as={ChevronRight} />
        </Button>
      </View>
      <View className="flex-row items-center  bg-green-100 px-4">
        <Text>Tap ✓ to mark as known</Text>
      </View>
      <View style={{ flex: 1 }} className="bg-pink-200">
        <VocabCard
          title="School"
          count="14x"
          arabicText="هاريس"
          pressed={false}
          onPressedChange={(value) => console.log(value)}
        />
      </View>
    </View>
  );
}
