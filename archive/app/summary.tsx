import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import StatCard from "@/components/ui/statcard";

import { Text } from "@/components/ui/text";
import { VocabCard } from "@/components/ui/vocabcard";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SummaryScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      className="bg-green-200"
      edges={["bottom"]}
    >
      <View style={{ flex: 1 }} className="bg-green-200">
        <View className="flex-row justify-between px-2 py-4 bg-amber-200">
          <StatCard value={124} label="Unique Words" />
          <StatCard value={56} label="New Words" />
          <StatCard value={12} label="Reviewed" />
        </View>
        <View className="bg-green-200 flex-row items-center justify-between">
          <Text className="">Est. comprehension</Text>
          <Progress value={33} className="w-1/2" />
          <Text className="">33%</Text>
        </View>

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
      <View className="border-t items-center">
        <Button
          className="bg-white w-72"
          onPress={() => router.replace("/reader")}
        >
          <Ionicons name="add" size={24} color="black" />
          <Text className="text-black">Start your first reading</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
