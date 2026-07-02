import "@/global.css";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";

export default function RootLayout() {
  // useEffect(() => {
  //   initDb();
  // }, []);

  return (
    <>
      <Stack screenOptions={{}}>
        <Stack.Screen name="(tabs)" options={{ title: "" }} />
        <Stack.Screen name="upload" options={{ title: "Upload" }} />
      </Stack>
      <PortalHost />
    </>
  );
}
