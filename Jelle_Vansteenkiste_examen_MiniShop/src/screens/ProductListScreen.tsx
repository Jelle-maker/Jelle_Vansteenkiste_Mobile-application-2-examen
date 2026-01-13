import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import ProductCard from '../components/ProductCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/HomeStack';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductList'>;

export default function ProductListScreen({ navigation }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <ActivityIndicator style={{ marginTop: 50 }} />;
  if (isError) return <Text>Error loading products</Text>;
  if (!data.products.length) return <Text>Geen producten</Text>;

  return (
    <FlatList
      data={data.products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() =>
            navigation.navigate('ProductDetail', { id: item.id })
          }
        />
      )}
    />
  );
}
