import { RootState } from "./Index";

export const selectTotalItems = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectSubtotal = (state: RootState) =>
  state.cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );