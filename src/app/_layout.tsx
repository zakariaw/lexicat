import { initDb } from "@/features/vocab/db/client";
import "@/global.css";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    initDb();
  }, []);

  return (
    <>
      <Stack screenOptions={{}}>
        <Stack.Screen name="(tabs)" options={{ title: "" }} />
        <Stack.Screen name="reader" options={{ title: "Upload" }} />
      </Stack>
      <PortalHost />
    </>
  );
}
