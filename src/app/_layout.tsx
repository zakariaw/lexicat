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
  return <Stack />;
}
