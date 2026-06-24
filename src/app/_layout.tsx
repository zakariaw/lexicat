import { initDb } from "@/features/vocab/db/client";
import { useVocabStore } from "@/features/vocab/db/store";
import "@/global.css";
import { Ionicons } from "@expo/vector-icons";
import { PortalHost } from "@rn-primitives/portal";
import { Tabs } from "expo-router";
import { useEffect } from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const { addWord, load } = useVocabStore();

  useEffect(() => {
    initDb();
    const words = load();

    console.log(words);
  }, []);
  return (
    <GestureHandlerRootView>
      <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="vocab"
          options={{
            title: "Vocab",
            tabBarIcon: ({ color }) => (
              <Ionicons name="book" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={20} color={color} />
            ),
          }}
        />
      </Tabs>
      <PortalHost />
    </GestureHandlerRootView>
  );
}
