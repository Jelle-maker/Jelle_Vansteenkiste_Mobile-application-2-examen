import { Text, TouchableOpacity, View } from "react-native";
import { LightTheme } from "../theme/theme";

export default function ProductCard({ item, onPress }: any) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: theme.card,
          padding: 12,
          margin: 8,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: theme.text, fontWeight: "bold" }}>
          {item.title}
        </Text>
        <Text style={{ color: theme.text }}>€ {item.price}</Text>
        <Text style={{ color: theme.text }}>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );
}