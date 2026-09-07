import { useState, useRef, useEffect, useMemo } from "react";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ExternalLink,
  ChevronRight,
  ShoppingBag,
  Eye,
  CheckCircle2,
  RefreshCw,
  HelpCircle,
  Percent,
  Truck,
  HeartHandshake,
} from "lucide-react";
import { useCart, WA_BASE_PHONE } from "@/lib/cart-context";
import { PRODUCTS_DATA, Product, calculateTierPrice } from "@/lib/products-data";
import { AssetImage } from "@/components/AssetImage";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  whatsappCta?: string;
  recommendedProducts?: Product[];
  suggestedPrompts?: string[];
  calculatedQuote?: {
    qty: number;
    productName: string;
    unitPrice: number;
    discountPercent: number;
    totalPrice: number;
    savings: number;
  };
}

const INITIAL_SUGGESTIONS = [
  "📦 Bulk discounts for 25 / 50 / 100 pcs?",
  "💍 Wedding favours & couple monograms?",
  "🧳 Best travel duffle bags?",
  "🚚 Pan-India & International shipping?",
  "🧼 How to wash 100% cotton block prints?",
  "💻 MacBook & laptop sleeve sizes?",
];

// Smart AI Knowledge & Response Engine
function processSmartQuery(userText: string): {
  reply: string;
  whatsappText?: string;
  recommendedProducts?: Product[];
  suggestedPrompts?: string[];
  calculatedQuote?: {
    qty: number;
    productName: string;
    unitPrice: number;
    discountPercent: number;
    totalPrice: number;
    savings: number;
  };
} {
  const query = userText.toLowerCase().trim();

  // 1. Detect if user is asking for a specific quantity quotation (e.g. "quote for 50 duffles", "40 pieces", "100 bags")
  const qtyMatch = query.match(/\b(\d{1,4})\s*(pcs|pieces|bags|items|nos|units|piece|bag)?\b/i);
  const matchedQty = qtyMatch ? parseInt(qtyMatch[1], 10) : null;

  // 2. Product Category Specific Intent: Duffles
  if (query.includes("duffle") || query.includes("travel") || query.includes("holdall") || query.includes("weekend")) {
    const duffles = PRODUCTS_DATA.filter((p) => p.category === "duffles");
    const sampleProduct = duffles[0];
    let quoteInfo = undefined;

    if (matchedQty && matchedQty > 1) {
      const tier = calculateTierPrice(sampleProduct.price, matchedQty);
      quoteInfo = {
        qty: matchedQty,
        productName: sampleProduct.name,
        unitPrice: tier.unitPrice,
        discountPercent: tier.discountPercent,
        totalPrice: tier.totalPrice,
        savings: tier.savings,
      };
    }

    return {
      reply: matchedQty && matchedQty > 1
        ? `🧳 For **${matchedQty} pieces** of our handcrafted Duffle Bags, you qualify for **${calculateTierPrice(sampleProduct.price, matchedQty).discountPercent}% Bulk Discount**!\n\n• Base Sample Price: ₹${sampleProduct.price.toLocaleString("en-IN")}/pc\n• Bulk Discounted Price: ₹${calculateTierPrice(sampleProduct.price, matchedQty).unitPrice.toLocaleString("en-IN")}/pc\n• Total Bulk Estimate: ₹${calculateTierPrice(sampleProduct.price, matchedQty).totalPrice.toLocaleString("en-IN")} (Total Savings: ₹${calculateTierPrice(sampleProduct.price, matchedQty).savings.toLocaleString("en-IN")})\n\nOur duffles feature 100% cotton canvas, diamond quilting, heavy-duty antique brass zippers, and luggage trolley sleeves!`
        : `🧳 Our handcrafted **Jaipur Weekend Duffle Bags** are made from 100% pure cotton canvas with dense diamond quilting, antique brass hardware, water-resistant interior lining, and dual side pockets.\n\nThey are airline cabin-friendly and ideal for 2–4 day weekend trips, gym gear, or destination wedding welcome hampers!`,
      recommendedProducts: duffles.slice(0, 3),
      whatsappText: `Hello Jai Fabrication, I would like to enquire about ordering ${matchedQty ? `${matchedQty} pcs of ` : ""}handcrafted Duffle Bags.`,
      suggestedPrompts: [
        "📦 Bulk discount for 50 duffles?",
        "🧼 How to wash cotton duffles?",
        "✈️ Are duffles cabin luggage size?",
      ],
      calculatedQuote: quoteInfo,
    };
  }

  // 3. Product Category Specific Intent: Vanity & Pouches
  if (query.includes("vanity") || query.includes("pouch") || query.includes("cosmetic") || query.includes("makeup") || query.includes("box")) {
    const pouches = PRODUCTS_DATA.filter((p) => p.category === "pouches");
    const sampleProduct = pouches[0];
    let quoteInfo = undefined;

    if (matchedQty && matchedQty > 1) {
      const tier = calculateTierPrice(sampleProduct.price, matchedQty);
      quoteInfo = {
        qty: matchedQty,
        productName: sampleProduct.name,
        unitPrice: tier.unitPrice,
        discountPercent: tier.discountPercent,
        totalPrice: tier.totalPrice,
        savings: tier.savings,
      };
    }

    return {
      reply: matchedQty && matchedQty > 1
        ? `💄 For **${matchedQty} pieces** of our Quilted Vanity Pouches / Boxes, your bulk rate includes **${calculateTierPrice(sampleProduct.price, matchedQty).discountPercent}% OFF**!\n\n• Unit Rate: ₹${calculateTierPrice(sampleProduct.price, matchedQty).unitPrice.toLocaleString("en-IN")}/pc (Sample ₹${sampleProduct.price})\n• Total Batch Cost: ₹${calculateTierPrice(sampleProduct.price, matchedQty).totalPrice.toLocaleString("en-IN")}\n\nThese make our #1 top-selling favour for Mehendi, Bridesmaid boxes, and baby shower hampers!`
        : `💄 Our **Quilted Vanity Boxes & Pouches** (from ₹649) feature structured high-loft quilting, wipeable interior linings, inner brush sleeves, and top carry handles.\n\nThey keep all toiletries, makeup, and jewelry organized without spilling and fit comfortably inside luggage or handbags!`,
      recommendedProducts: pouches.slice(0, 3),
      whatsappText: `Hello Jai Fabrication, I would like to enquire about ${matchedQty ? `${matchedQty} pcs of ` : ""}Quilted Vanity Boxes & Pouches.`,
      suggestedPrompts: [
        "💍 Custom wedding gift sets?",
        "🧼 Are vanity linings waterproof?",
        "📦 Bulk rates for 100 vanity boxes?",
      ],
      calculatedQuote: quoteInfo,
    };
  }

  // 4. Product Category: Laptop Sleeves / Tech
  if (query.includes("laptop") || query.includes("sleeve") || query.includes("macbook") || query.includes("ipad") || query.includes("tech")) {
    const tech = PRODUCTS_DATA.filter((p) => p.category === "tech");
    return {
      reply: `💻 Our **Pink Blossom Ruffled Quilted Laptop Sleeve** (₹1,099) is designed for modern creators:\n\n• Universal Fit: Fits 13" to 14.2" laptops including MacBook Air M1/M2/M3 & MacBook Pro 14"\n• 360° Protection: 6mm shock-absorbing cotton batting padding\n• Signature Style: Delicate pleated ruffle trim and matching scrunchie handle\n• Custom Sizing: For 15.6" or 16" laptops, custom tailor orders are crafted in 3–5 days on WhatsApp!`,
      recommendedProducts: tech,
      whatsappText: "Hello Jai Fabrication, I would like to order a handmade Quilted Laptop Sleeve.",
      suggestedPrompts: [
        "💼 Can you make 15.6 inch size?",
        "🧼 Is the laptop sleeve padded?",
        "📦 Bulk gifting for corporate events?",
      ],
    };
  }

  // 5. Product Category: Yoga Mat Bags
  if (query.includes("yoga") || query.includes("mat") || query.includes("fitness") || query.includes("pilates") || query.includes("retreat")) {
    const yoga = PRODUCTS_DATA.filter((p) => p.category === "yoga");
    return {
      reply: `🧘 Our **Hand-Block Yoga Mat Carriers** (₹999) are crafted for daily yoga practice and wellness retreats:\n\n• Universal Length: 28" length × 7" diameter (fits all standard & 6mm extra-thick mats)\n• Adjustable Crossbody Strap: 100% woven cotton stripe webbing\n• Sturdy YKK Zip: Full-length cylindrical zipper for easy loading\n• Breathable 100% Cotton: Natural fabric prevents sweat odor buildup!`,
      recommendedProducts: yoga,
      whatsappText: "Hello Jai Fabrication, I would like to enquire about your Hand-Block Yoga Mat Bags.",
      suggestedPrompts: [
        "📦 Bulk orders for yoga studios?",
        "🚚 Worldwide shipping time?",
        "🧼 How to wash yoga mat bags?",
      ],
    };
  }

  // 6. Bulk Discounts, Wholesale & Quantity Calculators
  if (
    query.includes("bulk") ||
    query.includes("wholesale") ||
    query.includes("discount") ||
    query.includes("quantity") ||
    query.includes("moq") ||
    query.includes("kitna discount") ||
    query.includes("rate")
  ) {
    if (matchedQty && matchedQty >= 10) {
      const samplePrice = 1000;
      const calc = calculateTierPrice(samplePrice, matchedQty);
      return {
        reply: `📊 **Live Bulk Discount Breakdown for ${matchedQty} Pieces**:\n\n• Your Tier: **${calc.discountPercent}% OFF Wholesale Discount**\n• Single Sample Rate: Base price (0% off)\n• 10–24 pcs: 5% OFF\n• 25–49 pcs: 10% OFF\n• 50–99 pcs: 15% OFF\n• 100+ pcs: 20% Wholesale OFF\n\nProduction lead time starts from **3 to 7 working days**. We can customize prints, sizes, and monogram tags for your batch!`,
        whatsappText: `Hello Jai Fabrication, I would like a formal invoice quote for ${matchedQty} pcs bulk order.`,
        suggestedPrompts: [
          "💍 Wedding favour customization?",
          "🚚 Shipping timeline for bulk orders?",
          "📍 Workshop address in Jaipur?",
        ],
      };
    }

    return {
      reply: `📦 **Jai Fabrication Direct Workshop Bulk Pricing Tiers**:\n\n• **10 pcs**: 5% OFF (Trial / boutique batch)\n• **25 pcs**: 10% OFF (Most popular for destination weddings)\n• **50 pcs**: 15% OFF (Corporate events & retreats)\n• **100+ pcs**: 20% Wholesale OFF (Export & retail)\n\nWe provide free custom branding tags on 50+ pcs orders. Ready stock dispatches in 24–48 hours; custom print batches take 3–10 days.`,
      whatsappText: "Hello Jai Fabrication, please share your bulk wholesale price sheet and catalog.",
      suggestedPrompts: [
        "📦 Quote for 50 pieces?",
        "📦 Quote for 100 pieces?",
        "💍 Custom wedding monograms?",
      ],
    };
  }

  // 7. Wedding Favours, Mehendi, Monograms, Gifting
  if (
    query.includes("wedding") ||
    query.includes("favour") ||
    query.includes("favor") ||
    query.includes("mehendi") ||
    query.includes("sangeet") ||
    query.includes("shaadi") ||
    query.includes("monogram") ||
    query.includes("bride") ||
    query.includes("bridesmaid") ||
    query.includes("gifting")
  ) {
    const gifting = PRODUCTS_DATA.filter((p) => p.category === "gifting" || p.category === "pouches");
    return {
      reply: `🌸 **Bespoke Wedding & Mehendi Favours**:\n\nWe have supplied hand-block bags for over 250+ destination weddings in Udaipur, Jaipur, Goa, Dubai, and the USA!\n\n**Customization Options**:\n1. Custom wooden block carving with couple initials or wedding logo\n2. Personalized cotton tags with gold foil or calligraphy print\n3. Colour coordination with your wedding theme (Pastel Pink, Sage Green, Indigo, Rust)\n4. Gift hamper ready with cotton drawstrings & ribbons\n\n**Lead Time**: 3 to 10 days depending on order size. Minimum 25 pcs for custom monogram tags.`,
      recommendedProducts: gifting.slice(0, 3),
      whatsappText: "Hello Jai Fabrication, I am planning wedding favours and would like to discuss custom prints, monograms & bulk pricing.",
      suggestedPrompts: [
        "📦 Bulk discount for 50 favours?",
        "🎨 How to match wedding color theme?",
        "🚚 Express delivery timeline?",
      ],
    };
  }

  // 8. Shipping, Delivery Timelines & Countries
  if (
    query.includes("shipping") ||
    query.includes("delivery") ||
    query.includes("courier") ||
    query.includes("track") ||
    query.includes("usa") ||
    query.includes("uk") ||
    query.includes("international") ||
    query.includes("express") ||
    query.includes("charges") ||
    query.includes("kab milega")
  ) {
    return {
      reply: `✈️ **Shipping & Dispatch Guidelines**:\n\n🇮🇳 **Pan-India**: 2 to 5 business days via BlueDart, Delhivery & DTDC Express. Free shipping on orders above ₹1,999.\n\n🌍 **Worldwide International**: 5 to 8 business days via DHL Express & FedEx (USA, UK, Canada, Australia, UAE, France, Germany, Singapore).\n\n• Ready stock orders dispatch within 24–48 hours.\n• Live tracking links are shared immediately upon dispatch.\n• Message us on WhatsApp with your destination PIN / Postal Code for exact courier rates!`,
      whatsappText: "Hello Jai Fabrication, please check delivery charges and transit time to my pincode/country.",
      suggestedPrompts: [
        "📦 Bulk international shipping?",
        "💳 Payment options available?",
        "📍 Visit workshop in Jaipur?",
      ],
    };
  }

  // 9. Wash Care & Fabric Durability
  if (
    query.includes("wash") ||
    query.includes("care") ||
    query.includes("clean") ||
    query.includes("color fast") ||
    query.includes("bleeding") ||
    query.includes("shrink") ||
    query.includes("cotton")
  ) {
    return {
      reply: `🌿 **100% Pure Cotton Fabric & Wash Care Guide**:\n\n• **Fabric**: 100% natural cotton canvas and voile dyed with skin-friendly, azo-free pigments.\n• **Washing**: Hand wash gently in cold water with mild liquid detergent (or gentle machine cycle in a mesh wash bag).\n• **Drying**: Air dry flat in shade. Avoid direct harsh sunlight for prolonged hours.\n• **Ironing**: Warm iron on cotton setting.\n• **Linings**: Quilted vanity pouches feature water-resistant inner linings that can be wiped clean with a damp cloth!`,
      whatsappText: "Hello Jai Fabrication, I have a question regarding fabric care and durability.",
      suggestedPrompts: [
        "🧳 Best travel duffle bags?",
        "💄 Vanity pouch inner linings?",
        "📦 Direct bulk pricing?",
      ],
    };
  }

  // 10. Craft Process: Bagru vs Sanganeri vs Block Printing
  if (
    query.includes("craft") ||
    query.includes("sanganeri") ||
    query.includes("bagru") ||
    query.includes("block print") ||
    query.includes("artisan") ||
    query.includes("handmade") ||
    query.includes("process")
  ) {
    return {
      reply: `🎨 **The Heritage Craft of Jai Fabrication**:\n\n• **Teakwood Carving**: Seasoned desert Sheesham teakwood is hand-chiseled with floral and geometric jali patterns.\n• **Sanganeri Printing**: Characterized by crisp, delicate floral butis on white/pastel cotton grounds.\n• **Bagru & Dabu**: Traditional mud-resist techniques with indigo and harda natural vegetable dyes.\n• **Diamond Quilting**: Hand-guided quilting with pure cotton wadding that gives our bags their luxurious, pillowy texture.\n\nEvery print variation is the signature mark of an authentic human artisan!`,
      whatsappText: "Hello Jai Fabrication, I would like to know more about your hand block printing craft.",
      suggestedPrompts: [
        "🎥 Watch workshop videos?",
        "📍 Workshop visit in Jaipur?",
        "🧳 View all handmade duffles?",
      ],
    };
  }

  // 11. Workshop Location & Visiting Hours
  if (
    query.includes("location") ||
    query.includes("address") ||
    query.includes("where") ||
    query.includes("workshop") ||
    query.includes("jaipur") ||
    query.includes("visit") ||
    query.includes("store") ||
    query.includes("shop")
  ) {
    return {
      reply: `📍 **Jai Fabrication Workshop Atelier**:\n\n23, Hawa Sadak Rd, Brij Colony, Ramnagar Extension, Ramnagar, Jaipur, Rajasthan 302019, India.\n\n⏰ **Visiting Hours**: Monday to Sunday · 10:00 AM – 6:00 PM IST\n\nVisitors are welcome to see live wooden block stamping, select fabrics in person, or plan custom bridal wedding orders!`,
      whatsappText: "Hello Jai Fabrication, I would like to schedule a visit to your Jaipur workshop atelier.",
      suggestedPrompts: [
        "📦 Bulk orders for weddings?",
        "🚚 Worldwide courier delivery?",
        "🧳 View product catalog?",
      ],
    };
  }

  // 12. Payment Methods & Security
  if (
    query.includes("payment") ||
    query.includes("pay") ||
    query.includes("upi") ||
    query.includes("cod") ||
    query.includes("card") ||
    query.includes("bank") ||
    query.includes("google pay") ||
    query.includes("phonepe")
  ) {
    return {
      reply: `💳 **Accepted Payment Methods**:\n\n• **Domestic (India)**: UPI (Google Pay, PhonePe, Paytm), NetBanking / IMPS / NEFT, Debit/Credit Cards.\n• **International**: Bank Wire (SWIFT / IBAN), PayPal, Stripe payment links.\n• **Custom/Bulk Orders**: 50% advance to initiate production, balance 50% prior to dispatch with video inspection!`,
      whatsappText: "Hello Jai Fabrication, please share your official bank & UPI payment details for order confirmation.",
      suggestedPrompts: [
        "📦 How to place an order?",
        "🚚 Pan-India delivery timeline?",
        "💍 Custom wedding orders?",
      ],
    };
  }

  // 13. Default Fallback with Contextual Smart Guidance
  return {
    reply: `Namaste! 🙏 Every Jai Fabrication piece is handcrafted from 100% natural cotton in our Jaipur workshop.\n\nI can help you with:\n• **Bulk Quotations** (10 to 500+ pcs with live discounts)\n• **Wedding & Mehendi Favours** (Monograms & custom prints)\n• **Product Advice** (Duffles, Vanity Boxes, Totes, Laptop Sleeves)\n• **Shipping & Delivery Timelines** (Pan-India & Worldwide)\n\nWhat would you like to explore today?`,
    whatsappText: `Hello Jai Fabrication, I have an inquiry about: "${userText}"`,
    recommendedProducts: PRODUCTS_DATA.slice(0, 2),
    suggestedPrompts: [
      "🧳 Best travel duffle bags?",
      "📦 Bulk discount for 50 pcs?",
      "💍 Custom wedding favours?",
      "🚚 Shipping timeline?",
    ],
  };
}

export function ArtisanChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Namaste! 🌸 I am your Jaipur Artisan AI Assistant.\n\nAsk me about bulk discounts (10–100+ pcs), wedding favours & monograms, travel duffles, wash care, or worldwide shipping!",
      timestamp: "Just now",
      suggestedPrompts: [
        "📦 Bulk discount for 25 / 50 / 100 pcs?",
        "💍 Wedding favours & couple monograms?",
        "🧳 Best travel duffles?",
        "🚚 Shipping timeline?",
      ],
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const response = processSmartQuery(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        whatsappCta: response.whatsappText,
        recommendedProducts: response.recommendedProducts,
        suggestedPrompts: response.suggestedPrompts,
        calculatedQuote: response.calculatedQuote,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-5 left-5 z-50">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="group relative flex items-center gap-2.5 rounded-full bg-maroon px-4 py-3.5 text-xs uppercase tracking-wider text-ivory shadow-2xl transition-all hover:bg-terracotta hover:scale-105 active:scale-95 border-2 border-ivory/20"
          aria-label="Open Artisan AI Assistant"
        >
          <div className="relative">
            <Bot className="h-5 w-5 text-sandstone" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-terracotta"></span>
            </span>
          </div>
          <span className="hidden sm:inline font-semibold">Artisan AI Help</span>
        </button>
      </div>

      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 sm:left-6 z-50 flex h-[580px] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-md border border-border/80 bg-background shadow-2xl animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/70 bg-sandstone/35 px-4 py-3.5">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-maroon text-ivory shadow-xs">
                <Sparkles className="h-4 w-4 text-sandstone" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-maroon leading-tight">
                  Jaipur Artisan AI
                </h3>
                <p className="text-[0.62rem] text-muted-foreground flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 inline-block"></span>
                  Live Workshop Intelligence · WhatsApp Ready
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setMessages([
                    {
                      id: `welcome-${Date.now()}`,
                      sender: "bot",
                      text: "Chat reset. How can I help you today with handcrafted bags or bulk pricing?",
                      timestamp: "Just now",
                      suggestedPrompts: INITIAL_SUGGESTIONS,
                    },
                  ]);
                }}
                className="rounded-sm p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-sm p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                aria-label="Close Chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-secondary/15 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div className={`flex gap-2 max-w-[88%] ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {m.sender === "bot" && (
                    <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-maroon/15 text-maroon mt-0.5">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <div
                    className={`rounded-sm p-3.5 whitespace-pre-line leading-relaxed shadow-xs ${
                      m.sender === "user"
                        ? "bg-maroon text-ivory font-medium"
                        : "bg-card border border-border/70 text-foreground"
                    }`}
                  >
                    <p>{m.text}</p>

                    {/* Calculated Live Bulk Quote Box */}
                    {m.calculatedQuote && (
                      <div className="mt-3 rounded-xs border border-terracotta/40 bg-sandstone/30 p-2.5 text-[0.68rem] text-foreground">
                        <div className="flex items-center justify-between font-bold text-maroon">
                          <span>{m.calculatedQuote.qty} pcs Bulk Quote</span>
                          <span className="text-terracotta">{m.calculatedQuote.discountPercent}% OFF</span>
                        </div>
                        <p className="mt-1 text-muted-foreground">
                          Total Estimate: <strong className="text-foreground">₹{m.calculatedQuote.totalPrice.toLocaleString("en-IN")}</strong> (Saved ₹{m.calculatedQuote.savings.toLocaleString("en-IN")})
                        </p>
                      </div>
                    )}

                    {/* Recommended Product Cards directly in chat */}
                    {m.recommendedProducts && m.recommendedProducts.length > 0 && (
                      <div className="mt-3 space-y-2 border-t border-border/60 pt-2.5">
                        <p className="text-[0.62rem] uppercase tracking-wider font-semibold text-terracotta">
                          Recommended Creations:
                        </p>
                        <div className="grid gap-2">
                          {m.recommendedProducts.map((prod) => (
                            <div
                              key={prod.id}
                              className="flex items-center justify-between gap-2 rounded-xs border border-border/70 bg-background p-2"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="h-9 w-9 shrink-0 overflow-hidden rounded-xs bg-secondary">
                                  <AssetImage
                                    src={prod.asset}
                                    alt={prod.name}
                                    placeholderLabel={prod.placeholder}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-serif text-xs font-semibold text-maroon truncate">
                                    {prod.name}
                                  </p>
                                  <p className="text-[0.62rem] text-muted-foreground">
                                    ₹{prod.price.toLocaleString("en-IN")} · {prod.categoryLabel}
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  addToCart(prod, 1);
                                  setIsCartOpen(true);
                                }}
                                className="shrink-0 bg-maroon px-2 py-1 text-[0.6rem] uppercase tracking-wider text-ivory font-semibold hover:bg-terracotta rounded-xs transition-colors"
                              >
                                Add +
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* WhatsApp Action CTA */}
                    {m.whatsappCta && (
                      <a
                        href={`https://wa.me/${WA_BASE_PHONE}?text=${encodeURIComponent(m.whatsappCta)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 rounded-xs bg-maroon px-3 py-1.5 text-[0.65rem] uppercase tracking-wider font-semibold text-ivory hover:bg-terracotta transition-colors shadow-xs"
                      >
                        <MessageCircle className="h-3 w-3" />
                        Continue on WhatsApp
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    )}

                    <span className="block text-[0.55rem] text-muted-foreground/80 mt-1 text-right">
                      {m.timestamp}
                    </span>
                  </div>
                </div>

                {/* Follow-up Suggestion Pills */}
                {m.suggestedPrompts && m.suggestedPrompts.length > 0 && (
                  <div className="mt-2 pl-8 flex flex-wrap gap-1">
                    {m.suggestedPrompts.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handleSendMessage(p)}
                        className="rounded-full border border-maroon/20 bg-background px-2.5 py-1 text-[0.62rem] text-foreground/85 hover:border-terracotta hover:text-terracotta hover:bg-card transition-colors shadow-2xs"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs pl-8">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce delay-100">●</span>
                <span className="animate-bounce delay-200">●</span>
                <span className="text-[0.65rem] italic ml-1">Jaipur artisan assistant is researching...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Carousel at Bottom */}
          <div className="border-t border-border/60 bg-background px-3 py-2 overflow-x-auto flex gap-1.5 no-scrollbar">
            {INITIAL_SUGGESTIONS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="shrink-0 rounded-full border border-border/80 bg-secondary/40 px-2.5 py-1 text-[0.62rem] text-foreground/85 hover:border-terracotta hover:text-terracotta transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 border-t border-border/70 bg-card p-2.5"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about bulk rates, duffles, wedding bags..."
              className="flex-1 rounded-sm border border-border/70 bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-terracotta focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="grid h-8 w-8 place-items-center rounded-sm bg-maroon text-ivory hover:bg-terracotta disabled:opacity-40 transition-all"
              aria-label="Send Message"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
