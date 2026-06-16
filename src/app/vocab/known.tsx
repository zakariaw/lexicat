import { Button, Column, Host, Text } from "@expo/ui";

export default function KnownScreen() {
  return (
    <Host style={{ flex: 1 }}>
      <Column spacing={12} alignment="center">
        <Text>Hello, world!</Text>
        <Button label="Press me" onPress={() => alert("Pressed")} />
      </Column>
    </Host>
  );
}
