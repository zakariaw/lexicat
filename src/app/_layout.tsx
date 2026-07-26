import { initDb } from "@/database/client";
import { getAllDocuments, runMigration } from "@/database/migration";
import "@/global.css";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    initDb();
    runMigration();
    const documents = getAllDocuments();
    console.log("Documents in database:", documents);
  }, []);

  return (
    <>
      <Stack screenOptions={{}}>
        <Stack.Screen name="(tabs)" options={{ title: "" }} />
        <Stack.Screen name="summary" options={{ title: "Vocab Summary" }} />
        <Stack.Screen name="reader" options={{ title: "Reader" }} />
      </Stack>
      <PortalHost />
    </>
  );
}
