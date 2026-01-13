import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../theme/theme';

export default function ProductCard({ product, onPress }: any) {
  const { colors } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        {product.title}
      </Text>
      <Text style={{ color: colors.muted }}>
        € {product.price}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});