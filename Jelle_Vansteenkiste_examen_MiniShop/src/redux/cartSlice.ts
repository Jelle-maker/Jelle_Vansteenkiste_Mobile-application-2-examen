import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) item.quantity++;
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    increment(state, action: PayloadAction<number>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity++;
    },
    decrement(state, action: PayloadAction<number>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
});

export const { addToCart, increment, decrement, removeItem } =
  cartSlice.actions;

export default cartSlice.reducer;