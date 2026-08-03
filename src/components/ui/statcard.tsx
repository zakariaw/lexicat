import { Text, View } from "react-native";

type StatCardProps = {
  value: string | number;
  label: string;
  className?: string;
};

export default function StatCard({
  value,
  label,
  className = "",
}: StatCardProps) {
  return (
    <View
      className={`w-28 h-20 bg-amber-600 rounded-2xl justify-center items-center ${className}`}
    >
      <Text className="text-white font-bold">{value}</Text>
      <Text className="text-white text-xs">{label}</Text>
    </View>
  );
}
