import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "expo-router/js-top-tabs";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

export default function TopTabsLayout() {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarActiveTintColor: "#111111",
        tabBarIndicatorStyle: { backgroundColor: "#10B981", height: 3 },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
          textTransform: "capitalize",
        },
      }}
    >
      <MaterialTopTabs.Screen name="unknown" options={{ title: "Unknown" }} />
      <MaterialTopTabs.Screen name="known" options={{ title: "Known" }} />
    </MaterialTopTabs>
  );
}
