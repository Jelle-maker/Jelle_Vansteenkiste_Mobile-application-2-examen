// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// export default function ProductCard({ product, onPress }: any) {
//   return (
//     <TouchableOpacity style={styles.card} onPress={onPress}>
//       <Text style={styles.title}>{product.title}</Text>
//       <Text>${product.price}</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     padding: 15,
//     margin: 10,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 1 },
//     elevation: 3,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../theme/theme';

interface ProductCardProps {
  product: { title: string; price: number };
  onPress: () => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
  const { colors } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={onPress}
    >
      <Text style={[styles.title, { color: colors.text }]}>{product.title}</Text>
      <Text style={{ color: colors.muted }}>€ {product.price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
