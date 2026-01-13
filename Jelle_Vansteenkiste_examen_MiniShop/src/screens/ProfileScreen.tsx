import { View, Text, Switch, StyleSheet, Button} from 'react-native';
import { selectSubtotal, selectTotalItems } from '../redux/cartSlice';
import { useContext } from 'react';
import { ThemeContext } from '../theme/theme';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { isDark, toggle, colors } = useContext(ThemeContext);
  const total = useSelector(selectTotalItems);
  const subtotal = useSelector(selectSubtotal);
  const navigation = useNavigation<any>();


  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      <Text style={[styles.title, { color: colors.text }]}>
        Profile: Jelle Vansteenkiste
      </Text>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.text }]}>
          Items in cart: {total}
        </Text>
      </View>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.text }]}>
          Subtotal: €{subtotal}
        </Text>
      </View>

      <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')}/>
        
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.text }]}>
          Dark mode
        </Text>

        <Switch
          value={isDark}
          onValueChange={toggle}
          trackColor={{ false: '#ccc', true: '#4f46e5' }}
          thumbColor={isDark ? '#ffffff' : '#f4f3f4'}
        />
      </View>

    </View>
  );
}

/* =======================
   STYLES
======================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
});