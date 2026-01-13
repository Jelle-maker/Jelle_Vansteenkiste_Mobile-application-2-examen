export const fetchProducts = async () => {
  const res = await fetch("https://dummyjson.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const fetchProduct = async (id: number) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};