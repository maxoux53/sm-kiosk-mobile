import { useCallback, forwardRef, useState, RefObject, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { ProductDetails } from '../types/items';
import { useCart } from '../contexts/CartContext';
import { styles } from '../styles';

export const ProductBottomSheet = forwardRef<BottomSheetModal, { product: ProductDetails | null }>(({ product }, ref) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(
    () => { setQuantity(1); },
    [product]
  );

  const handleAddToCart = () => {
      if (quantity < 1) {
        Alert.alert('Quantité invalide', 'La quantité doit être égale ou supérieure à 1.');
      } else {
        addToCart(product!.id, quantity);
        (ref as RefObject<BottomSheetModal>)?.current?.dismiss();
        setQuantity(1);
      }
  };

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  if (!product) { // temporaire
    return null;
  }

  return (
      <BottomSheetModal
        ref={ref}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.bottomSheetContentContainer}>
          <Image source={{ uri: product.picture }} style={styles.productImage} />
          
          <Text style={styles.productName}>{product.label}</Text>
          
          <View style={styles.bottomSheetFooter}>
            <Text style={styles.productPrice}>{(Number(product.excl_vat_price) * (1 + product.category.vat.rate / 100) * quantity).toFixed(2)}€</Text>
            
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => setQuantity(quantity - 1)}>
                    <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                    <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                <Text style={styles.addButtonText}>Ajouter</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
  );
});

