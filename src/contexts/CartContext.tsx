import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product, ProductDetails } from '../types/items';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from '../api/connect';
import { Alert } from 'react-native';

export interface CartItem {
  product_id: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  totalExclTax: () => Promise<number>;
  totalTax: () => Promise<number>;
  totalInclTax: () => Promise<number>;
  count: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      const cart = await AsyncStorage.getItem('cart');
      const itemList: CartItem[] = cart ? JSON.parse(cart) : [];
      setItems(itemList);
    };
    fetchCart();
  }, [])

  const addToCart = async (productId: number, quantity: number) => {
    const newItems = [...items];
    const product = newItems.find((item => item.product_id === productId));
    if (product) {
      product.quantity += quantity;
    } else {
      newItems.push({product_id :productId, quantity});
    }
    setItems(newItems);
    await AsyncStorage.setItem('cart', JSON.stringify(newItems));
  };

  const removeFromCart = async (productId: number) => {
    const newItems = items.filter(item => item.product_id !== productId);
    setItems(newItems);
    await AsyncStorage.setItem('cart', JSON.stringify(newItems));
  };

  const clearCart = async () => {
    setItems([]);
    await AsyncStorage.removeItem('cart');
  };

  const getProductPriceExclTax = async (productId: number) => {
    try {
      const product: Product = await connect(`/interact/product/${productId}`, "GET");
      return product.excl_vat_price;
    } catch (e) {
      Alert.alert(
        "Erreur",
        `Une erreur est survenue : ${e}`,
        [
            { text: "Ok" }
        ]
      );
      return 0;
    }
  }

  const totalExclTax = async () => {
    let total = 0;

    for (const item of items) {
      total += await getProductPriceExclTax(item.product_id) * item.quantity;
    }

    return total;
  }

  const getProductTaxRate = async (productId: number) => {
    try {
      const product: ProductDetails = await connect(`/interact/product/${productId}`, "GET");
      return product.category.vat.rate;
    } catch (e) {
      Alert.alert(
        "Erreur",
        `Une erreur est survenue : ${e}`,
        [
            { text: "Ok" }
        ]
      );
      return 0;
    }
  }

  const totalTax = async () => {
    let total = 0;

    for (const item of items) {
      total += await getProductPriceExclTax(item.product_id) * (await getProductTaxRate(item.product_id) / 100) * item.quantity;
    }

    return total;
  }

  const totalInclTax = async () => {
    let total = 0;

    for (const item of items) {
      total += (await getProductPriceExclTax(item.product_id) * (1 + (await getProductTaxRate(item.product_id) / 100))) * item.quantity;
    }

    return total;
  }

  const count = () => {
    return items.length;
  }

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalExclTax, totalTax, totalInclTax, count }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart ne fonctionne que dans un CartProvider');
  }

  return context;
};
