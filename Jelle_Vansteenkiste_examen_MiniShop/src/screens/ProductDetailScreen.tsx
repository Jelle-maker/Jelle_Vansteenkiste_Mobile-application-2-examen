import { View, Text, Button, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchProductByID } from '../api/products';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/HomeStack';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen({ route }: Props) {
  const { id } = route.params;
  const dispatch = useDispatch();

  const { data, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductByID(id),
  });

  if (isLoading) return <ActivityIndicator />;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22 }}>{data.title}</Text>
      <Text>{data.description}</Text>
      <Text>€ {data.price}</Text>

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
    </View>
  );
}
