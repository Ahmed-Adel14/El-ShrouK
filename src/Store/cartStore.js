import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
    persist(
        (set) => ({
            cartItems: [],

            // تحديث كمية المنتج
            updateQuantity: (id, quantity) =>
                set((state) => ({
                    cartItems: state.cartItems.map((item) => (item.id === id ? { ...item, quantity: quantity < 1 ? 1 : quantity } : item)),
                })),

            // إضافة منتج للسلة
            addToCart: (product) =>
                set((state) => {
                    const exists = state.cartItems.find((item) => item.id === product.id);
                    if (exists) {
                        return {
                            cartItems: state.cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
                        };
                    }
                    return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
                }),

            // إزالة منتج من السلة
            removeFromCart: (id) =>
                set((state) => ({
                    cartItems: state.cartItems.filter((item) => item.id !== id),
                })),

            // مسح كل السلة
            clearCart: () => set({ cartItems: [] }),
        }),
        {
            name: "cart-storage", // اسم المفتاح في localStorage
        },
    ),
);
