import { useState } from "react";
import { MessageCircle, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-context";
import { PRODUCTS_DATA } from "@/lib/products-data";
import { AssetImage } from "@/components/AssetImage";

export function CartDrawer() {
  const {
    items,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    addToCart,
    generateWhatsAppOrderUrl,
  } = useCart();

  const [customNote, setCustomNote] = useState("");

  const handleWhatsAppCheckout = () => {
    const url = generateWhatsAppOrderUrl(customNote);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col bg-background p-0 sm:max-w-md border-l border-border/80 shadow-2xl"
      >
        {/* Header */}
        <SheetHeader className="border-b border-border/70 p-5 sm:p-6 bg-sandstone/30">
          <div className="flex items-center justify-between pr-6">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-maroon text-ivory">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <SheetTitle className="font-serif text-2xl text-maroon">
                Your Enquiry Bag
              </SheetTitle>
            </div>
            {totalItems > 0 && (
              <span className="rounded-full bg-terracotta/15 px-2.5 py-0.5 text-xs font-semibold text-terracotta">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <SheetDescription className="text-xs text-muted-foreground">
            Review your selected handmade pieces and send an instant order enquiry to our Jaipur workshop.
          </SheetDescription>
        </SheetHeader>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-secondary/80 text-muted-foreground/60 mb-4">
                <ShoppingBag className="h-8 w-8 stroke-[1.5]" />
              </div>
              <p className="font-serif text-xl text-maroon">Your bag is empty</p>
              <p className="mt-1.5 max-w-xs text-xs text-muted-foreground leading-relaxed">
                Explore our curated hand-block printed cotton bags and pouches to begin your enquiry.
              </p>

              {/* Quick suggestions */}
              <div className="mt-8 w-full text-left">
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-terracotta font-semibold flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> Popular Creations
                </p>
                <div className="mt-3 space-y-2.5">
                  {PRODUCTS_DATA.filter((p) => p.isBestseller).slice(0, 3).map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between gap-3 rounded-sm border border-border/70 bg-card p-2.5 transition-colors hover:border-terracotta/40"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-sm bg-secondary">
                          <AssetImage
                            src={product.asset}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-foreground">
                            {product.name}
                          </p>
                          <p className="text-[0.7rem] text-terracotta font-semibold">
                            {product.formattedPrice}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => addToCart(product, 1)}
                        className="shrink-0 bg-maroon px-3 py-1.5 text-[0.65rem] uppercase tracking-wider text-ivory transition-colors hover:bg-terracotta"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <ul className="divide-y divide-border/60">
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex gap-3.5">
                      {/* Product Thumbnail */}
                      <div className="h-20 w-16 shrink-0 overflow-hidden rounded-sm bg-secondary border border-border/60">
                        <AssetImage
                          src={product.asset}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif text-base text-maroon leading-tight">
                              {product.name}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeFromCart(product.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors p-1"
                              aria-label={`Remove ${product.name} from bag`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-[0.68rem] text-muted-foreground mt-0.5">
                            {product.categoryLabel} · 100% Cotton
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-border/80 rounded-sm bg-background">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="p-1.5 text-muted-foreground hover:text-maroon transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-semibold text-foreground">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="p-1.5 text-muted-foreground hover:text-maroon transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Line Price */}
                          <p className="text-sm font-medium text-foreground">
                            ₹{(product.price * quantity).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Special Note */}
              <div className="pt-2">
                <label
                  htmlFor="custom-note"
                  className="block text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground font-medium mb-1.5"
                >
                  Custom Notes / Delivery Timeline (Optional)
                </label>
                <textarea
                  id="custom-note"
                  rows={2}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g. Wedding date, monogram requirements, gift packaging..."
                  className="w-full resize-none border border-border/80 bg-secondary/30 p-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-terracotta focus:outline-none"
                />
              </div>

              {/* Trust Badge */}
              <div className="rounded-sm border border-maroon/15 bg-sandstone/25 p-3 text-[0.72rem] text-muted-foreground leading-relaxed">
                <span className="font-semibold text-maroon block">✨ Jaipur Workshop Direct:</span>
                Hand-printed to order. We accept UPI / Bank Transfer and ship across India &amp; Worldwide.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border/80 bg-sandstone/20 p-5 sm:p-6 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Total Items</span>
                <span>{totalItems} pcs</span>
              </div>
              <div className="flex items-center justify-between text-base font-serif text-maroon pt-1 border-t border-border/60">
                <span className="font-semibold">Estimated Total</span>
                <span className="text-xl font-bold">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-[0.65rem] text-muted-foreground">
                *Final shipping fee calculated on WhatsApp based on pincode / destination.
              </p>
            </div>

            <button
              type="button"
              onClick={handleWhatsAppCheckout}
              className="w-full flex items-center justify-center gap-2.5 bg-maroon px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ivory shadow-lg transition-all hover:bg-terracotta active:scale-[0.99]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Send Order Enquiry on WhatsApp</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
