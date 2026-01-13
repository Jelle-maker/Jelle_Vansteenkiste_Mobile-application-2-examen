// import { View, Text, FlatList, ActivityIndicator } from 'react-native';
// import { useQuery } from '@tanstack/react-query';
// import { fetchProducts } from '../api/products';
// import ProductCard from '../components/ProductCard';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { HomeStackParamList } from '../navigation/HomeStack';
// import { useContext } from 'react';
// import { ThemeContext } from '../theme/theme';

// type Props = NativeStackScreenProps<HomeStackParamList, 'ProductList'>;

// export default function ProductListScreen({ navigation }: Props) {
//   const { colors } = useContext(ThemeContext);

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['products'],
//     queryFn: fetchProducts,
//   });

//   if (isLoading) {
//     return (
//       <View style={{ marginTop: 50 }}>
//         <ActivityIndicator />
//       </View>
//     );
//   }

//   if (isError) {
//     return <Text style={{ color: colors.text }}>Error loading products</Text>;
//   }

//   if (!data.products.length) {
//     return <Text style={{ color: colors.muted }}>Geen producten</Text>;
//   }

//   return (
//     <View style={{ flex: 1, backgroundColor: colors.background }}>
//       <FlatList
//         data={data.products}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <ProductCard
//             product={item}
//             onPress={() =>
//               navigation.navigate('ProductDetail', { id: item.id })
//             }
//           />
//         )}
//       />
//     </View>
//   );
// }

import { View, Text, FlatList, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import ProductCard from '../components/ProductCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/HomeStack';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../theme/theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductList'>;

export default function ProductListScreen({ navigation }: Props) {
  const { colors } = useContext(ThemeContext);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (data?.products) {
        const filtered = data.products.filter((p: any) =>
          p.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProducts(filtered);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, data]);

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Error loading products</Text>
      </View>
    );
  }

  if (!data?.products.length) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.muted }}>Geen producten</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholder="Search products..."
        placeholderTextColor={colors.muted}
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredProducts.length > 0 || search ? filteredProducts : data.products}
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
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  input: {
    padding: 12,
    margin: 10,
    borderRadius: 10,
    fontSize: 16,
  },
});