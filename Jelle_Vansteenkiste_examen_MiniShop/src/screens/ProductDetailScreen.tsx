import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/types/HomeStackParamList';
import { Text, View } from 'react-native';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen({ route }: Props) {
  const { productId } = route.params;

  return (
    <View>
      <Text>Product ID: {productId}</Text>
    </View>
  );
}