import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Menu,
  X,
  MessageCircle,
  Instagram,
  MapPin,
  Clock,
  ShoppingBag,
  Search,
  Eye,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Filter,
} from "lucide-react";

import { AssetImage } from "@/components/AssetImage";
import { siteAssets } from "@/lib/site-assets";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCart, WA_BASE_PHONE } from "@/lib/cart-context";
import { PRODUCTS_DATA, CATEGORIES, Product, calculateTierPrice } from "@/lib/products-data";
import { getProductReviewsAndQA } from "@/lib/product-reviews";
import { CartDrawer } from "@/components/CartDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { CustomOrderBuilder } from "@/components/CustomOrderBuilder";
import { CraftLookbook } from "@/components/CraftLookbook";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ArtisanChatBot } from "@/components/ArtisanChatBot";

const WA_BASE = `https://wa.me/${WA_BASE_PHONE}`;
const wa = (message: string) => `${WA_BASE}?text=${encodeURIComponent(message)}`;

const CUSTOM_WA = wa(
  "Hello Jai Fabrication, I would like to enquire about custom & bulk orders of handmade block-print bags."
);

const NAV = [
  { label: "Shop", href: "#shop" },
  { label: "Our Craft", href: "#craft" },
  { label: "Custom Orders", href: "#custom" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const FAQS = [
  {
    q: "Do you ship worldwide?",
    a: "Yes! We ship across India (2–5 business days) and internationally to the US, UK, Europe, Australia, and UAE via DHL/FedEx. Shipping rates and delivery timelines are confirmed directly on WhatsApp based on your destination postal code.",
  },
  {
    q: "How do I place an order?",
    a: "You can add items to your Enquiry Bag on this website and click 'Send Order Enquiry on WhatsApp', or message us directly on WhatsApp (+91 9521922366). We confirm availability, take your delivery address, and share payment details (UPI, Google Pay, PhonePe, NEFT/IMPS, or International Wire).",
  },
  {
    q: "What fabric and dyes do you use?",
    a: "Every piece is crafted in 100% natural, premium cotton canvas or cotton voile. We use skin-friendly, azo-free pigments and traditional Bagru/Sanganeri natural dyes that age beautifully with care.",
  },
  {
    q: "Do you take custom or bulk orders for weddings and corporate gifting?",
    a: "Yes, bulk and bespoke orders are our specialty! We offer custom block carving (couple monograms, brand logos, custom florals), personalized colour palettes, custom sizing, and gift packaging. Minimum lead time starts from just 3 days.",
  },
  {
    q: "What is your production timeline?",
    a: "Ready-stock catalog items are dispatched within 24–48 hours. Custom printed and bulk batches (25–500+ pcs) require a minimum of 3 to 10 working days depending on quantity and block carving complexity.",
  },
  {
    q: "What is your return & exchange policy?",
    a: "Because our pieces are handmade with artisan care, slight variations in print registration and dye depth are authentic hallmarks of genuine hand block printing. In the rare event of a manufacturing defect or transit damage, please report it on WhatsApp within 3 days of delivery for a swift replacement.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jai Fabrication | Handmade Block Print Bags from Jaipur" },
      {
        name: "description",
        content:
          "Shop handmade 100% cotton block-print tote bags, duffle bags, pouches and slings by Jai Fabrication, crafted by master artisans in Jaipur, Rajasthan.",
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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Jai Fabrication",
          image: "https://jai-fabrication.lovable.app/favicon.png",
          description:
            "Handmade 100% cotton block-print tote bags, duffle bags, slings and pouches, crafted in Jaipur.",
          telephone: "+91 9521922366",
          priceRange: "₹649 - ₹4,999",
          openingHours: "Mo-Su 10:00-18:00",
          address: {
            "@type": "PostalAddress",
            streetAddress:
              "23, Hawa Sadak Rd, Brij Colony, Hawa Sadak, Ramnagar Extension, Ramnagar",
            addressLocality: "Jaipur",
            addressRegion: "Rajasthan",
            postalCode: "302019",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Logo() {
  return (
    <a
      href="#top"
      className="flex min-w-0 items-center gap-3 group"
      aria-label="Jai Fabrication — home"
    >
      {siteAssets.logo ? (
        <img
          src={siteAssets.logo}
          alt="Jai Fabrication logo"
          className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-maroon/30 transition-transform group-hover:scale-105"
        />
      ) : (
        <span
          aria-hidden="true"
          className="motif-field grid h-11 w-11 shrink-0 place-items-center rounded-full border border-maroon/25 bg-secondary font-serif text-sm text-maroon shadow-xs"
        >
          JF
        </span>
      )}
      <span className="min-w-0">
        <span className="block truncate font-serif text-xl leading-none text-maroon font-semibold">
          Jai Fabrication
        </span>
        <span className="mt-1 block truncate text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground font-medium">
          Jaipur · Hand Block Craft
        </span>
      </span>
    </a>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { totalItems, setIsCartOpen, addToCart } = useCart();

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => {
      const matchesCategory =
        activeCategory === "all" || p.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div id="top" className="min-h-screen bg-background text-foreground selection:bg-terracotta/25">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-maroon focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>

      {/* Cart Drawer, Quick View Modal & AI Chatbot */}
      <CartDrawer />
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
      <ArtisanChatBot />

      {/* Top Banner Notice */}
      <div className="bg-maroon px-4 py-2 text-center text-[0.68rem] uppercase tracking-[0.22em] text-ivory/95 font-medium border-b border-maroon/30">
        <span className="hidden sm:inline">🌸 Authentic Jaipur Hand-Block Cotton Bags · </span>
        <span>Wedding Favours &amp; Corporate Gifting from 3 Days · Pan-India &amp; Worldwide Shipping</span>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md transition-all shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-10">
          <Logo />

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[0.76rem] uppercase tracking-[0.18em] text-foreground/85 transition-colors hover:text-terracotta font-medium"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Bag / Cart Trigger Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 border border-maroon/25 bg-secondary/70 px-3.5 py-2.5 text-[0.72rem] uppercase tracking-[0.16em] text-maroon transition-all hover:bg-maroon hover:text-ivory rounded-sm"
              aria-label={`Open Enquiry Bag with ${totalItems} items`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline font-semibold">Enquiry Bag</span>
              {totalItems > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-terracotta px-1 text-[0.65rem] font-bold text-ivory">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Action */}
            <a
              href={CUSTOM_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden shrink-0 items-center gap-2 bg-maroon px-4 py-2.5 text-[0.72rem] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-terracotta sm:inline-flex rounded-sm font-medium"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-border text-maroon lg:hidden rounded-sm"
            >
              <span className="sr-only">
                {menuOpen ? "Close menu" : "Open menu"}
              </span>
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {menuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="border-t border-border bg-background lg:hidden shadow-xl"
          >
            <ul className="mx-auto max-w-7xl px-5 py-4 space-y-1">
              {NAV.map((item) => (
                <li key={item.href} className="border-b border-border/50 last:border-0">
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-sm uppercase tracking-[0.16em] text-foreground/90 font-medium"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 border border-maroon bg-secondary/80 py-3 text-xs uppercase tracking-[0.18em] text-maroon font-semibold"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Bag ({totalItems})
                </button>
                <a
                  href={CUSTOM_WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-maroon py-3 text-xs uppercase tracking-[0.18em] text-ivory font-semibold"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <main id="main">
        {/* Hero Section */}
        <section
          className="relative overflow-hidden"
          style={{ backgroundImage: "var(--gradient-sandstone)" }}
          aria-labelledby="hero-title"
        >
          <div
            aria-hidden="true"
            className="motif-field pointer-events-none absolute inset-0 opacity-35"
          />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16 lg:px-10 lg:pb-28 lg:pt-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-maroon/20 bg-background/80 px-3.5 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-maroon font-semibold mb-4 backdrop-blur-xs">
                <Sparkles className="h-3.5 w-3.5 text-terracotta" />
                Handcrafted in Jaipur · 100% Pure Cotton
              </div>

              <h1
                id="hero-title"
                className="mt-2 font-serif text-[2.8rem] leading-[1.05] text-maroon sm:text-6xl lg:text-7xl font-medium"
              >
                Carry a piece of the Pink City.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
                Hand-block printed cotton bags with colourful character, made
                for everyday journeys, conscious luxury, and meaningful gifting.
                Direct from our artisan printing tables in Jaipur.
              </p>

              {/* CTAs */}
              <div className="mt-9 grid gap-3 sm:grid-cols-2 sm:gap-4 max-w-md">
                <a
                  href="#shop"
                  className="inline-flex items-center justify-center gap-2 bg-maroon px-6 py-4 text-[0.75rem] uppercase tracking-[0.2em] text-ivory transition-all hover:bg-terracotta shadow-md font-semibold"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#custom"
                  className="inline-flex items-center justify-center border border-maroon px-6 py-4 text-[0.75rem] uppercase tracking-[0.2em] text-maroon transition-all hover:bg-maroon hover:text-ivory font-semibold"
                >
                  Custom &amp; Bulk Orders
                </a>
              </div>

              {/* Highlights strip */}
              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground font-medium pt-4 border-t border-maroon/15">
                <span>Wedding Favours</span>
                <span className="text-terracotta">·</span>
                <span>Corporate Gifting</span>
                <span className="text-terracotta">·</span>
                <span>Custom Prints</span>
                <span className="text-terracotta">·</span>
                <span>From 3 Days</span>
              </div>
            </div>

            {/* Right Column: Hero Image Frame */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3.5 hidden border border-maroon/25 lg:block"
                style={{ borderRadius: "14rem 14rem 6px 6px" }}
              />
              <div className="relative overflow-hidden arch-soft aspect-[4/5] w-full shadow-[var(--shadow-lift)] bg-secondary">
                <AssetImage
                  src={siteAssets.hero}
                  alt="Colourful Jaipur courtyard with handmade block-print bags"
                  placeholderLabel="Hero — Jaipur courtyard bag image"
                  loading="eager"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Floating Artisan Badge */}
                <div className="absolute bottom-5 left-5 right-5 rounded-sm bg-background/90 p-3.5 backdrop-blur-md border border-border/80 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[0.62rem] uppercase tracking-[0.2em] text-terracotta font-semibold">
                        Jaipur Atelier
                      </p>
                      <p className="font-serif text-sm font-semibold text-maroon">
                        100% Teak Woodblock Craft
                      </p>
                    </div>
                    <a
                      href="#lookbook"
                      className="text-[0.65rem] uppercase tracking-wider text-maroon font-bold underline underline-offset-2 hover:text-terracotta"
                    >
                      Lookbook →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story / Craft Process */}
        <section id="craft" className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:items-center">
            <div>
              <p className="rule-eyebrow">The Jai Story</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-maroon sm:text-5xl">
                Crafted in colour. Rooted in Jaipur.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground/80">
                Inspired by the Pink City’s warm sandstone facades and timeless
                craft traditions, every Jai Fabrication piece is made in 100%
                cotton with handmade block-print character.
              </p>
              <div className="mt-8 flex items-center gap-6">
                <div>
                  <p className="font-serif text-3xl font-bold text-maroon">5+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                    Generations of Craft
                  </p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="font-serif text-3xl font-bold text-maroon">100%</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                    Natural Pure Cotton
                  </p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="font-serif text-3xl font-bold text-maroon">0%</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                    Machine Synthetics
                  </p>
                </div>
              </div>
            </div>

            <ol className="grid gap-px bg-border sm:grid-cols-2 shadow-xs">
              {[
                {
                  step: "01",
                  title: "Carving the block",
                  body: "Teak blocks are hand-carved into motifs drawn from Jaipur’s jali screens and garden florals.",
                },
                {
                  step: "02",
                  title: "Natural cotton",
                  body: "Only 100% pure cotton canvas and voile is prepared, washed and stretched across the printing table.",
                },
                {
                  step: "03",
                  title: "Printing by hand",
                  body: "Colour is laid repeat by repeat — the gentle irregularity is the signature mark of the maker.",
                },
                {
                  step: "04",
                  title: "Cut, quilt, finish",
                  body: "Panels are reinforced, diamond quilted and hand-finished in our Hawa Sadak workshop.",
                },
              ].map((s) => (
                <li key={s.step} className="bg-background p-7 lg:p-8 transition-colors hover:bg-sandstone/15">
                  <span className="font-serif text-2xl text-terracotta font-semibold">{s.step}</span>
                  <h3 className="mt-3 text-lg font-serif text-maroon font-semibold">{s.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Shop Catalog with Filter & Search */}
        <section
          id="shop"
          className="bg-secondary/45 py-20 lg:py-28 border-t border-border/70"
          aria-labelledby="shop-title"
        >
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="rule-eyebrow">Shop the Edit</p>
                <h2
                  id="shop-title"
                  className="mt-4 font-serif text-4xl text-maroon sm:text-5xl"
                >
                  Made to be carried.
                </h2>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                  Explore our collection of handcrafted 100% cotton bags, duffles, pouches &amp; gifting sets.
                </p>
              </div>

              {/* Search input */}
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bags, totes, pouches..."
                  className="w-full rounded-sm border border-border bg-background py-2.5 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-terracotta focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="mt-8 flex flex-wrap items-center gap-2 overflow-x-auto pb-2">
              {CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat.id;
                const count =
                  cat.id === "all"
                    ? PRODUCTS_DATA.length
                    : PRODUCTS_DATA.filter((p) => p.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all ${
                      isSelected
                        ? "bg-maroon text-ivory shadow-sm"
                        : "bg-background border border-border text-foreground/80 hover:border-maroon/40 hover:text-maroon"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[0.65rem] px-1.5 py-0.2 rounded-full ${
                        isSelected ? "bg-ivory/25 text-ivory" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="mt-16 text-center py-16 bg-background rounded-sm border border-border/70">
                <p className="font-serif text-2xl text-maroon">No matching creations found</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Try clearing your search term or switching categories.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="mt-6 inline-flex bg-maroon px-5 py-2.5 text-xs uppercase tracking-widest text-ivory font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onOpenQuickView={(prod) => setQuickViewProduct(prod)}
                  />
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Interactive Custom & Bulk Order Inquiry Builder */}
        <CustomOrderBuilder />

        {/* Craft Lookbook */}
        <CraftLookbook />

        {/* Testimonials & Trust Credentials */}
        <TestimonialsSection />

        {/* Frequently Asked Questions */}
        <section
          id="faq"
          className="bg-background py-20 lg:py-28 border-t border-border/70"
          aria-labelledby="faq-title"
        >
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10">
            <div>
              <p className="rule-eyebrow">Good to know</p>
              <h2
                id="faq-title"
                className="mt-4 font-serif text-4xl text-maroon sm:text-5xl font-medium"
              >
                Frequently asked.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                Everything you need to know about ordering, artisan craftsmanship, wedding favours, and international shipping.
              </p>
              <div className="mt-8 rounded-sm bg-sandstone/30 p-5 border border-maroon/15">
                <p className="font-serif text-lg text-maroon font-semibold">
                  Need a custom question answered?
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Our Jaipur workshop team is available on WhatsApp daily from 10 AM to 6 PM IST.
                </p>
                <a
                  href={CUSTOM_WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 bg-maroon px-4 py-2.5 text-xs uppercase tracking-widest text-ivory font-semibold hover:bg-terracotta transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Ask us on WhatsApp
                </a>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-2">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`faq-${i}`}
                  className="border border-border/80 rounded-sm px-4 bg-card"
                >
                  <AccordionTrigger className="text-left font-serif text-lg text-maroon hover:no-underline py-4">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm leading-relaxed text-muted-foreground pb-4 pt-1">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        id="contact"
        className="border-t border-border bg-sandstone/25 py-16 lg:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-3 lg:px-10">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Handmade 100% pure cotton block-print tote bags, duffles, vanity pouches, and custom wedding favours, crafted in Jaipur, Rajasthan.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-terracotta font-semibold">
              <ShieldCheck className="h-4 w-4" />
              <span>Authentic Jaipur Artisan Guarantee</span>
            </div>
          </div>

          <address className="not-italic">
            <h2 className="font-serif text-2xl text-maroon font-semibold">Visit the workshop</h2>
            <p className="mt-4 flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
              23, Hawa Sadak Rd, Brij Colony, Hawa Sadak, Ramnagar Extension,
              Ramnagar, Jaipur, Rajasthan 302019, India
            </p>
            <p className="mt-3 flex gap-3 text-sm text-muted-foreground">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
              Monday – Sunday · 10:00 AM – 6:00 PM IST
            </p>
          </address>

          <div>
            <h2 className="font-serif text-2xl text-maroon font-semibold">Get in touch</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={CUSTOM_WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-foreground/80 transition-colors hover:text-terracotta font-medium"
                >
                  <MessageCircle className="h-4 w-4 text-terracotta" aria-hidden="true" />
                  WhatsApp +91 9521922366
                </a>
              </li>
            </ul>
            <a
              href="https://instagram.com/jaifabrication"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Jai Fabrication on Instagram (opens in a new tab)"
              className="mt-5 inline-flex items-center gap-3 border border-maroon/25 bg-background px-5 py-3 font-semibold text-maroon transition-all hover:bg-maroon hover:text-ivory shadow-xs"
            >
              <Instagram className="h-5 w-5 text-terracotta" aria-hidden="true" />
              Follow @jaifabrication
            </a>
            <p className="mt-6 text-xs text-muted-foreground">
              Worldwide shipping via FedEx/DHL. Defective or transit damaged items can be reported within 3 days of delivery.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-5 lg:px-10">
          <p className="hairline pt-6 text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© {new Date().getFullYear()} Jai Fabrication · Jaipur, Rajasthan, India</span>
            <span>Handmade with Love &amp; Wooden Blocks</span>
          </p>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5">
        {/* Floating Cart Button */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="relative inline-flex items-center gap-2.5 rounded-full bg-ivory border-2 border-maroon px-4 py-3 text-xs uppercase tracking-[0.16em] text-maroon shadow-xl transition-transform hover:scale-105 font-bold"
          aria-label="Open Bag"
        >
          <ShoppingBag className="h-4 w-4 text-maroon" />
          <span className="hidden sm:inline">Enquiry Bag</span>
          {totalItems > 0 && (
            <span className="grid h-5 w-5 place-items-center rounded-full bg-terracotta text-[0.65rem] font-bold text-ivory">
              {totalItems}
            </span>
          )}
        </button>

        {/* Floating WhatsApp Button */}
        <a
          href={CUSTOM_WA}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full bg-maroon px-5 py-3.5 text-xs uppercase tracking-[0.18em] text-ivory shadow-[var(--shadow-lift)] transition-all hover:bg-terracotta hover:scale-105 font-semibold"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          <span className="hidden sm:inline">WhatsApp us</span>
          <span className="sr-only sm:hidden">Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  onOpenQuickView,
}: {
  product: Product;
  onOpenQuickView: (p: Product) => void;
}) {
  const { addToCart } = useCart();
  const [selectedQty, setSelectedQty] = useState(1);
  const tier = calculateTierPrice(product.price, selectedQty);
  const reviewData = getProductReviewsAndQA(product.id);

  return (
    <li className="group flex flex-col justify-between rounded-sm border border-border/70 bg-card p-4 transition-all duration-300 hover:border-terracotta/50 hover:shadow-[var(--shadow-soft)]">
      <div>
        {/* Product Image Frame */}
        <div className="relative arch aspect-[4/5] w-full overflow-hidden bg-secondary shadow-[var(--shadow-soft)]">
          <AssetImage
            src={product.asset}
            alt={`${product.name} — handmade block-print cotton bag by Jai Fabrication`}
            placeholderLabel={product.placeholder}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="h-full w-full object-cover"
            imgClassName="transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isBestseller && (
              <span className="bg-maroon text-ivory text-[0.62rem] uppercase tracking-widest px-2.5 py-1 font-semibold shadow-sm">
                Bestseller
              </span>
            )}
            {product.isNew && (
              <span className="bg-terracotta text-ivory text-[0.62rem] uppercase tracking-widest px-2.5 py-1 font-semibold shadow-sm">
                New
              </span>
            )}
          </div>

          {/* Hover Overlay with Quick View button */}
          <div className="absolute inset-0 bg-maroon/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center p-4">
            <button
              type="button"
              onClick={() => onOpenQuickView(product)}
              className="inline-flex items-center gap-2 bg-ivory px-4 py-2 text-[0.7rem] uppercase tracking-widest text-maroon font-bold shadow-lg transition-transform hover:scale-105"
            >
              <Eye className="h-3.5 w-3.5" />
              Specs, Reviews &amp; Bulk
            </button>
          </div>
        </div>

        {/* Tags & Rating Header */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {product.tags.slice(0, 2).map((label) => (
              <span
                key={label}
                className="border border-maroon/25 px-2 py-0.5 text-[0.58rem] uppercase tracking-[0.16em] text-maroon/80 font-medium"
              >
                {label}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onOpenQuickView(product)}
            className="inline-flex items-center gap-1 text-[0.68rem] text-terracotta hover:underline font-semibold"
            title={`${reviewData.reviewCount} customer reviews`}
          >
            <span className="text-amber-500 font-bold">★</span>
            <span className="font-bold text-foreground">{reviewData.rating}</span>
            <span className="text-muted-foreground text-[0.62rem]">({reviewData.reviewCount})</span>
          </button>
        </div>

        {/* Title & Short Description */}
        <h3 className="mt-2.5 font-serif text-2xl text-maroon font-medium group-hover:text-terracotta transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {product.shortDescription}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-border/60 space-y-3">
        {/* Quick Quantity / Bulk Tier Selector */}
        <div>
          <div className="flex items-center justify-between text-[0.65rem] text-muted-foreground mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-foreground">Choose Quantity:</span>
            {tier.discountPercent > 0 && (
              <span className="text-terracotta font-bold">
                {tier.discountPercent}% Bulk OFF
              </span>
            )}
          </div>
          <div className="grid grid-cols-5 gap-1 text-[0.65rem]">
            {[1, 10, 25, 50, 100].map((q) => {
              const isSelected = selectedQty === q;
              return (
                <button
                  key={q}
                  type="button"
                  onClick={() => setSelectedQty(q)}
                  className={`py-1 rounded-xs border text-center transition-all ${
                    isSelected
                      ? "bg-maroon text-ivory border-maroon font-bold shadow-xs"
                      : "bg-secondary/70 border-border text-foreground/80 hover:border-maroon/40"
                  }`}
                >
                  {q} pc{q > 1 ? "s" : ""}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price display */}
        <div className="flex items-baseline justify-between pt-0.5">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-serif font-bold text-foreground">
                ₹{tier.totalPrice.toLocaleString("en-IN")}
              </span>
              {selectedQty > 1 && (
                <span className="text-[0.7rem] text-muted-foreground">
                  (₹{tier.unitPrice.toLocaleString("en-IN")}/pc)
                </span>
              )}
            </div>
            <p className="text-[0.62rem] text-muted-foreground">
              {selectedQty === 1 ? "Single piece sample price" : `Bulk batch of ${selectedQty} pcs`}
            </p>
          </div>
        </div>

        {/* Dual Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => addToCart(product, selectedQty)}
            className="flex items-center justify-center gap-1.5 bg-maroon px-3 py-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-ivory font-semibold transition-colors hover:bg-terracotta"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add {selectedQty} pc{selectedQty > 1 ? "s" : ""}
          </button>
          <button
            type="button"
            onClick={() => onOpenQuickView(product)}
            className="flex items-center justify-center gap-1.5 border border-maroon px-3 py-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-maroon font-semibold transition-colors hover:bg-maroon hover:text-ivory"
          >
            <Eye className="h-3.5 w-3.5" />
            Specs &amp; 100+
          </button>
        </div>

        {/* Direct WhatsApp Enquiry */}
        <a
          href={wa(
            `Hello Jai Fabrication, I would like to enquire about ordering ${selectedQty} pc${selectedQty > 1 ? "s" : ""} of the ${product.name} (Total: ₹${tier.totalPrice.toLocaleString("en-IN")}).`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-terracotta"
        >
          <MessageCircle className="h-3.5 w-3.5 text-terracotta" />
          WhatsApp {selectedQty >= 10 ? "bulk quote" : "enquiry"}
        </a>
      </div>
    </li>
  );
}
