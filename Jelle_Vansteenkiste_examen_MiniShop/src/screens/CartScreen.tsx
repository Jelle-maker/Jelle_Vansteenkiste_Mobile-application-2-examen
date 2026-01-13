import { View, Text, Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, remove, selectSubtotal, selectTotalItems, } from '../redux/cartSlice';

export default function CartScreen() {
  const items = useSelector((state: any) => state.cart.items);
  const total = useSelector(selectTotalItems);
  const subtotal = useSelector(selectSubtotal);
  const dispatch = useDispatch();

  if (!items.length) return <Text>🛒 Cart is empty</Text>;

  return (
    <View style={{ padding: 16 }}>
      <Text>{total} items</Text>
      <Text>Subtotal: €{subtotal}</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.quantity} x €{item.price}</Text>
            <Button title="+" onPress={() => dispatch(increment(item.id))} />
            <Button title="-" onPress={() => dispatch(decrement(item.id))} />
            <Button title="Remove" onPress={() => dispatch(remove(item.id))} />
          </View>
        )}
      />
    </View>
  );
}