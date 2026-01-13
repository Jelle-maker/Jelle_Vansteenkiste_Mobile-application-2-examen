import { View,Text,Button,ActivityIndicator,StyleSheet,FlatList,TextInput,} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchProductByID, fetchProducts } from '../api/products';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/HomeStack';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../theme/theme';
import ProductCard from '../components/ProductCard';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const { colors } = useContext(ThemeContext);

  const { data, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductByID(id),
  });

  const { data: allProducts } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const [search, setSearch] = useState('');
  const [related, setRelated] = useState<any[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (allProducts?.products) {
        const filtered = allProducts.products.filter(
          (p: any) =>
            p.id !== id && p.title.toLowerCase().includes(search.toLowerCase())
        );
        setRelated(filtered);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, allProducts, id]);

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{data.title}</Text>
      <Text style={{ color: colors.muted, marginVertical: 8 }}>
        {data.description}
      </Text>
      <Text style={[styles.price, { color: colors.text }]}>€ {data.price}</Text>

      <Button
        title="Add to cart"
        onPress={() =>
          dispatch(
            addToCart({
              id: data.id,
              title: data.title,
              price: data.price,
              quantity: 1,
            })
          )
        }
      />
      
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholder="Search related products..."
        placeholderTextColor={colors.muted}
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={related}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.push('ProductDetail', { id: item.id })
            }
          />
        )}
        ListEmptyComponent={() =>
          search ? (
            <Text style={{ color: colors.muted, marginTop: 10 }}>
              No related products found
            </Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold' },
  price: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  input: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 12,
    fontSize: 16,
  },
});