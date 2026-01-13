import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/types/HomeStackParamList';
import { View, Button } from 'react-native';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductList'>;

export default function ProductListScreen({ navigation }: Props) {
  return (
    <View>
      <Button
        title="Ga naar product"
        onPress={() =>
          navigation.navigate('ProductDetail', { productId: '123' })
        }
      />
    </View>
  );
}