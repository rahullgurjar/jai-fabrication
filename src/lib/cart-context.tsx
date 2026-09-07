import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { Product, calculateTierPrice } from "./products-data";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalSavings: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  generateWhatsAppOrderUrl: (customNote?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "jai_fabrication_bag_v2";
export const WA_BASE_PHONE = "919521922366";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore storage errors
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch {
        // ignore
      }
    }
  }, [items, isLoaded]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    const tier = calculateTierPrice(product.price, quantity);
    const discountText = tier.discountPercent > 0 ? ` (${tier.discountPercent}% bulk discount applied)` : "";

    toast.success(`Added ${quantity} pc${quantity > 1 ? "s" : ""} of "${product.name}"${discountText}`, {
      action: {
        label: "View Bag",
        onClick: () => setIsCartOpen(true),
      },
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      if (item) {
        toast.info(`Removed "${item.product.name}" from Bag`);
      }
      return prev.filter((i) => i.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate total price and savings with bulk tier discounts
  const totalPrice = items.reduce((sum, item) => {
    const tier = calculateTierPrice(item.product.price, item.quantity);
    return sum + tier.totalPrice;
  }, 0);

  const totalSavings = items.reduce((sum, item) => {
    const tier = calculateTierPrice(item.product.price, item.quantity);
    return sum + tier.savings;
  }, 0);

  const generateWhatsAppOrderUrl = (customNote?: string) => {
    if (items.length === 0) {
      return `https://wa.me/${WA_BASE_PHONE}?text=${encodeURIComponent(
        "Hello Jai Fabrication! I would like to enquire about your handmade block-print bags."
      )}`;
    }

    const lines: string[] = [
      "🌸 *NAMASTE JAI FABRICATION*",
      "I would like to enquire about ordering the following handmade cotton bags:",
      "",
    ];

    items.forEach((item, index) => {
      const tier = calculateTierPrice(item.product.price, item.quantity);
      let line = `${index + 1}. *${item.product.name}*` +
        `\n   • Quantity: ${item.quantity} pc${item.quantity > 1 ? "s" : ""}` +
        `\n   • Unit Rate: ₹${tier.unitPrice.toLocaleString("en-IN")}/pc (Total: ₹${tier.totalPrice.toLocaleString("en-IN")})`;
      if (tier.discountPercent > 0) {
        line += `\n   • Bulk Discount: ${tier.discountPercent}% OFF (Saved ₹${tier.savings.toLocaleString("en-IN")})`;
      }
      lines.push(line);
    });

    lines.push("");
    lines.push(`🛍️ *Estimated Order Total:* ₹${totalPrice.toLocaleString("en-IN")} (${totalItems} items total)`);
    if (totalSavings > 0) {
      lines.push(`✨ *Total Bulk Savings:* ₹${totalSavings.toLocaleString("en-IN")}`);
    }
    lines.push("📍 Delivery Location: Jaipur / Pan-India / International");
    
    if (customNote && customNote.trim()) {
      lines.push(`📝 *Note/Customization:* ${customNote.trim()}`);
    }

    lines.push("");
    lines.push("Please confirm production availability, dispatched timeline, and payment details. Thank you!");

    const message = lines.join("\n");
    return `https://wa.me/${WA_BASE_PHONE}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        totalSavings,
        isCartOpen,
        setIsCartOpen,
        generateWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
