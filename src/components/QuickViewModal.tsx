import { useState, useEffect } from "react";
import { MessageCircle, ShoppingBag, Plus, Minus, Check, ShieldCheck, Sparkles, Tag, TrendingDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Product, BULK_TIERS, calculateTierPrice } from "@/lib/products-data";
import { useCart, WA_BASE_PHONE } from "@/lib/cart-context";
import { AssetImage } from "@/components/AssetImage";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isCustomQty, setIsCustomQty] = useState(false);

  // Reset quantity whenever a new product opens
  useEffect(() => {
    setQuantity(1);
    setIsCustomQty(false);
  }, [product]);

  if (!product) return null;

  const tierDetails = calculateTierPrice(product.price, quantity);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleDirectWhatsApp = () => {
    let text = `Hello Jai Fabrication! I am interested in ordering the *${product.name}*.\n\n`;
    text += `📦 *Quantity:* ${quantity} piece${quantity > 1 ? "s" : ""}\n`;
    text += `💵 *Price:* ₹${tierDetails.unitPrice.toLocaleString("en-IN")}/pc (Total: ₹${tierDetails.totalPrice.toLocaleString("en-IN")})\n`;
    if (tierDetails.discountPercent > 0) {
      text += `✨ *Bulk Discount:* ${tierDetails.discountPercent}% OFF (Saved ₹${tierDetails.savings.toLocaleString("en-IN")})\n`;
    }
    text += `\nCould you please confirm production timeline and shipping? Thank you!`;

    window.open(`https://wa.me/${WA_BASE_PHONE}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto p-0 sm:rounded-sm border-border bg-background shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1.35fr]">
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

          {/* Right Column: Product Specs & Bulk Options */}
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
                    ₹{tierDetails.unitPrice.toLocaleString("en-IN")}/pc
                  </span>
                  {tierDetails.discountPercent > 0 && (
                    <span className="text-sm line-through text-muted-foreground">
                      {product.formattedPrice}
                    </span>
                  )}
                  {tierDetails.discountPercent > 0 && (
                    <span className="rounded-full bg-terracotta/15 px-2 py-0.5 text-xs font-bold text-terracotta">
                      {tierDetails.discountPercent}% Bulk Savings
                    </span>
                  )}
                </div>
              </DialogHeader>

              <DialogDescription className="mt-3 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                {product.fullDescription}
              </DialogDescription>

              {/* Bulk Quantity Tiers Selector */}
              <div className="mt-5 rounded-sm border border-maroon/20 bg-sandstone/25 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[0.68rem] uppercase tracking-[0.18em] text-maroon font-bold flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5 text-terracotta" />
                    Select Quantity / Bulk Tier:
                  </span>
                  {tierDetails.discountPercent > 0 && (
                    <span className="text-[0.68rem] font-bold text-terracotta flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" />
                      Save ₹{tierDetails.savings.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {BULK_TIERS.map((tier) => {
                    const isSelected = quantity === tier.qty && !isCustomQty;
                    return (
                      <button
                        key={tier.qty}
                        type="button"
                        onClick={() => {
                          setQuantity(tier.qty);
                          setIsCustomQty(false);
                        }}
                        className={`p-2 rounded-xs text-center border transition-all ${
                          isSelected
                            ? "bg-maroon text-ivory border-maroon shadow-xs"
                            : "bg-background border-border text-foreground hover:border-maroon/40"
                        }`}
                      >
                        <p className="text-xs font-bold">{tier.qty} pc{tier.qty > 1 ? "s" : ""}</p>
                        <p className={`text-[0.6rem] ${isSelected ? "text-ivory/80" : "text-terracotta font-semibold"}`}>
                          {tier.tag || "Sample"}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Fine-grain Quantity Controls */}
                <div className="mt-3.5 flex items-center justify-between border-t border-maroon/15 pt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">Custom pcs:</span>
                    <div className="flex items-center border border-border rounded-sm bg-background">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="p-1.5 text-muted-foreground hover:text-maroon transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          if (!isNaN(val) && val >= 1) {
                            setQuantity(val);
                            setIsCustomQty(true);
                          }
                        }}
                        className="w-12 text-center text-xs font-bold text-foreground focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="p-1.5 text-muted-foreground hover:text-maroon transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[0.65rem] text-muted-foreground block">Batch Total</span>
                    <span className="text-base font-serif font-bold text-maroon">
                      ₹{tierDetails.totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Specifications Table */}
              <div className="mt-5 space-y-1.5 border-t border-border/70 pt-3.5 text-xs">
                <div className="grid grid-cols-[85px_1fr] gap-2">
                  <span className="text-muted-foreground font-medium">Dimensions:</span>
                  <span className="text-foreground">{product.dimensions}</span>
                </div>
                <div className="grid grid-cols-[85px_1fr] gap-2">
                  <span className="text-muted-foreground font-medium">Material:</span>
                  <span className="text-foreground">{product.material}</span>
                </div>
                <div className="grid grid-cols-[85px_1fr] gap-2">
                  <span className="text-muted-foreground font-medium">Craft:</span>
                  <span className="text-foreground">{product.craft}</span>
                </div>
                <div className="grid grid-cols-[85px_1fr] gap-2">
                  <span className="text-muted-foreground font-medium">Care:</span>
                  <span className="text-foreground">{product.washCare}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-border/70 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 bg-maroon px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-terracotta font-semibold"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add {quantity} pc{quantity > 1 ? "s" : ""} to Bag
                </button>
                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="flex items-center justify-center gap-2 border border-maroon px-4 py-3 text-xs uppercase tracking-[0.18em] text-maroon transition-colors hover:bg-maroon hover:text-ivory font-semibold"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp {quantity >= 10 ? "Bulk Quote" : "Enquiry"}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[0.65rem] text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-terracotta" /> Single or Bulk Batches
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-terracotta" /> Direct Workshop Price
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
