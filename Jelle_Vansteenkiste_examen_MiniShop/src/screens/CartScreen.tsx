import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  increment,
  decrement,
  remove,
  selectSubtotal,
  selectTotalItems,
} from '../redux/cartSlice';
import { useContext } from 'react';
import { ThemeContext } from '../theme/theme';

export default function CartScreen() {
  const { colors } = useContext(ThemeContext);

  const items = useSelector((state: any) => state.cart.items);
  const total = useSelector(selectTotalItems);
  const subtotal = useSelector(selectSubtotal);
  const dispatch = useDispatch();

  if (!items.length) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.muted }}>🛒 Cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {total} items
      </Text>
      <Text style={{ color: colors.muted }}>
        Subtotal: €{subtotal}
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={{ color: colors.text }}>{item.title}</Text>
            <Text style={{ color: colors.muted }}>
              {item.quantity} × €{item.price}
            </Text>

            <View style={styles.row}>
              <Button title="+" onPress={() => dispatch(increment(item.id))} />
              <Button title="-" onPress={() => dispatch(decrement(item.id))} />
              <Button
                title="Remove"
                onPress={() => dispatch(remove(item.id))}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  card: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
