import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) item.quantity += 1;
      else state.items.push(action.payload);
    },
    increment(state, action: PayloadAction<number>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity++;
    },
    decrement(state, action: PayloadAction<number>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
    },
    remove(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
});

export const {
  addToCart,
  increment,
  decrement,
  remove,
} = cartSlice.actions;

export const selectTotalItems = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectSubtotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export default cartSlice.reducer;