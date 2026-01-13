import { View, Text, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { selectSubtotal, selectTotalItems } from '../redux/cartSlice';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const total = useSelector(selectTotalItems);
  const subtotal = useSelector(selectSubtotal);
  const navigation = useNavigation<any>();

  return (
    <View style={{ padding: 16 }}>
      <Text>Profile: Jelle Vansteenkiste</Text>
      <Text>Items in cart: {total}</Text>
      <Text>Subtotal: €{subtotal}</Text>
      <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
}