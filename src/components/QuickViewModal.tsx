import { useState, useEffect } from "react";
import { MessageCircle, ShoppingBag, Plus, Minus, Check, ShieldCheck, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Product } from "@/lib/products-data";
import { useCart, WA_BASE_PHONE } from "@/lib/cart-context";
import { AssetImage } from "@/components/AssetImage";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Reset quantity whenever a new product opens
  useEffect(() => {
    setQuantity(1);
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Jai Fabrication! I am interested in the *${product.name}* (${product.formattedPrice}, Qty: ${quantity}).\n\nCould you please confirm availability and shipping details? Thank you!`
    );
    window.open(`https://wa.me/${WA_BASE_PHONE}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto p-0 sm:rounded-sm border-border bg-background shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.3fr]">
          {/* Left Column: Product Imagery */}
          <div className="relative bg-secondary/50 p-6 sm:p-8 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-border/70">
            <div className="relative w-full max-w-[320px] aspect-[4/5] overflow-hidden rounded-sm shadow-md bg-card">
              <AssetImage
                src={product.asset}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.isBestseller && (
                  <span className="bg-maroon text-ivory text-[0.62rem] uppercase tracking-widest px-2.5 py-1 font-semibold shadow-sm">
                    Bestseller
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-terracotta text-ivory text-[0.62rem] uppercase tracking-widest px-2.5 py-1 font-semibold shadow-sm">
                    New Craft
                  </span>
                )}
              </div>
            </div>

            <p className="mt-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground text-center flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-terracotta" /> 100% Handcrafted in Jaipur
            </p>
          </div>

          {/* Right Column: Product Specs & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <DialogHeader className="p-0 text-left">
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-terracotta font-medium">
                  {product.categoryLabel}
                </p>
                <DialogTitle className="font-serif text-2xl sm:text-3xl text-maroon mt-1 leading-tight">
                  {product.name}
                </DialogTitle>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-2xl font-serif font-bold text-foreground">
                    {product.formattedPrice}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    (Inclusive of all taxes)
                  </span>
                </div>
              </DialogHeader>

              <DialogDescription className="mt-4 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                {product.fullDescription}
              </DialogDescription>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-maroon/20 bg-sandstone/30 px-2.5 py-1 text-[0.62rem] uppercase tracking-wider text-maroon font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Specifications Table */}
              <div className="mt-6 space-y-2 border-t border-border/70 pt-4 text-xs">
                <div className="grid grid-cols-[90px_1fr] gap-2">
                  <span className="text-muted-foreground font-medium">Dimensions:</span>
                  <span className="text-foreground">{product.dimensions}</span>
                </div>
                <div className="grid grid-cols-[90px_1fr] gap-2">
                  <span className="text-muted-foreground font-medium">Material:</span>
                  <span className="text-foreground">{product.material}</span>
                </div>
                <div className="grid grid-cols-[90px_1fr] gap-2">
                  <span className="text-muted-foreground font-medium">Craft:</span>
                  <span className="text-foreground">{product.craft}</span>
                </div>
                <div className="grid grid-cols-[90px_1fr] gap-2">
                  <span className="text-muted-foreground font-medium">Pockets:</span>
                  <span className="text-foreground">{product.pockets}</span>
                </div>
                <div className="grid grid-cols-[90px_1fr] gap-2">
                  <span className="text-muted-foreground font-medium">Care:</span>
                  <span className="text-foreground">{product.washCare}</span>
                </div>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="mt-6 pt-5 border-t border-border/70 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  Quantity:
                </span>
                <div className="flex items-center border border-border rounded-sm bg-background">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-muted-foreground hover:text-maroon transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-semibold text-foreground">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-muted-foreground hover:text-maroon transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <span className="text-xs font-semibold text-terracotta">
                  Total: ₹{(product.price * quantity).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 bg-maroon px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-terracotta font-semibold"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Bag
                </button>
                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="flex items-center justify-center gap-2 border border-maroon px-4 py-3 text-xs uppercase tracking-[0.18em] text-maroon transition-colors hover:bg-maroon hover:text-ivory font-semibold"
                >
                  <MessageCircle className="h-4 w-4" />
                  Enquire on WhatsApp
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[0.65rem] text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-terracotta" /> 100% Pure Cotton
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-terracotta" /> Direct Artisan Price
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
