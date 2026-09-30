import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Menu,
  X,
  MessageCircle,
  Instagram,
  MapPin,
  Clock,
  Search,
  ShoppingBag,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle2,
  ArrowRight,
  Sliders,
  Eye,
  Plus,
  Minus,
  Trash2,
  Send,
  Bot,
  Play,
  Share2,
  ExternalLink,
  ShieldCheck,
  Truck,
  Heart,
  Calendar,
  Globe2,
  HelpCircle,
  PhoneCall,
  Scissors,
  Layers,
  Sun,
  Flame,
} from "lucide-react";

import { AssetImage } from "@/components/AssetImage";
import { siteAssets } from "@/lib/site-assets";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WA_BASE = "https://wa.me/919521922366";
const wa = (message: string) => `${WA_BASE}?text=${encodeURIComponent(message)}`;

const CUSTOM_WA = wa(
  "Hello Jai Fabrication! I would like to enquire about custom & bulk orders of handmade block-print bags.",
);

// Currency definitions with conversion factors from INR
type CurrencyCode = "INR" | "USD" | "EUR" | "GBP" | "AED";

const CURRENCIES: Record<
  CurrencyCode,
  { symbol: string; rate: number; label: string }
> = {
  INR: { symbol: "₹", rate: 1, label: "INR (₹)" },
  USD: { symbol: "$", rate: 0.012, label: "USD ($)" },
  EUR: { symbol: "€", rate: 0.011, label: "EUR (€)" },
  GBP: { symbol: "£", rate: 0.0095, label: "GBP (£)" },
  AED: { symbol: "AED ", rate: 0.044, label: "AED (د.إ)" },
};

export interface Product {
  id: string;
  name: string;
  category:
    | "Duffle & Travel"
    | "Laptop Sleeves"
    | "Pouches & Vanity"
    | "Yoga & Active"
    | "Totes & Shoppers"
    | "Sets & Favours";
  basePrice: number; // INR
  asset: string;
  note: string;
  dimensions: string;
  fabric: string;
  tags: string[];
  rating: number;
  reviewsCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
}

const PRODUCTS: Product[] = [
  {
    id: "pink-blossom-laptop-sleeve",
    name: "Pink Blossom Ruffled Quilted Laptop Sleeve",
    category: "Laptop Sleeves",
    basePrice: 1299,
    asset: siteAssets.pinkRuffleLaptopSleeve,
    note: "Quilted Jaipur floral cotton with mustard ruffle trims, front bow-tie closure and scrunchie carry strap.",
    dimensions: "14.5\" x 10.5\" x 1.2\" (Fits up to 14-15\" Laptops)",
    fabric: "100% Pure Cotton Canvas & Voile, Cotton Batting",
    tags: ["100% Cotton", "Scrunchie Strap", "Ruffled Trim"],
    rating: 4.9,
    reviewsCount: 19,
    isBestseller: true,
    isNew: true,
  },
  {
    id: "pink-lemon-stripe-holdall",
    name: "Pink Lemon Stripe Quilted Travel Holdall",
    category: "Duffle & Travel",
    basePrice: 1749,
    asset: siteAssets.pinkLemonStripeHoldall,
    note: "Candy-stripe pink channel quilting with sunny yellow lemon motifs, deep front pocket and long shoulder straps.",
    dimensions: "19\" x 12\" x 8.5\" (Capacity: 32L)",
    fabric: "Heavyweight Cotton Canvas, Antique Brass Zippers",
    tags: ["100% Cotton", "Candy Stripe", "Extra Roomy"],
    rating: 5.0,
    reviewsCount: 16,
    isBestseller: true,
    isNew: true,
  },
  {
    id: "dusty-rose-floral-duffle",
    name: "Dusty Rose Floral Quilted Weekend Duffle",
    category: "Duffle & Travel",
    basePrice: 1699,
    asset: siteAssets.dustyRoseFloralDuffle,
    note: "Pastel pink quilted cotton with botanical floral prints and candy-striped webbing straps.",
    dimensions: "18\" x 10\" x 10\" (Capacity: 28L)",
    fabric: "Diamond-quilted cotton with internal slip pocket",
    tags: ["100% Cotton", "Weekend Duffle", "Striped Straps"],
    rating: 4.8,
    reviewsCount: 23,
    isNew: true,
  },
  {
    id: "indigo-floral-barrel-duffle",
    name: "Indigo White Floral Barrel Duffle Bag",
    category: "Duffle & Travel",
    basePrice: 1599,
    asset: siteAssets.indigoFloralDuffle,
    note: "Classic Indigo dabu block-print with white chrysanthemum blooms, striped borders and brass hardware.",
    dimensions: "17.5\" x 9.5\" x 9.5\" (Capacity: 26L)",
    fabric: "Natural Indigo Dabu Resist Block Print, Pure Cotton",
    tags: ["Natural Indigo", "100% Cotton", "Brass Hardware"],
    rating: 4.9,
    reviewsCount: 28,
    isBestseller: true,
  },
  {
    id: "mughal-botanical-holdall",
    name: "Mughal Botanical Quilted Holdall Bag",
    category: "Duffle & Travel",
    basePrice: 1799,
    asset: siteAssets.mughalBotanicalHoldall,
    note: "Ivory cotton canvas with slate blue Mughal flower bootahs, dual side bottle pockets and striped straps.",
    dimensions: "20\" x 12\" x 9\" (Capacity: 34L)",
    fabric: "100% Natural Cotton, Water-resistant Base Lining",
    tags: ["Extra Roomy", "100% Cotton", "Side Pockets"],
    rating: 4.9,
    reviewsCount: 31,
    isNew: true,
  },
  {
    id: "bohemian-kantha-patchwork-duffle",
    name: "Bohemian Kantha Patchwork Travel Duffle",
    category: "Duffle & Travel",
    basePrice: 1899,
    asset: siteAssets.bohoKanthaDuffle,
    note: "Multicolour pieced artisan block-print panels with Kantha running stitches and monochrome striped piping.",
    dimensions: "19\" x 11\" x 10\" (Capacity: 30L)",
    fabric: "Artisan Kantha Hand-Stitched Patchwork Cotton",
    tags: ["One of a Kind", "Kantha Quilted", "Artisan Stitched"],
    rating: 4.9,
    reviewsCount: 34,
    isBestseller: true,
  },
  {
    id: "blue-mughal-vanity-box",
    name: "Blue Mughal Flora Quilted Vanity Train Case",
    category: "Pouches & Vanity",
    basePrice: 899,
    asset: siteAssets.blueMughalVanityBox,
    note: "Structured box silhouette with top carry handle, azure floral bootahs and wipe-clean interior lining.",
    dimensions: "9\" x 6.5\" x 5.5\"",
    fabric: "Quilted Cotton with Wipe-Clean TPU Coated Lining",
    tags: ["Top Handle", "Wipe-Clean Lining", "Structured Box"],
    rating: 4.9,
    reviewsCount: 22,
    isBestseller: true,
    isNew: true,
  },
  {
    id: "lavender-bloom-vanity-case",
    name: "Lavender Bloom Triangular Vanity Case",
    category: "Pouches & Vanity",
    basePrice: 749,
    asset: siteAssets.lavenderVanityCase,
    note: "Standing triangular silhouette in royal purple floral block print with silk tassel pull.",
    dimensions: "8.5\" x 5\" x 4.5\"",
    fabric: "100% Cotton Canvas with Silk Tassel Zipper",
    tags: ["Standing Base", "Water-Resistant Lining", "Silk Tassel"],
    rating: 4.8,
    reviewsCount: 21,
    isBestseller: true,
    isNew: true,
  },
  {
    id: "lime-pink-flora-cosmetic-pouch",
    name: "Lime & Pink Flora Quilted Cosmetic Pouch",
    category: "Pouches & Vanity",
    basePrice: 699,
    asset: siteAssets.limePinkFloraPouch,
    note: "Chartreuse lime cotton with pink lily block prints and dual handcrafted pom-pom tassels.",
    dimensions: "8\" x 5.5\" x 3\"",
    fabric: "100% Cotton, Diamond Quilted with Cotton Fluff",
    tags: ["100% Cotton", "Dual Tassels", "Mustard Lining"],
    rating: 4.9,
    reviewsCount: 15,
    isNew: true,
  },
  {
    id: "candy-pink-striped-clutch",
    name: "Candy Pink Striped Quilted Clutch & Vanity Box",
    category: "Pouches & Vanity",
    basePrice: 799,
    asset: siteAssets.pinkStripeClutchBox,
    note: "Vibrant hot pink and rose striped channel quilting with block-print wristlet strap.",
    dimensions: "9.5\" x 6\" x 2.5\"",
    fabric: "Channel-quilted cotton with detachable wristlet",
    tags: ["Wristlet Strap", "Dual Use", "Gold Zipper"],
    rating: 4.9,
    reviewsCount: 15,
    isNew: true,
  },
  {
    id: "sunlit-marigold-pouch",
    name: "Sunlit Marigold Quilted Pouch",
    category: "Pouches & Vanity",
    basePrice: 699,
    asset: siteAssets.sunlitMarigoldPouch,
    note: "Quilted yellow cotton with traditional Sanganeri floral motif and hand-finished zip pull.",
    dimensions: "8.5\" x 5.5\" x 3.5\"",
    fabric: "100% Pure Cotton with Antique Brass Zipper",
    tags: ["100% Cotton", "Handmade", "Festive Favours"],
    rating: 4.9,
    reviewsCount: 15,
    isBestseller: true,
  },
  {
    id: "peach-sanganeri-yoga-carrier",
    name: "Peach Blossom Sanganeri Yoga Mat Carrier",
    category: "Yoga & Active",
    basePrice: 1449,
    asset: siteAssets.peachYogaMatCarrier,
    note: "Pastel peach and sage floral geometric print with full-length zipper and striped shoulder strap.",
    dimensions: "28\" x 6.5\" Diameter (Fits up to 10mm Yoga Mats)",
    fabric: "Quilted Cotton Canvas with Breathable Eyelets",
    tags: ["Fits Thick Mats", "100% Cotton", "Adjustable Strap"],
    rating: 4.8,
    reviewsCount: 14,
    isNew: true,
  },
  {
    id: "azure-safari-yoga-carrier",
    name: "Azure Safari Quilted Yoga Mat Carrier Bag",
    category: "Yoga & Active",
    basePrice: 1499,
    asset: siteAssets.azureSafariYogaMatCarrier,
    note: "Cerulean blue palm & wildlife hand-block print with quilted padding and adjustable shoulder strap.",
    dimensions: "28\" x 7\" Diameter (Fits extra-thick mats)",
    fabric: "100% Natural Cotton with Water-Repellent Coating",
    tags: ["Fits Thick Mats", "100% Cotton", "Zipper Pocket"],
    rating: 4.9,
    reviewsCount: 15,
    isBestseller: true,
    isNew: true,
  },
  {
    id: "jaipur-floral-canvas-tote",
    name: "Jaipur Floral Canvas Everyday Tote",
    category: "Totes & Shoppers",
    basePrice: 1199,
    asset: siteAssets.floralTote,
    note: "Hand-block floral repeat on structured cotton canvas with reinforced heavy-duty webbed handles.",
    dimensions: "16\" x 14\" x 5\" (Handle drop: 10.5\")",
    fabric: "Heavy 320 GSM Cotton Canvas with Inner Key Pocket",
    tags: ["100% Cotton", "Handmade", "Everyday Essential"],
    rating: 4.9,
    reviewsCount: 15,
    isBestseller: true,
  },
  {
    id: "peach-pleated-clutch-nest",
    name: "3-Piece Peach Pleated Cosmetic Clutch Nest",
    category: "Sets & Favours",
    basePrice: 1349,
    asset: siteAssets.peachPleatedClutchNest,
    note: "Curated set of 3 pleated channel-quilted clutches in nesting sizes with handcrafted beaded tassels.",
    dimensions: "L: 9.5\"x6\", M: 7.5\"x5\", S: 5.5\"x4\"",
    fabric: "100% Soft Quilted Cotton Set of 3",
    tags: ["Set of 3", "Beaded Tassels", "Nesting Hampers"],
    rating: 4.9,
    reviewsCount: 18,
    isBestseller: true,
    isNew: true,
  },
  {
    id: "gifting-nest-pouch-set",
    name: "3-Piece Jaipur Heritage Gifting Nest Pouch Set",
    category: "Sets & Favours",
    basePrice: 1299,
    asset: siteAssets.giftingNestPouchSet,
    note: "Set of three nesting quilted pouches in complementary Jaipur botanical motifs with presentation box.",
    dimensions: "L: 9\"x6\", M: 7\"x5\", S: 5\"x3.5\"",
    fabric: "100% Hand-Block Cotton with Gift Box Packaging",
    tags: ["Gift Boxed", "Set of 3", "Wedding Hamper"],
    rating: 4.9,
    reviewsCount: 15,
    isBestseller: true,
  },
];

const QUANTITY_TIERS = [
  { count: 1, label: "1 pc", discountPercent: 0, tag: "Sample Price" },
  { count: 10, label: "10 pcs", discountPercent: 10, tag: "10% Off" },
  { count: 25, label: "25 pcs", discountPercent: 18, tag: "18% Off" },
  { count: 50, label: "50 pcs", discountPercent: 25, tag: "25% Off" },
  { count: 100, label: "100 pcs", discountPercent: 35, tag: "35% Off" },
];

interface CartItem {
  product: Product;
  tierCount: number;
  unitPrice: number;
  totalPrice: number;
}

const HERO_SLIDES = [
  {
    id: 1,
    tag: "Handcrafted in Jaipur · 100% Pure Cotton",
    title: "Carry a piece of the Pink City.",
    description:
      "Hand-block printed cotton bags with colourful character, made for everyday journeys, conscious luxury, and meaningful gifting. Direct from our artisan printing tables in Jaipur.",
    image: siteAssets.hero,
    badgeText: "Jaipur Atelier",
    subBadge: "100% Teak Woodblock Craft",
    ctaPrimary: "Shop Collection",
    ctaSecondary: "Custom & Bulk Orders",
  },
  {
    id: 2,
    tag: "Documentary Craft Series · Workshop Atelier",
    title: "50,000 Strikes of Pure Artistry.",
    description:
      "Step inside our Hawa Sadak workshop. Witness master block carvers and colorists bringing ancient Sanganeri and Mughal patterns to life using 100% pure cotton and botanical dyes.",
    image: siteAssets.craftCarving,
    badgeText: "Master Ustad Ramprasad Ji",
    subBadge: "Teak Woodblock Chiseling",
    ctaPrimary: "Watch Reels & Ads",
    ctaSecondary: "Book Workshop Tour",
  },
  {
    id: 3,
    tag: "Wedding Favours · Mehendi Hampers · Gifting",
    title: "Unforgettable Gifting, Crafted with Love.",
    description:
      "Custom block-printed totes, cosmetic clutches, and vanity hampers customized with your couple monogram or event brand tags. Express production dispatched within 3–5 days.",
    image: siteAssets.peachPleatedClutchNest,
    badgeText: "150+ Weddings Celebrated",
    subBadge: "Custom Monograms Available",
    ctaPrimary: "Configure Favours",
    ctaSecondary: "WhatsApp Consultation",
  },
  {
    id: 4,
    tag: "Travel Holdalls · Laptop Sleeves · Vanity Cases",
    title: "Timeless Quilting. Modern Utility.",
    description:
      "Channel & diamond-quilted travel bags, shock-absorbent laptop cases, and waterproof-lined vanity organizers engineered with reinforced stitching and pure cotton wadding.",
    image: siteAssets.pinkLemonStripeHoldall,
    badgeText: "New Season Edit",
    subBadge: "Heavy-Duty Brass Hardware",
    ctaPrimary: "Explore Travel Bags",
    ctaSecondary: "Wholesale Enquiry",
  },
];

const FAQS = [
  {
    q: "Do you ship across India and internationally?",
    a: "Yes! We ship across India via Bluedart/Delhivery (2-4 business days) and internationally to the US, UK, Europe, UAE, Australia, and Canada via DHL/FedEx Express (4-7 business days). Shipping quotes are confirmed instantly on WhatsApp.",
  },
  {
    q: "How do I place an order or customize wedding favours?",
    a: "You can click any 'WhatsApp Enquiry' or 'Add to Bag' button on this site. Our Jaipur workshop team connects directly with you on WhatsApp with digital mockups, fabric swatch photos, and payment links (UPI, Cards, Bank Wire, PayPal).",
  },
  {
    q: "What fabric, wadding, and dyes do you use?",
    a: "We use 100% pure natural cotton (canvas, cambric, and voile), pure cotton wadding for plush diamond quilting, and azo-free, skin-safe mineral and vegetable pigments including authentic Indigo mud-resist Dabu.",
  },
  {
    q: "What is the Minimum Order Quantity (MOQ) for custom monograms?",
    a: "For personalized embroidered or woven couple monogram tags, our MOQ is 25 pcs. Single piece sample orders can also be dispatched immediately so you can inspect stitch quality before placing large bulk orders.",
  },
  {
    q: "What is the production turnaround time for bulk orders?",
    a: "Standard batches of 25–150 pcs are dispatched within 3–5 business days. Large orders of 500+ pcs are crafted and shipped within 7–10 days from our Jaipur workshop.",
  },
  {
    q: "How should I wash and care for hand block-printed cotton bags?",
    a: "Hand wash gently in cold water with mild liquid detergent or dry clean for best longevity. Do not soak or bleach. Line dry in shade to preserve vibrant botanical colors.",
  },
  {
    q: "What is your return or transit damage policy?",
    a: "Every piece undergoes strict 3-stage quality inspection. In the rare event of transit damage or manufacturing defect, report it within 3 days of delivery for an immediate free replacement or refund.",
  },
];

const REVIEWS = [
  {
    name: "Ananya Singhania",
    role: "Wedding & Event Planner",
    city: "Mumbai & Udaipur",
    text: "Jai Fabrication produced 200 custom block-printed tote bags for our Udaipur destination wedding in just 5 days. The print sharpness, sturdy canvas handles, and couple monogram tag were perfection. Our wedding guests were completely enchanted!",
    rating: 5,
    order: "Custom Monogram Canvas Totes (200 pcs)",
  },
  {
    name: "Dr. Rohini & Karan Mehta",
    role: "Private Bride & Groom",
    city: "New Delhi",
    text: "The quilted pouches in sunlit yellow and turquoise were the absolute highlight of my sister's Mehendi hampers. The zipper quality is smooth, the diamond quilting is plush, and communication on WhatsApp was swift and warm.",
    rating: 5,
    order: "Sunlit Marigold Quilted Pouches (85 pcs)",
  },
  {
    name: "Claire Thorne",
    role: "Lifestyle Boutique Curator",
    city: "London, UK",
    text: "Finding authentic 100% cotton Jaipur block prints with such consistent sewing craftsmanship is rare. The Duffle bags and Shopper totes sell out within days in our store. Direct workshop pricing with hassle-free DHL export shipping.",
    rating: 5,
    order: "Heritage Patchwork Weekend Duffles (120 pcs)",
  },
  {
    name: "Pooja Varma",
    role: "Corporate Brand Lead",
    city: "Bengaluru",
    text: "Ordered 150 laptop sleeves for our annual women leadership summit. The pastel floral block prints and ruffle details were loved by all delegates. Extremely prompt invoice generation and GST billing.",
    rating: 5,
    order: "Pink Blossom Quilted Laptop Sleeves (150 pcs)",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jai Fabrication | Handmade Block Print Bags from Jaipur" },
      {
        name: "description",
        content:
          "Shop handmade 100% cotton block-print tote bags, duffle bags, laptop sleeves, pouches and wedding favours by Jai Fabrication, crafted by master artisans in Jaipur, Rajasthan.",
      },
      {
        property: "og:title",
        content: "Jai Fabrication | Handmade Block Print Bags from Jaipur",
      },
      {
        property: "og:description",
        content:
          "Discover handmade 100% cotton block-print tote bags, duffles, and vanity pouches crafted in Jaipur. Custom prints, wedding favours, and wholesale orders available.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: IndexPage,
});

function IndexPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Creations");
  const [heroSlide, setHeroSlide] = useState(0);
  const [bagOpen, setBagOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Selected quantity tier per product ID (default: 1)
  const [productTiers, setProductTiers] = useState<Record<string, number>>({});

  // Custom Atelier Configurator State
  const [atelierOccasion, setAtelierOccasion] = useState("Wedding & Mehendi Favours");
  const [atelierSilhouette, setAtelierSilhouette] = useState("Handmade Cotton Tote Bags");
  const [atelierTier, setAtelierTier] = useState("51 – 150 pcs");
  const [atelierMonogram, setAtelierMonogram] = useState(true);
  const [atelierGiftBox, setAtelierGiftBox] = useState(false);
  const [atelierNotes, setAtelierNotes] = useState("");

  // Auto cycle hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  // Format currency helper
  const formatPrice = (inrAmount: number) => {
    const curr = CURRENCIES[currency];
    const converted = inrAmount * curr.rate;
    if (currency === "INR") {
      return `₹${Math.round(converted).toLocaleString("en-IN")}`;
    }
    return `${curr.symbol}${converted.toFixed(2)}`;
  };

  // Filter products
  const categories = [
    "All Creations",
    "Duffle & Travel",
    "Laptop Sleeves",
    "Pouches & Vanity",
    "Yoga & Active",
    "Totes & Shoppers",
    "Sets & Favours",
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory =
        selectedCategory === "All Creations" || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.note.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const getProductTier = (productId: string) => {
    return productTiers[productId] || 1;
  };

  const setProductTier = (productId: string, count: number) => {
    setProductTiers((prev) => ({ ...prev, [productId]: count }));
  };

  const calculateProductPrice = (basePrice: number, count: number) => {
    const tier = QUANTITY_TIERS.find((t) => t.count === count) || QUANTITY_TIERS[0];
    const unitPrice = Math.round(basePrice * (1 - tier.discountPercent / 100));
    const totalPrice = unitPrice * count;
    return { unitPrice, totalPrice, discountPercent: tier.discountPercent };
  };

  // Add product to Enquiry Cart
  const addToCart = (product: Product) => {
    const count = getProductTier(product.id);
    const { unitPrice, totalPrice } = calculateProductPrice(product.basePrice, count);

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.tierCount === count,
      );
      if (existingIdx > -1) {
        showToast(`Updated quantity in enquiry bag!`);
        return prev;
      }
      showToast(`Added ${count}x ${product.name} to enquiry bag!`);
      return [...prev, { product, tierCount: count, unitPrice, totalPrice }];
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    showToast("Item removed from enquiry bag.");
  };

  const cartTotalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalItemCount = cart.reduce((sum, item) => sum + item.tierCount, 0);

  // Generate WhatsApp message for Enquiry Cart
  const getCartWhatsAppUrl = () => {
    if (cart.length === 0) return CUSTOM_WA;
    let msg = `🌸 *JAI FABRICATION — BESPOKE ORDER ENQUIRY*\n\nHello Atelier Team! I would like to place an order enquiry for the following handcrafted block-print bags:\n\n`;
    cart.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.product.name}*\n   • Quantity: ${item.tierCount} pcs\n   • Unit Price: ${formatPrice(item.unitPrice)}\n   • Item Total: ${formatPrice(item.totalPrice)}\n\n`;
    });
    msg += `📦 *Total Quantity:* ${totalItemCount} pcs\n💰 *Estimated Total:* ${formatPrice(cartTotalAmount)}\n📍 *Currency:* ${currency}\n\nPlease confirm availability, digital proof mockup & dispatch timeline. Thank you!`;
    return wa(msg);
  };

  // Atelier configurator estimate calculator
  const atelierEstimate = useMemo(() => {
    let unitBase = 450;
    if (atelierSilhouette.includes("Duffle")) unitBase = 950;
    else if (atelierSilhouette.includes("Pouch")) unitBase = 320;
    else if (atelierSilhouette.includes("Slings")) unitBase = 420;
    else if (atelierSilhouette.includes("Bundle")) unitBase = 1100;

    let pcs = 35;
    let discount = 0.15;
    if (atelierTier.includes("51 – 150")) {
      pcs = 100;
      discount = 0.22;
    } else if (atelierTier.includes("151 – 500")) {
      pcs = 250;
      discount = 0.3;
    } else if (atelierTier.includes("500+")) {
      pcs = 500;
      discount = 0.38;
    }

    let extraPerPiece = 0;
    if (atelierMonogram) extraPerPiece += 35;
    if (atelierGiftBox) extraPerPiece += 60;

    const unitPrice = Math.round(unitBase * (1 - discount) + extraPerPiece);
    const total = unitPrice * pcs;
    return { unitPrice, total, pcs };
  }, [
    atelierSilhouette,
    atelierTier,
    atelierMonogram,
    atelierGiftBox,
  ]);

  const getAtelierWhatsAppUrl = () => {
    const msg = `🌸 *JAI FABRICATION — CUSTOM ATELIER ESTIMATE*\n\nHello Team, I configured a custom bulk order on your website:\n• *Project / Occasion:* ${atelierOccasion}\n• *Bag Silhouette:* ${atelierSilhouette}\n• *Quantity Tier:* ${atelierTier} (~${atelierEstimate.pcs} pcs)\n• *Couple/Brand Monogram Tag:* ${atelierMonogram ? "Yes" : "No"}\n• *Artisan Gift Box Packaging:* ${atelierGiftBox ? "Yes" : "No"}\n• *Notes:* ${atelierNotes || "Standard Jaipur floral block print"}\n\n• *Estimated Price:* ~${formatPrice(atelierEstimate.unitPrice)}/pc (Total: ~${formatPrice(atelierEstimate.total)})\n\nPlease share catalog swatches & lead time. Thank you!`;
    return wa(msg);
  };

  // AI Assistant simulated answers
  const [aiChat, setAiChat] = useState<
    Array<{ sender: "user" | "bot"; text: string }>
  >([
    {
      sender: "bot",
      text: "Namaste! 🙏 Welcome to Jai Fabrication Atelier in Jaipur. I can help you with fabric details, custom wedding favour tags, minimum order quantities (MOQ), sample orders, or international shipping. What can I assist you with today?",
    },
  ]);
  const [aiInput, setAiInput] = useState("");

  const handleAiSend = (queryText?: string) => {
    const q = queryText || aiInput;
    if (!q.trim()) return;

    setAiChat((prev) => [...prev, { sender: "user", text: q }]);
    setAiInput("");

    setTimeout(() => {
      let reply =
        "Our Jaipur master craftsmen specialize in 100% natural cotton hand-block printing, diamond quilting, and custom wedding favours. For urgent orders, our master colorists can dispatch in 3–5 days!";
      const lower = q.toLowerCase();
      if (lower.includes("moq") || lower.includes("minimum")) {
        reply =
          "Our Minimum Order Quantity (MOQ) for custom couple/brand monograms is just 25 pcs! For non-customized bags, you can order single piece samples (1 pc) directly.";
      } else if (lower.includes("wedding") || lower.includes("favour") || lower.includes("mehendi")) {
        reply =
          "We love crafting wedding hampers! You can choose custom floral block prints to match your wedding invitation palette, and we include customized laser-cut or embroidered couple tags (e.g., 'Ananya & Kabir • Udaipur 2026'). Production takes 3–5 days.";
      } else if (lower.includes("ship") || lower.includes("delivery") || lower.includes("international")) {
        reply =
          "We ship worldwide via DHL/FedEx Express (4-7 business days to USA, UK, Europe, UAE, Canada) and pan-India via Bluedart Express (2-4 days). Free domestic delivery on orders over ₹4,999.";
      } else if (lower.includes("wash") || lower.includes("care") || lower.includes("cotton")) {
        reply =
          "All our pieces are made of 100% pure natural cotton canvas and voile. We recommend gentle hand washing in cold water with mild detergent, or dry cleaning. Always line dry in the shade to preserve vibrant botanical colors.";
      } else if (lower.includes("sample") || lower.includes("swatch")) {
        reply =
          "Yes! You can order 1 pc sample of any bag on our website or request physical block-print fabric swatch cards dispatched via express courier. Message us directly on WhatsApp for sample dispatch!";
      }

      setAiChat((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 450);
  };

  return (
    <div id="top" className="min-h-screen bg-background text-foreground selection:bg-terracotta/25">
      {/* Skip to Content */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-maroon focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 flex items-center gap-3 rounded-md bg-maroon px-5 py-3 text-sm text-ivory shadow-2xl border border-ivory/20 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="h-5 w-5 text-gold" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Announcement Bar */}
      <div className="relative z-50 bg-maroon text-ivory border-b border-maroon/40 overflow-hidden text-[0.68rem] tracking-[0.2em] uppercase font-medium">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 sm:px-8">
          <div className="hidden md:flex items-center gap-2 text-gold font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Jaipur Artisan Craft Atelier</span>
          </div>

          <div className="flex-1 text-center truncate px-2 text-ivory/95">
            <span className="font-semibold text-sandstone">🌸 Authentic Jaipur Hand-Block Cotton Bags</span>
            <span className="mx-2 opacity-60">·</span>
            <span>Wedding Favours &amp; Corporate Gifting from 3 Days</span>
            <span className="mx-2 opacity-60">·</span>
            <span className="hidden sm:inline">Worldwide Express Shipping</span>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[0.6rem] text-ivory/70 hidden sm:inline">Currency:</span>
            <div className="flex items-center gap-1 bg-ivory/10 px-2 py-0.5 rounded-sm border border-ivory/20">
              {(["INR", "USD", "EUR", "GBP", "AED"] as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={`px-1.5 py-0.5 text-[0.62rem] rounded-xs font-semibold transition-all ${
                    currency === c
                      ? "bg-ivory text-maroon shadow-xs"
                      : "text-ivory/80 hover:text-ivory"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md transition-all shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          {/* Brand Logo & Name */}
          <a
            href="#top"
            className="flex shrink-0 items-center gap-3.5 group focus:outline-none"
            aria-label="Jai Fabrication — Handmade Block Print Bags Jaipur"
          >
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-maroon/30 group-hover:ring-terracotta transition-all shadow-sm">
              <img
                src={siteAssets.logo}
                alt="Jai Fabrication Artisan Logo"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl lg:text-[1.7rem] font-bold leading-tight text-maroon tracking-tight group-hover:text-terracotta transition-colors whitespace-nowrap">
                Jai Fabrication
              </span>
              <span className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground font-semibold whitespace-nowrap">
                Jaipur · Hand Block Craft
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-6 2xl:gap-7">
              {[
                { label: "Shop Creations", href: "#shop", badge: "16" },
                { label: "Our Craft", href: "#craft" },
                { label: "Custom Orders", href: "#custom", badge: "Bulk" },
                { label: "Workshop Reels", href: "#craft-videos" },
                { label: "Lookbook", href: "#lookbook" },
                { label: "Reviews", href: "#testimonials" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="relative group text-[0.76rem] uppercase tracking-[0.18em] text-foreground/85 font-medium transition-colors hover:text-terracotta py-1 flex items-center gap-1.5"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[0.58rem] px-1.5 py-0.2 rounded-full bg-maroon/10 text-maroon font-bold group-hover:bg-terracotta group-hover:text-ivory transition-colors">
                        {item.badge}
                      </span>
                    )}
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-terracotta transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Action Suite */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search trigger */}
            <a
              href="#shop"
              className="grid h-9 w-9 place-items-center rounded-sm border border-maroon/20 text-maroon hover:bg-maroon/10 transition-colors"
              title="Search collection"
              aria-label="Search collection"
            >
              <Search className="h-4 w-4" />
            </a>

            {/* Enquiry Cart Drawer Trigger */}
            <button
              type="button"
              onClick={() => setBagOpen(true)}
              className="relative flex items-center gap-2 border border-maroon/30 bg-secondary/80 px-3.5 py-2 text-[0.72rem] uppercase tracking-[0.16em] text-maroon font-bold transition-all hover:bg-maroon hover:text-ivory rounded-sm shadow-xs active:scale-95"
              aria-label={`Open Enquiry Bag with ${totalItemCount} items`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Enquiry Bag</span>
              {totalItemCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1.5 text-[0.62rem] text-ivory font-bold animate-pulse">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* WhatsApp Direct Order Button */}
            <a
              href={CUSTOM_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex shrink-0 items-center gap-2 bg-maroon px-4 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-ivory font-semibold transition-all hover:bg-terracotta hover:shadow-md rounded-sm"
            >
              <MessageCircle className="h-4 w-4 text-gold" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-maroon/30 text-maroon xl:hidden rounded-sm hover:bg-maroon/10"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="border-t border-border bg-card shadow-xl xl:hidden animate-in slide-in-from-top-2 duration-300"
          >
            <div className="mx-auto max-w-7xl px-5 py-4 space-y-3">
              <ul className="grid grid-cols-2 gap-2 text-[0.75rem] uppercase tracking-[0.16em] font-semibold">
                {[
                  { label: "Shop Creations", href: "#shop" },
                  { label: "Our Craft", href: "#craft" },
                  { label: "Custom Orders", href: "#custom" },
                  { label: "Workshop Reels", href: "#craft-videos" },
                  { label: "Lookbook", href: "#lookbook" },
                  { label: "Reviews", href: "#testimonials" },
                  { label: "FAQ", href: "#faq" },
                  { label: "Contact Workshop", href: "#contact" },
                ].map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block p-2.5 rounded-sm border border-border/70 bg-background text-foreground/90 hover:bg-maroon hover:text-ivory transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={CUSTOM_WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-maroon p-3 text-xs uppercase tracking-[0.18em] text-ivory font-bold rounded-sm shadow-md"
                >
                  <MessageCircle className="h-4 w-4 text-gold" />
                  <span>Enquire on WhatsApp (+91 9521922366)</span>
                </a>
              </div>
            </div>
          </nav>
        )}
      </header>

      <main id="main">
        {/* Hero Section Carousel */}
        <section
          className="relative overflow-hidden bg-sandstone/25 border-b border-border/70"
          style={{ backgroundImage: "var(--gradient-sandstone)" }}
          aria-labelledby="hero-main-title"
        >
          <div aria-hidden="true" className="motif-field pointer-events-none absolute inset-0 opacity-30" />

          <div className="relative mx-auto max-w-7xl px-4 pt-8 pb-14 sm:px-6 lg:px-8 lg:pt-12 lg:pb-20">
            {/* Carousel Tabs Navigation */}
            <div className="mb-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setHeroSlide(idx)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[0.68rem] uppercase tracking-wider font-bold transition-all whitespace-nowrap ${
                      heroSlide === idx
                        ? "bg-maroon text-ivory shadow-md scale-105"
                        : "bg-background/80 border border-border/80 text-muted-foreground hover:text-foreground hover:bg-card"
                    }`}
                  >
                    <span className="font-mono text-[0.62rem] opacity-75">0{slide.id}</span>
                    <span className="hidden sm:inline">
                      {idx === 0
                        ? "Pink City Heritage"
                        : idx === 1
                          ? "Workshop Video"
                          : idx === 2
                            ? "Wedding Favours"
                            : "Travel Duffles"}
                    </span>
                  </button>
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setHeroSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))
                  }
                  className="grid h-8 w-8 place-items-center rounded-full border border-maroon/25 bg-background text-maroon hover:bg-maroon hover:text-ivory transition-colors shadow-xs"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                  className="grid h-8 w-8 place-items-center rounded-full border border-maroon/25 bg-background text-maroon hover:bg-maroon hover:text-ivory transition-colors shadow-xs"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Slide Content Grid */}
            {(() => {
              const current = HERO_SLIDES[heroSlide];
              return (
                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 min-h-[460px]">
                  <div className="max-w-2xl animate-in fade-in slide-in-from-left-4 duration-500 key={current.id}">
                    <div className="inline-flex items-center gap-2 rounded-full border border-maroon/25 bg-background/95 px-3.5 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-maroon font-bold mb-4 backdrop-blur-xs shadow-2xs">
                      <Sparkles className="h-3.5 w-3.5 text-terracotta" />
                      <span>{current.tag}</span>
                    </div>

                    <h1
                      id="hero-main-title"
                      className="mt-2 font-serif text-[2.8rem] leading-[1.08] text-maroon sm:text-6xl lg:text-7xl font-semibold"
                    >
                      {current.title}
                    </h1>

                    <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg">
                      {current.description}
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 max-w-md">
                      <a
                        href="#shop"
                        className="inline-flex items-center justify-center gap-2 bg-maroon px-6 py-3.5 text-[0.75rem] uppercase tracking-[0.2em] text-ivory font-bold transition-all hover:bg-terracotta hover:shadow-lg rounded-xs"
                      >
                        <span>{current.ctaPrimary}</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <a
                        href="#custom"
                        className="inline-flex items-center justify-center border border-maroon px-6 py-3.5 text-[0.75rem] uppercase tracking-[0.2em] text-maroon font-bold transition-all hover:bg-maroon hover:text-ivory rounded-xs bg-background/70 shadow-xs"
                      >
                        {current.ctaSecondary}
                      </a>
                    </div>

                    {/* Quick Trust Highlights */}
                    <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground font-semibold pt-4 border-t border-maroon/15">
                      <span className="inline-flex items-center gap-1.5 text-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-terracotta" />
                        <span>Wedding Favours</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-terracotta" />
                        <span>Corporate Gifting</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-terracotta" />
                        <span>Custom Prints</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-terracotta font-bold">
                        <span>Dispatch from 3 Days</span>
                      </span>
                    </div>
                  </div>

                  {/* Hero Right Visual Card */}
                  <div className="relative animate-in fade-in zoom-in-95 duration-500">
                    <div
                      aria-hidden="true"
                      className="absolute -inset-3.5 hidden border border-maroon/25 lg:block shadow-sm"
                      style={{ borderRadius: "14rem 14rem 6px 6px" }}
                    />
                    <div className="relative overflow-hidden arch-soft aspect-[4/5] w-full shadow-[var(--shadow-lift)] bg-maroon/95">
                      <AssetImage
                        src={current.image}
                        alt={current.title}
                        placeholderLabel="Jai Fabrication Hero Craft Image"
                        loading="eager"
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="h-full w-full object-cover"
                        imgClassName="transition-transform duration-700 hover:scale-105"
                      />

                      <div className="absolute bottom-5 left-5 right-5 rounded-sm bg-background/95 p-4 backdrop-blur-md border border-border/80 shadow-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-terracotta font-bold">
                              {current.badgeText}
                            </p>
                            <p className="font-serif text-base font-bold text-maroon">
                              {current.subBadge}
                            </p>
                          </div>
                          <a
                            href="#lookbook"
                            className="text-[0.7rem] uppercase tracking-wider text-maroon font-bold underline underline-offset-4 hover:text-terracotta transition-colors"
                          >
                            Lookbook →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Slide Indicator Dots */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setHeroSlide(idx)}
                  className="group py-2 px-1 focus:outline-none"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div
                    className={`h-1.5 transition-all duration-500 rounded-full ${
                      heroSlide === idx
                        ? "w-10 bg-maroon shadow-xs"
                        : "w-3 bg-maroon/20 group-hover:bg-maroon/40"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Story / Craft Section */}
        <section id="craft" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:items-center">
            <div>
              <p className="rule-eyebrow">The Jai Story</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-maroon sm:text-5xl font-semibold">
                Crafted in colour. Rooted in Jaipur.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground/80">
                Inspired by the Pink City’s warm sandstone facades, royal courtyards, and timeless
                craft traditions, every Jai Fabrication piece is made in 100% pure cotton with
                signature handmade wooden block-print character.
              </p>

              <div className="mt-8 flex items-center gap-6 sm:gap-8">
                <div>
                  <p className="font-serif text-3xl sm:text-4xl font-bold text-maroon">5+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5 font-medium">
                    Generations of Craft
                  </p>
                </div>
                <div className="h-10 w-px bg-border" />
                <div>
                  <p className="font-serif text-3xl sm:text-4xl font-bold text-maroon">100%</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5 font-medium">
                    Natural Pure Cotton
                  </p>
                </div>
                <div className="h-10 w-px bg-border" />
                <div>
                  <p className="font-serif text-3xl sm:text-4xl font-bold text-maroon">0%</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5 font-medium">
                    Machine Synthetics
                  </p>
                </div>
              </div>
            </div>

            <ol className="grid gap-px bg-border sm:grid-cols-2 shadow-xs rounded-sm overflow-hidden">
              {[
                {
                  step: "01",
                  title: "Carving the block",
                  body: "Teak & Sheesham blocks are hand-chiselled into motifs drawn from Jaipur’s jali screens and garden florals.",
                },
                {
                  step: "02",
                  title: "Natural cotton",
                  body: "Only 100% pure cotton canvas, voile, and cambric is prepared, washed and stretched across the printing table.",
                },
                {
                  step: "03",
                  title: "Printing by hand",
                  body: "Colour is stamped repeat by repeat — the gentle irregularity is the signature mark of the master artisan.",
                },
                {
                  step: "04",
                  title: "Cut, quilt, finish",
                  body: "Panels are reinforced with cotton wadding, diamond quilted, and hand-finished in our Hawa Sadak workshop.",
                },
              ].map((s) => (
                <li key={s.step} className="bg-background p-7 lg:p-8 transition-colors hover:bg-sandstone/20">
                  <span className="font-serif text-2xl text-terracotta font-bold">{s.step}</span>
                  <h3 className="mt-3 text-lg font-serif text-maroon font-bold">{s.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Shop The Edit Catalog Section */}
        <section
          id="shop"
          className="bg-secondary/45 py-16 lg:py-24 border-t border-border/70"
          aria-labelledby="shop-title"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="rule-eyebrow">Shop the Edit</p>
                <h2 id="shop-title" className="mt-3 font-serif text-4xl text-maroon sm:text-5xl font-semibold">
                  Made to be carried.
                </h2>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                  Explore our collection of handcrafted 100% cotton bags, duffles, vanity pouches &amp; gifting sets.
                </p>
              </div>

              {/* Instant Search Bar */}
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search bags, totes, pouches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-sm border border-border bg-background py-2.5 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-terracotta focus:outline-none shadow-xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="mt-8 flex flex-wrap items-center gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => {
                const count =
                  cat === "All Creations"
                    ? PRODUCTS.length
                    : PRODUCTS.filter((p) => p.category === cat).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all whitespace-nowrap ${
                      isSelected
                        ? "bg-maroon text-ivory shadow-sm"
                        : "bg-background border border-border text-foreground/80 hover:border-maroon/40 hover:text-maroon"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[0.62rem] px-1.5 py-0.2 rounded-full ${
                        isSelected ? "bg-ivory/25 text-ivory" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="mt-16 text-center py-12 bg-background rounded-sm border border-border">
                <p className="font-serif text-2xl text-maroon">No matching creations found.</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try clearing your search query or choosing another category filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Creations");
                  }}
                  className="mt-4 inline-flex items-center gap-2 bg-maroon px-5 py-2 text-xs uppercase tracking-wider text-ivory rounded-sm"
                >
                  View All Products
                </button>
              </div>
            ) : (
              <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 lg:gap-10">
                {filteredProducts.map((p) => {
                  const currentTier = getProductTier(p.id);
                  const pricing = calculateProductPrice(p.basePrice, currentTier);

                  return (
                    <li
                      key={p.id}
                      className="group flex flex-col justify-between rounded-sm border border-border/80 bg-card p-4 transition-all duration-300 hover:border-terracotta/50 hover:shadow-[var(--shadow-soft)]"
                    >
                      <div>
                        {/* Image Frame */}
                        <div className="relative arch aspect-[4/5] w-full overflow-hidden bg-secondary shadow-[var(--shadow-soft)]">
                          <AssetImage
                            src={p.asset}
                            alt={`${p.name} — handmade block-print cotton bag by Jai Fabrication`}
                            placeholderLabel={p.name}
                            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                            className="h-full w-full object-cover"
                            imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                          />

                          {/* Top Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                            {p.isBestseller && (
                              <span className="bg-maroon text-ivory text-[0.62rem] uppercase tracking-widest px-2.5 py-1 font-bold shadow-sm rounded-xs">
                                Bestseller
                              </span>
                            )}
                            {p.isNew && (
                              <span className="bg-terracotta text-ivory text-[0.62rem] uppercase tracking-widest px-2.5 py-1 font-bold shadow-sm rounded-xs">
                                New
                              </span>
                            )}
                          </div>

                          {/* Hover Quick Specs Button */}
                          <div className="absolute inset-0 bg-maroon/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center p-4">
                            <button
                              type="button"
                              onClick={() => setQuickViewProduct(p)}
                              className="inline-flex items-center gap-2 bg-ivory px-4 py-2 text-[0.7rem] uppercase tracking-widest text-maroon font-bold shadow-lg transition-transform hover:scale-105 rounded-xs"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              Specs, Reviews &amp; Bulk
                            </button>
                          </div>
                        </div>

                        {/* Tags & Rating */}
                        <div className="mt-4 flex items-center justify-between gap-2">
                          <div className="flex flex-wrap gap-1.5">
                            {p.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="border border-maroon/25 px-2 py-0.5 text-[0.58rem] uppercase tracking-[0.16em] text-maroon/85 font-semibold rounded-xs bg-background"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={() => setQuickViewProduct(p)}
                            className="inline-flex items-center gap-1 text-[0.68rem] text-terracotta hover:underline font-semibold"
                            title={`${p.reviewsCount} verified customer reviews`}
                          >
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                            <span className="font-bold text-foreground">{p.rating}</span>
                            <span className="text-muted-foreground text-[0.62rem]">
                              ({p.reviewsCount})
                            </span>
                          </button>
                        </div>

                        {/* Title & Description */}
                        <h3 className="mt-2.5 font-serif text-2xl text-maroon font-semibold group-hover:text-terracotta transition-colors line-clamp-1">
                          {p.name}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {p.note}
                        </p>
                      </div>

                      {/* Quantity Tier Selector & Pricing */}
                      <div className="mt-5 pt-4 border-t border-border/60 space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-[0.65rem] text-muted-foreground mb-1.5">
                            <span className="uppercase tracking-wider font-bold text-foreground">
                              Choose Quantity:
                            </span>
                            {pricing.discountPercent > 0 && (
                              <span className="text-terracotta font-bold">
                                {pricing.discountPercent}% Tier Discount Applied
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-5 gap-1 text-[0.65rem]">
                            {QUANTITY_TIERS.map((tier) => (
                              <button
                                key={tier.count}
                                type="button"
                                onClick={() => setProductTier(p.id, tier.count)}
                                className={`py-1 rounded-xs border text-center transition-all ${
                                  currentTier === tier.count
                                    ? "bg-maroon text-ivory border-maroon font-bold shadow-xs"
                                    : "bg-secondary/70 border-border text-foreground/80 hover:border-maroon/40"
                                }`}
                              >
                                {tier.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Live Price Display */}
                        <div className="flex items-baseline justify-between pt-0.5">
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-serif font-bold text-foreground">
                                {formatPrice(pricing.totalPrice)}
                              </span>
                              {currentTier > 1 && (
                                <span className="text-xs text-muted-foreground line-through">
                                  {formatPrice(p.basePrice * currentTier)}
                                </span>
                              )}
                            </div>
                            <p className="text-[0.62rem] text-muted-foreground">
                              {currentTier === 1
                                ? "Single piece sample price"
                                : `${formatPrice(pricing.unitPrice)}/pc · Batch of ${currentTier} pcs`}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => addToCart(p)}
                            className="flex items-center justify-center gap-1.5 bg-maroon px-3 py-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-ivory font-bold transition-colors hover:bg-terracotta rounded-xs shadow-xs active:scale-95"
                          >
                            <ShoppingBag className="h-3.5 w-3.5" />
                            Add {currentTier} pc{currentTier > 1 ? "s" : ""}
                          </button>
                          <button
                            type="button"
                            onClick={() => setQuickViewProduct(p)}
                            className="flex items-center justify-center gap-1.5 border border-maroon px-3 py-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-maroon font-bold transition-colors hover:bg-maroon hover:text-ivory rounded-xs bg-background"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            Specs &amp; 100+
                          </button>
                        </div>

                        {/* Direct WhatsApp Enquiry Link */}
                        <a
                          href={wa(
                            `Hello Jai Fabrication, I would like to enquire about ordering ${currentTier} pc(s) of the ${p.name} (Total: ${formatPrice(pricing.totalPrice)}).`,
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-terracotta pt-1"
                        >
                          <MessageCircle className="h-3.5 w-3.5 text-terracotta" />
                          WhatsApp enquiry
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>

        {/* Custom Orders & Bulk Studio Configurator */}
        <section
          id="custom"
          className="relative overflow-hidden py-16 text-ivory lg:py-24"
          style={{ backgroundImage: "var(--gradient-maroon)" }}
          aria-labelledby="custom-title"
        >
          <div aria-hidden="true" className="motif-field pointer-events-none absolute inset-0 opacity-25" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
              <div>
                <p className="rule-eyebrow text-ivory/80">Bespoke Workshop Atelier</p>
                <h2 id="custom-title" className="mt-3 font-serif text-4xl leading-tight sm:text-5xl font-semibold">
                  Your motif, your palette, your occasion.
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-ivory/90">
                  Every piece is dyed, stamped, and stitched by master artisans in our Jaipur
                  workshop. Configure your order requirements below for an instant WhatsApp estimate.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      title: "Custom Monograms & Couple Labels",
                      desc: "Personalized embroidered or woven couple monogram tags for weddings and events.",
                    },
                    {
                      title: "Bespoke Botanical Colorways",
                      desc: "Colour matched to your wedding decor, brand identity, or invitation palette.",
                    },
                    {
                      title: "Express 3-Day Turnaround",
                      desc: "Direct workshop production with rapid domestic and global express dispatch.",
                    },
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-sm text-ivory">{feat.title}</h3>
                        <p className="text-xs text-ivory/75 mt-0.5">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Atelier Configurator Card */}
              <div className="rounded-md bg-ivory text-foreground p-6 sm:p-8 shadow-2xl border border-ivory/20">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <span className="text-[0.65rem] uppercase tracking-[0.2em] font-bold text-terracotta">
                      Live Order Estimator
                    </span>
                    <h3 className="font-serif text-2xl text-maroon font-bold">
                      Bespoke Batch Configurator
                    </h3>
                  </div>
                  <Sliders className="h-5 w-5 text-maroon/60" />
                </div>

                <div className="mt-6 space-y-5 text-xs">
                  {/* Step 1: Occasion */}
                  <div>
                    <label className="block font-bold text-maroon uppercase tracking-wider mb-2">
                      1. Select Occasion or Project Type:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Wedding & Mehendi Favours",
                        "Corporate & Event Gifting",
                        "Boutique & Retail Resale",
                        "Bespoke Personal Projects",
                      ].map((occ) => (
                        <button
                          key={occ}
                          type="button"
                          onClick={() => setAtelierOccasion(occ)}
                          className={`p-2.5 text-left rounded-sm border transition-all ${
                            atelierOccasion === occ
                              ? "bg-maroon text-ivory border-maroon font-bold shadow-xs"
                              : "bg-secondary/50 border-border text-foreground/80 hover:border-maroon/40"
                          }`}
                        >
                          {occ}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Silhouette */}
                  <div>
                    <label className="block font-bold text-maroon uppercase tracking-wider mb-2">
                      2. Select Bag Silhouette:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Handmade Cotton Tote Bags",
                        "Quilted Zipper Pouches",
                        "Artisan Travel Duffle Bags",
                        "Crossbody Slings & Organizers",
                        "Mixed Bundle / Assorted Set",
                      ].map((sil) => (
                        <button
                          key={sil}
                          type="button"
                          onClick={() => setAtelierSilhouette(sil)}
                          className={`p-2.5 text-left rounded-sm border transition-all ${
                            atelierSilhouette === sil
                              ? "bg-maroon text-ivory border-maroon font-bold shadow-xs"
                              : "bg-secondary/50 border-border text-foreground/80 hover:border-maroon/40"
                          }`}
                        >
                          {sil}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Quantity Tier */}
                  <div>
                    <label className="block font-bold text-maroon uppercase tracking-wider mb-2">
                      3. Select Quantity Tier:
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { tier: "25 – 50 pcs", label: "Intimate" },
                        { tier: "51 – 150 pcs", label: "Weddings" },
                        { tier: "151 – 500 pcs", label: "Corporate" },
                        { tier: "500+ pcs", label: "Wholesale" },
                      ].map((t) => (
                        <button
                          key={t.tier}
                          type="button"
                          onClick={() => setAtelierTier(t.tier)}
                          className={`p-2 text-center rounded-sm border transition-all ${
                            atelierTier === t.tier
                              ? "bg-maroon text-ivory border-maroon font-bold shadow-xs"
                              : "bg-secondary/50 border-border text-foreground/80 hover:border-maroon/40"
                          }`}
                        >
                          <span className="block font-bold text-[0.7rem]">{t.tier}</span>
                          <span className="text-[0.6rem] opacity-75">{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 4: Add-ons */}
                  <div className="pt-2 border-t border-border/70 space-y-2">
                    <label className="block font-bold text-maroon uppercase tracking-wider">
                      4. Customization Preferences:
                    </label>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={atelierMonogram}
                          onChange={(e) => setAtelierMonogram(e.target.checked)}
                          className="rounded-xs text-maroon focus:ring-terracotta"
                        />
                        <span className="text-foreground/90">
                          Custom Brand / Couple Monogram Label Tag (+{formatPrice(35)}/pc)
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={atelierGiftBox}
                          onChange={(e) => setAtelierGiftBox(e.target.checked)}
                          className="rounded-xs text-maroon focus:ring-terracotta"
                        />
                        <span className="text-foreground/90">
                          Handmade Artisan Gift Box Packaging (+{formatPrice(60)}/pc)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Estimate Result Bar */}
                <div className="mt-6 rounded-sm bg-sandstone/30 p-4 border border-maroon/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground font-bold">
                      Direct Jaipur Workshop Estimate:
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-bold text-maroon">
                        ~{formatPrice(atelierEstimate.unitPrice)}
                        <span className="text-xs font-sans font-normal text-muted-foreground">
                          /pc
                        </span>
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        (Total: ~{formatPrice(atelierEstimate.total)})
                      </span>
                    </div>
                  </div>

                  <a
                    href={getAtelierWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-maroon px-5 py-3 text-xs uppercase tracking-wider text-ivory font-bold rounded-sm shadow-md hover:bg-terracotta transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 text-gold" />
                    <span>Enquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lookbook & Craft Journey */}
        <section id="lookbook" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <p className="rule-eyebrow">Artisan Heritage Lookbook</p>
            <h2 className="mt-3 font-serif text-4xl text-maroon sm:text-5xl font-semibold">
              The 4-Step Journey of the Block
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground">
              Explore the timeless process of traditional Rajasthani woodblock artistry — from
              hand-chiselled teak blocks to sunlit courtyard solar drying.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "Step 01",
                title: "Hand Carving the Teak Blocks",
                desc: "Every block begins with seasoned Sheesham or Teak wood. Master carvers, known as 'Batikars', use miniature steel chisels to carve intricate floral motifs entirely by hand.",
                image: siteAssets.craftCarving,
              },
              {
                step: "Step 02",
                title: "Botanical Dyes & Pigments",
                desc: "Our distinct palette of Sandstone Pink, Terracotta, Indigo, and Marigold Yellow is mixed by master colorists ('Rangrez') using azo-free, skin-friendly pigments.",
                image: siteAssets.craftDyeing,
              },
              {
                step: "Step 03",
                title: "Rhythmic Table Stamping",
                desc: "Stretched tightly across 12-meter printing tables, cotton is stamped section by section. The artisan strikes the block with pinpoint visual registration.",
                image: siteAssets.craftStamping,
              },
              {
                step: "Step 04",
                title: "Sun-Curing in Courtyards",
                desc: "Fabrics are hung across open-air bamboo terraces under Rajasthan's golden sun to solar-cure the pigments before diamond quilting and brass assembly.",
                image: siteAssets.craftCuring,
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="group flex flex-col rounded-sm border border-border bg-card overflow-hidden shadow-xs hover:shadow-md transition-all"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                  <AssetImage
                    src={card.image}
                    alt={card.title}
                    placeholderLabel={card.title}
                    className="h-full w-full object-cover"
                    imgClassName="transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-maroon text-ivory text-[0.6rem] uppercase tracking-widest px-2.5 py-1 font-bold rounded-xs shadow-xs">
                    {card.step}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-maroon">{card.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Commercial & Workshop Reels Section */}
        <section
          id="craft-videos"
          className="bg-secondary/45 py-16 lg:py-24 border-t border-border/70"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="rule-eyebrow">Workshop Reels &amp; Cinema Ads</p>
              <h2 className="mt-3 font-serif text-4xl text-maroon sm:text-5xl font-semibold">
                Jaipur Heritage in Motion
              </h2>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground">
                Experience our signature commercial cinema ad and social video reel campaigns
                filmed inside our Ramnagar atelier.
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {/* Cinema Ad Card */}
              <div className="rounded-md border border-border bg-card p-5 sm:p-6 shadow-md flex flex-col justify-between">
                <div>
                  <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-maroon">
                    <AssetImage
                      src={siteAssets.luxuryVideoAdPoster}
                      alt="Cinema commercial ad showing master Jaipur artisan"
                      placeholderLabel="Cinema Commercial Ad"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-maroon/30 flex items-center justify-center">
                      <a
                        href={CUSTOM_WA}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid h-14 w-14 place-items-center rounded-full bg-ivory text-maroon shadow-2xl hover:scale-110 transition-transform"
                        aria-label="Play commercial documentary ad"
                      >
                        <Play className="h-6 w-6 fill-maroon ml-1" />
                      </a>
                    </div>
                  </div>
                  <span className="mt-4 inline-block text-[0.62rem] uppercase tracking-[0.2em] text-terracotta font-bold">
                    Documentary Series · Episode 01
                  </span>
                  <h3 className="font-serif text-2xl text-maroon font-bold mt-1">
                    The Master Carver of Ramnagar
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Featuring Master Artisan Ramprasad Ji chiselling teak wood and stamping intricate
                    chrysanthemum flowers repeat by repeat.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">
                    Direct From Atelier · No Middlemen
                  </span>
                  <a
                    href={CUSTOM_WA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-maroon font-bold hover:text-terracotta"
                  >
                    <span>Order on WhatsApp</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Instagram Reel Ad Card */}
              <div className="rounded-md border border-border bg-card p-5 sm:p-6 shadow-md flex flex-col justify-between">
                <div>
                  <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-maroon">
                    <AssetImage
                      src={siteAssets.jaipurReelAdPoster}
                      alt="Social media video reel ad"
                      placeholderLabel="Instagram Reel Campaign"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-maroon/30 flex items-center justify-center">
                      <a
                        href="https://instagram.com/jaifabrication"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid h-14 w-14 place-items-center rounded-full bg-ivory text-maroon shadow-2xl hover:scale-110 transition-transform"
                        aria-label="View Instagram Reel"
                      >
                        <Instagram className="h-6 w-6 text-maroon" />
                      </a>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[0.62rem] uppercase tracking-[0.2em] text-terracotta font-bold">
                      @jaifabrication · Sponsored Reel
                    </span>
                    <a
                      href="https://instagram.com/jaifabrication"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-maroon underline font-bold"
                    >
                      Follow
                    </a>
                  </div>
                  <h3 className="font-serif text-2xl text-maroon font-bold mt-1">
                    Pink City Sunsets &amp; Pure Cotton Travels 🌸
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Watch our Mughal Botanical Quilted Duffle and Lavender Vanity Pouch packed for a
                    weekend getaway. 100% cotton, lightweight &amp; roomy.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">
                    Pan-India &amp; Global Shipping
                  </span>
                  <a
                    href="#shop"
                    className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-maroon font-bold hover:text-terracotta"
                  >
                    <span>Shop The Reel Edit</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Client Reflections / Testimonials */}
        <section
          id="testimonials"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        >
          <div className="text-center max-w-2xl mx-auto">
            <p className="rule-eyebrow">Client Reflections</p>
            <h2 className="mt-3 font-serif text-4xl text-maroon sm:text-5xl font-semibold">
              Loved by Wedding Couples &amp; Curators
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground">
              Real feedback from wedding planners, brides, and boutique owners across the world.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((rev, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-sm border border-border bg-card p-6 shadow-xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-foreground/85 italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/70">
                  <p className="font-serif text-base font-bold text-maroon">{rev.name}</p>
                  <p className="text-[0.65rem] text-muted-foreground uppercase tracking-wider">
                    {rev.role} · {rev.city}
                  </p>
                  <span className="mt-2 inline-block text-[0.62rem] text-terracotta font-semibold bg-sandstone/30 px-2 py-0.5 rounded-xs">
                    Ordered: {rev.order}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="bg-secondary/45 py-16 lg:py-24 border-t border-border/70">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
            <div>
              <p className="rule-eyebrow">Good to know</p>
              <h2 className="mt-3 font-serif text-4xl text-maroon sm:text-5xl font-semibold">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                Everything you need to know about ordering, artisan craftsmanship, wedding favours,
                monogramming, and international shipping.
              </p>

              <div className="mt-8 rounded-sm bg-sandstone/30 p-5 border border-maroon/20">
                <p className="font-serif text-lg font-bold text-maroon">
                  Have a bespoke question?
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Our Jaipur workshop team is available on WhatsApp daily from 10 AM to 6 PM IST.
                </p>
                <a
                  href={CUSTOM_WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 bg-maroon px-4 py-2.5 text-xs uppercase tracking-wider text-ivory font-bold rounded-xs shadow-xs hover:bg-terracotta"
                >
                  <MessageCircle className="h-4 w-4 text-gold" />
                  <span>Ask us on WhatsApp</span>
                </a>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`faq-${i}`}
                  className="rounded-sm border border-border bg-card px-4 py-1 shadow-2xs"
                >
                  <AccordionTrigger className="text-left font-serif text-lg text-maroon hover:no-underline font-semibold py-3">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm leading-relaxed text-muted-foreground pb-4">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      {/* Workshop Location & Footer */}
      <footer id="contact" className="border-t border-border bg-background py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full ring-1 ring-maroon/30">
                <img src={siteAssets.logo} alt="Jai Fabrication" className="h-full w-full object-cover" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-maroon block leading-tight">
                  Jai Fabrication
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground font-semibold">
                  Jaipur · Hand Block Craft
                </span>
              </div>
            </div>

            <p className="mt-5 max-w-xs text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Handmade 100% pure cotton block-print tote bags, duffles, vanity pouches, and custom
              wedding favours, crafted by master artisans in Jaipur, Rajasthan.
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground font-medium">
              <ShieldCheck className="h-4 w-4 text-terracotta" />
              <span>100% Cotton Authenticity Guaranteed</span>
            </div>
          </div>

          <address className="not-italic">
            <h2 className="font-serif text-xl font-bold text-maroon">Visit the Workshop</h2>
            <p className="mt-4 flex gap-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
              <span>
                23, Hawa Sadak Rd, Brij Colony, Hawa Sadak, Ramnagar Extension, Ramnagar, Jaipur,
                Rajasthan 302019, India
              </span>
            </p>
            <p className="mt-3 flex gap-3 text-xs sm:text-sm text-muted-foreground">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
              <span>Monday – Sunday · 10:00 AM – 6:00 PM IST</span>
            </p>
            <a
              href="https://maps.google.com/?q=23,+Hawa+Sadak+Rd,+Jaipur,+Rajasthan"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-maroon font-bold hover:text-terracotta"
            >
              <span>Get Directions on Google Maps</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </address>

          <div>
            <h2 className="font-serif text-xl font-bold text-maroon">Get in Touch</h2>
            <ul className="mt-4 space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href={CUSTOM_WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-foreground hover:text-terracotta font-medium transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-terracotta" />
                  <span>WhatsApp: +91 9521922366</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919521922366"
                  className="inline-flex items-center gap-2.5 text-foreground hover:text-terracotta font-medium transition-colors"
                >
                  <PhoneCall className="h-4 w-4 text-terracotta" />
                  <span>Call: +91 9521922366</span>
                </a>
              </li>
            </ul>

            <a
              href="https://instagram.com/jaifabrication"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2.5 border border-maroon/25 bg-secondary px-4 py-2.5 text-xs font-bold text-maroon transition-colors hover:bg-terracotta hover:text-ivory rounded-xs"
            >
              <Instagram className="h-4 w-4" />
              <span>Follow @jaifabrication on Instagram</span>
            </a>

            <p className="mt-5 text-xs text-muted-foreground">
              Worldwide shipping via FedEx/DHL. Defective or transit damaged items can be reported
              within 3 days of delivery.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="hairline pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground font-medium">
            <p>© {new Date().getFullYear()} Jai Fabrication · Jaipur, Rajasthan, India</p>
            <p>Handmade with Love &amp; Wooden Blocks</p>
          </div>
        </div>
      </footer>

      {/* Floating Artisan AI Assistant Button (Bottom Left) */}
      <div className="fixed bottom-5 left-5 z-50">
        <button
          type="button"
          onClick={() => setAiAssistantOpen((v) => !v)}
          className="group relative flex items-center gap-2.5 rounded-full bg-maroon px-4 py-3 text-xs uppercase tracking-wider text-ivory shadow-2xl transition-all hover:bg-terracotta hover:scale-105 active:scale-95 border-2 border-ivory/20"
          aria-label="Open Artisan AI Help Concierge"
        >
          <div className="relative">
            <Bot className="h-5 w-5 text-gold" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-terracotta" />
            </span>
          </div>
          <span className="hidden sm:inline font-bold">Artisan AI Help</span>
        </button>
      </div>

      {/* Floating WhatsApp Action Button (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-50">
        <a
          href={CUSTOM_WA}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 rounded-full bg-maroon px-4 py-3 text-xs uppercase tracking-wider text-ivory shadow-2xl transition-all hover:bg-terracotta hover:scale-105 active:scale-95 border-2 border-ivory/20 font-bold"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-5 w-5 text-gold" />
          <span className="hidden sm:inline">WhatsApp us</span>
        </a>
      </div>

      {/* Slide-over Enquiry Bag Drawer */}
      {bagOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-card h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="h-5 w-5 text-maroon" />
                  <h3 className="font-serif text-2xl text-maroon font-bold">Your Enquiry Bag</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setBagOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-16 text-center">
                  <ShoppingBag className="h-12 w-12 text-maroon/30 mx-auto" />
                  <p className="font-serif text-xl text-maroon mt-4 font-bold">
                    Your enquiry bag is empty
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Select quantities from any bag in the catalog to prepare your instant WhatsApp order proposal.
                  </p>
                  <button
                    type="button"
                    onClick={() => setBagOpen(false)}
                    className="mt-6 bg-maroon px-5 py-2.5 text-xs uppercase tracking-wider text-ivory font-bold rounded-xs hover:bg-terracotta"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                <ul className="mt-6 divide-y divide-border">
                  {cart.map((item, idx) => (
                    <li key={idx} className="py-4 flex gap-3.5 items-start">
                      <img
                        src={item.product.asset}
                        alt={item.product.name}
                        className="h-16 w-14 object-cover rounded-xs border border-border"
                      />
                      <div className="flex-1">
                        <h4 className="font-serif text-base font-bold text-maroon leading-tight">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Quantity: <strong className="text-foreground">{item.tierCount} pcs</strong>
                        </p>
                        <p className="text-xs font-bold text-foreground mt-1">
                          {formatPrice(item.totalPrice)}
                          <span className="text-[0.65rem] font-normal text-muted-foreground ml-1.5">
                            ({formatPrice(item.unitPrice)}/pc)
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(idx)}
                        className="text-muted-foreground hover:text-destructive p-1"
                        title="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-border pt-4 mt-6 space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Total Pieces:</span>
                    <span className="font-bold text-foreground">{totalItemCount} pcs</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-maroon pt-2 border-t border-border/60">
                    <span>Estimated Total:</span>
                    <span>{formatPrice(cartTotalAmount)}</span>
                  </div>
                  <p className="text-[0.62rem] text-muted-foreground">
                    *Taxes &amp; final shipping quote confirmed directly on WhatsApp.
                  </p>
                </div>

                <a
                  href={getCartWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-maroon py-3.5 text-xs uppercase tracking-wider text-ivory font-bold rounded-xs shadow-lg hover:bg-terracotta transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-gold" />
                  <span>Send Enquiry to WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setCart([]);
                    showToast("Enquiry bag cleared.");
                  }}
                  className="w-full text-center text-xs text-muted-foreground hover:text-foreground py-1"
                >
                  Clear Bag
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick View / Specs Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl bg-card rounded-md shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-border">
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-6 sm:grid-cols-[0.9fr_1.1fr] sm:items-start">
              <div className="relative arch aspect-[4/5] w-full overflow-hidden bg-secondary">
                <AssetImage
                  src={quickViewProduct.asset}
                  alt={quickViewProduct.name}
                  placeholderLabel={quickViewProduct.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[0.62rem] uppercase tracking-[0.2em] text-terracotta font-bold">
                    {quickViewProduct.category}
                  </span>
                  <h3 className="font-serif text-2xl text-maroon font-bold mt-1">
                    {quickViewProduct.name}
                  </h3>
                  <div className="flex items-center gap-1 text-amber-500 mt-1">
                    <Star className="h-4 w-4 fill-amber-500" />
                    <span className="font-bold text-xs text-foreground">
                      {quickViewProduct.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({quickViewProduct.reviewsCount} customer reviews)
                    </span>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-muted-foreground">
                  {quickViewProduct.note}
                </p>

                <div className="space-y-2 text-xs border-t border-b border-border py-3">
                  <p>
                    <strong className="text-foreground">Dimensions:</strong>{" "}
                    <span className="text-muted-foreground">{quickViewProduct.dimensions}</span>
                  </p>
                  <p>
                    <strong className="text-foreground">Fabric &amp; Hardware:</strong>{" "}
                    <span className="text-muted-foreground">{quickViewProduct.fabric}</span>
                  </p>
                  <p>
                    <strong className="text-foreground">Customization:</strong>{" "}
                    <span className="text-muted-foreground">
                      Available with couple monogram tags &amp; gift boxes (MOQ 25 pcs).
                    </span>
                  </p>
                </div>

                <div className="pt-2">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-serif text-2xl font-bold text-maroon">
                      {formatPrice(quickViewProduct.basePrice)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Single piece sample price (Bulk discounts up to 35%)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        addToCart(quickViewProduct);
                        setQuickViewProduct(null);
                        setBagOpen(true);
                      }}
                      className="flex items-center justify-center gap-2 bg-maroon py-3 text-xs uppercase tracking-wider text-ivory font-bold rounded-xs hover:bg-terracotta"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Add to Bag
                    </button>
                    <a
                      href={wa(
                        `Hello Jai Fabrication, I would like to order/enquire about the ${quickViewProduct.name}.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 border border-maroon py-3 text-xs uppercase tracking-wider text-maroon font-bold rounded-xs hover:bg-maroon hover:text-ivory"
                    >
                      <MessageCircle className="h-4 w-4 text-gold" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Artisan AI Assistant Drawer */}
      {aiAssistantOpen && (
        <div className="fixed inset-0 z-50 flex justify-start bg-black/50 backdrop-blur-xs animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-card h-full shadow-2xl flex flex-col justify-between p-5 overflow-hidden animate-in slide-in-from-left duration-300 border-r border-border">
            <div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-maroon text-ivory">
                    <Bot className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-maroon">
                      Artisan AI Concierge
                    </h3>
                    <p className="text-[0.62rem] uppercase tracking-wider text-terracotta font-bold">
                      Direct Atelier Support
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAiAssistantOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Quick Prompt Chips */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {[
                  "What is Minimum Order (MOQ)?",
                  "Wedding Favours & Monograms",
                  "Shipping & Delivery Times",
                  "Washing & Fabric Care",
                  "Request Fabric Swatches",
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleAiSend(chip)}
                    className="text-[0.65rem] bg-secondary px-2.5 py-1 rounded-full border border-border text-maroon font-semibold hover:bg-maroon hover:text-ivory transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Chat Thread */}
              <div className="mt-4 space-y-3 max-h-[50vh] overflow-y-auto pr-1 text-xs">
                {aiChat.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-maroon text-ivory ml-6 font-medium"
                        : "bg-secondary/70 text-foreground mr-6 border border-border/80"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="border-t border-border pt-3 space-y-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAiSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask about custom bags, MOQ, fabrics..."
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  className="flex-1 rounded-sm border border-border bg-background py-2.5 px-3 text-xs text-foreground focus:border-terracotta focus:outline-none"
                />
                <button
                  type="submit"
                  className="grid h-9 w-9 place-items-center rounded-sm bg-maroon text-ivory hover:bg-terracotta transition-colors"
                >
                  <Send className="h-4 w-4 text-gold" />
                </button>
              </form>

              <a
                href={CUSTOM_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 w-full text-center text-[0.68rem] uppercase tracking-wider text-maroon font-bold py-1 hover:text-terracotta"
              >
                <MessageCircle className="h-3.5 w-3.5 text-terracotta" />
                <span>Escalate directly to Human Master on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
