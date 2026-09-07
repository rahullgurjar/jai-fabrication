import { useState, useEffect } from "react";
import {
  MessageCircle,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Sparkles,
  Tag,
  TrendingDown,
  Star,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Product, BULK_TIERS, calculateTierPrice } from "@/lib/products-data";
import { getProductReviewsAndQA } from "@/lib/product-reviews";
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
  const [activeTab, setActiveTab] = useState<"tiers" | "reviews" | "qa">("tiers");

  // Reset state whenever a new product opens
  useEffect(() => {
    setQuantity(1);
    setIsCustomQty(false);
    setActiveTab("tiers");
  }, [product]);

  if (!product) return null;

  const tierDetails = calculateTierPrice(product.price, quantity);
  const reviewData = getProductReviewsAndQA(product.id);

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
      <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto p-0 sm:rounded-sm border-border bg-background shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1.35fr]">
          {/* Left Column: Product Imagery & Rating Summary */}
          <div className="relative bg-secondary/50 p-6 sm:p-8 flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-border/70">
            <div className="w-full flex flex-col items-center">
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

              {/* Star Rating Badge */}
              <div className="mt-4 flex items-center gap-2 bg-background/90 px-3.5 py-1.5 rounded-full border border-border/70 shadow-xs">
                <div className="flex items-center text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="text-xs font-bold text-foreground">
                  {reviewData.rating}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({reviewData.reviewCount} customer reviews)
                </span>
              </div>
            </div>

            <p className="mt-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground text-center flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-terracotta" /> 100% Handcrafted in Jaipur
            </p>
          </div>

          {/* Right Column: Tabbed Interface */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Product Header */}
              <DialogHeader className="p-0 text-left">
                <div className="flex items-center justify-between">
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-terracotta font-medium">
                    {product.categoryLabel}
                  </p>
                  <span className="text-xs text-muted-foreground font-medium">
                    SKU: JF-{product.id.slice(0, 6).toUpperCase()}
                  </span>
                </div>
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

              {/* Navigation Tabs */}
              <div className="mt-5 flex border-b border-border/80 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab("tiers")}
                  className={`pb-2.5 px-3 font-semibold uppercase tracking-wider border-b-2 transition-all ${
                    activeTab === "tiers"
                      ? "border-maroon text-maroon"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Specs &amp; Bulk Tiers
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-2.5 px-3 font-semibold uppercase tracking-wider border-b-2 transition-all ${
                    activeTab === "reviews"
                      ? "border-maroon text-maroon"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Reviews ({reviewData.reviewCount})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("qa")}
                  className={`pb-2.5 px-3 font-semibold uppercase tracking-wider border-b-2 transition-all ${
                    activeTab === "qa"
                      ? "border-maroon text-maroon"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Customer Q&amp;A ({reviewData.qa.length})
                </button>
              </div>

              {/* TAB 1: Specs & Bulk Tiers */}
              {activeTab === "tiers" && (
                <div className="mt-4 space-y-4">
                  <DialogDescription className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                    {product.fullDescription}
                  </DialogDescription>

                  {/* Bulk Quantity Tiers Selector */}
                  <div className="rounded-sm border border-maroon/20 bg-sandstone/25 p-4">
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
                  <div className="space-y-1.5 border-t border-border/70 pt-3 text-xs">
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
              )}

              {/* TAB 2: Real Customer Reviews (10+ reviews) */}
              {activeTab === "reviews" && (
                <div className="mt-4 space-y-3 max-h-[360px] overflow-y-auto pr-1">
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <div>
                      <p className="font-serif text-lg font-bold text-maroon">
                        Customer Feedback
                      </p>
                      <p className="text-[0.68rem] text-muted-foreground">
                        {reviewData.reviewCount} verified ratings from wedding planners, boutiques, &amp; travelers.
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold font-serif text-foreground">
                        {reviewData.rating}
                      </span>
                      <span className="text-xs text-muted-foreground"> / 5.0</span>
                    </div>
                  </div>

                  {reviewData.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="rounded-sm border border-border/70 bg-secondary/20 p-3 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{rev.author}</span>
                          <span className="text-[0.62rem] text-muted-foreground">({rev.location})</span>
                        </div>
                        <span className="text-[0.6rem] text-muted-foreground">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current" />
                        ))}
                        {rev.verifiedPurchase && (
                          <span className="ml-2 inline-flex items-center gap-0.5 text-[0.6rem] font-semibold text-emerald-700">
                            <CheckCircle2 className="h-2.5 w-2.5" /> Verified Purchase
                          </span>
                        )}
                      </div>

                      <p className="text-foreground/85 leading-relaxed italic">
                        "{rev.comment}"
                      </p>

                      {rev.tag && (
                        <span className="inline-block rounded-xs bg-sandstone/40 border border-maroon/15 px-2 py-0.5 text-[0.58rem] text-maroon font-medium">
                          {rev.tag}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: Customer Q&A */}
              {activeTab === "qa" && (
                <div className="mt-4 space-y-3.5 max-h-[360px] overflow-y-auto pr-1">
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <div>
                      <p className="font-serif text-lg font-bold text-maroon">
                        Frequently Asked Questions
                      </p>
                      <p className="text-[0.68rem] text-muted-foreground">
                        Direct answers from our Jaipur workshop artisans.
                      </p>
                    </div>
                    <a
                      href={`https://wa.me/${WA_BASE_PHONE}?text=${encodeURIComponent(
                        `Hello Jai Fabrication, I have a question about the ${product.name}: `
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-xs bg-maroon px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-ivory hover:bg-terracotta"
                    >
                      <MessageSquare className="h-3 w-3" />
                      Ask Question
                    </a>
                  </div>

                  {reviewData.qa.map((qaItem) => (
                    <div
                      key={qaItem.id}
                      className="rounded-sm border border-border/70 bg-secondary/20 p-3 text-xs space-y-2"
                    >
                      <div className="flex items-start gap-2">
                        <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-maroon/15 text-maroon text-[0.6rem] font-bold mt-0.5">
                          Q
                        </span>
                        <div>
                          <p className="font-semibold text-foreground leading-snug">
                            {qaItem.question}
                          </p>
                          <p className="text-[0.6rem] text-muted-foreground mt-0.5">
                            Asked by {qaItem.askedBy}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 bg-background/80 p-2.5 rounded-xs border border-border/60">
                        <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-700/15 text-emerald-800 text-[0.6rem] font-bold mt-0.5">
                          A
                        </span>
                        <div>
                          <p className="text-foreground/90 leading-relaxed">
                            {qaItem.answer}
                          </p>
                          <p className="text-[0.6rem] text-terracotta font-semibold mt-1">
                            — {qaItem.answeredBy}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
