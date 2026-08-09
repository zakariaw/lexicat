import { initializeDatabase } from "@/db/init";
import "@/global.css";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    initializeDatabase().catch((error) => {
      console.error("Database initialization failed:", error);
    });
  }, []);
  return <Stack />;
}
