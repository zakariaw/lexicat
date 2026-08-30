import { initializeDatabase } from "@/db/init";
import "@/global.css";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function setup() {
      await initializeDatabase();
      setReady(true);
    }

    setup();
  }, []);

  if (!ready) {
    return null;
  }
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="book/[bookId]"
        options={{
          title: "Chapters",
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="volume/[volumeId]"
        options={{
          title: "Books",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="reader/[bookId]/[chapterNumber]"
        options={{
          title: "Reader",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
