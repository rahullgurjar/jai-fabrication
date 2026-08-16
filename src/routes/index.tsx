import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, MessageCircle, Instagram, MapPin, Clock } from "lucide-react";

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
  "Hello Jai Fabrication, I would like to enquire about custom & bulk orders of handmade block-print bags.",
);

const NAV = [
  { label: "Shop", href: "#shop" },
  { label: "Our Craft", href: "#craft" },
  { label: "Custom Orders", href: "#custom" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

const PRODUCTS = [
  {
    name: "Floral Tote Bag",
    price: "₹1,199",
    asset: siteAssets.floralTote,
    note: "Hand-block floral repeat on structured cotton canvas.",
    placeholder: "Floral Tote — product image",
  },
  {
    name: "Patchwork Duffle Bag",
    price: "₹1,499",
    asset: siteAssets.patchworkDuffle,
    note: "Pieced block-print panels, roomy weekend silhouette.",
    placeholder: "Patchwork Duffle — product image",
  },
  {
    name: "Yellow Quilted Pouch",
    price: "₹699",
    asset: siteAssets.yellowPouch,
    note: "Quilted yellow cotton, hand-finished zip pouch.",
    placeholder: "Yellow Quilted Pouch — product image",
  },
];

const FAQS = [
  {
    q: "Do you ship worldwide?",
    a: "Yes, shipping details are confirmed on WhatsApp.",
  },
  {
    q: "How do I place an order?",
    a: "Enquire on WhatsApp; UPI payment is accepted.",
  },
  { q: "What fabric do you use?", a: "100% cotton." },
  { q: "Do you take custom or bulk orders?", a: "Yes." },
  {
    q: "What is the production timeline?",
    a: "A minimum of 3 days, depending on quantity.",
  },
  {
    q: "What is your return policy?",
    a: "Defective items can be reported within 3 days of delivery.",
  },
];

const JOURNAL = [
  {
    kicker: "Notes from the workshop",
    title: "The rhythm of the wooden block",
    body: "Each motif is carved by hand, then pressed in sequence across the cloth — a slight variation in every repeat is the signature of real block printing.",
  },
  {
    kicker: "Colour diary",
    title: "Why Jaipur wears pink",
    body: "Sandstone facades, terracotta courtyards and indigo shade. Our palette is lifted straight from the streets around Hawa Sadak.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jai Fabrication | Handmade Block Print Bags from Jaipur" },
      {
        name: "description",
        content:
          "Shop handmade 100% cotton block-print tote bags, duffle bags and pouches by Jai Fabrication, crafted in Jaipur.",
      },
      {
        property: "og:title",
        content: "Jai Fabrication | Handmade Block Print Bags from Jaipur",
      },
      {
        property: "og:description",
        content:
          "Shop handmade 100% cotton block-print tote bags, duffle bags and pouches by Jai Fabrication, crafted in Jaipur.",
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
          description:
            "Handmade 100% cotton block-print tote bags, duffle bags and pouches, crafted in Jaipur.",
          telephone: "+91 9521922366",
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
      className="flex min-w-0 items-center gap-3"
      aria-label="Jai Fabrication — home"
    >
      {siteAssets.logo ? (
        <img
          src={siteAssets.logo}
          alt="Jai Fabrication logo"
          className="h-11 w-11 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="motif-field grid h-11 w-11 shrink-0 place-items-center rounded-full border border-maroon/25 bg-secondary font-serif text-sm text-maroon"
        >
          JF
        </span>
      )}
      <span className="min-w-0">
        <span className="block truncate font-serif text-lg leading-none text-maroon">
          Jai Fabrication
        </span>
        <span className="mt-1 block truncate text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
          Jaipur · Since the block
        </span>
      </span>
    </a>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div id="top" className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-maroon focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 lg:px-10">
          <Logo />
          <div className="flex items-center gap-2">
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-[0.78rem] uppercase tracking-[0.16em] text-foreground/80 transition-colors hover:text-terracotta"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <a
              href={CUSTOM_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden shrink-0 items-center gap-2 bg-maroon px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-terracotta sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-border text-maroon lg:hidden"
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

        {menuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="border-t border-border bg-background lg:hidden"
          >
            <ul className="mx-auto max-w-7xl px-5 py-3">
              {NAV.map((item) => (
                <li key={item.href} className="border-b border-border/60 last:border-0">
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-sm uppercase tracking-[0.16em] text-foreground/85"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href={CUSTOM_WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-maroon px-5 py-3 text-[0.72rem] uppercase tracking-[0.18em] text-ivory"
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
        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{ backgroundImage: "var(--gradient-sandstone)" }}
          aria-labelledby="hero-title"
        >
          <div
            aria-hidden="true"
            className="motif-field pointer-events-none absolute inset-0 opacity-40"
          />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-10 lg:pb-28 lg:pt-24">
            <div className="max-w-xl">
              <p className="rule-eyebrow">Handcrafted in Jaipur</p>
              <h1
                id="hero-title"
                className="mt-5 font-serif text-[2.6rem] leading-[1.05] text-maroon sm:text-6xl lg:text-7xl"
              >
                Carry a piece of the Pink City.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground/80 sm:text-lg">
                Hand-block printed cotton bags with colourful character, made
                for everyday journeys and meaningful gifting.
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-2 sm:gap-4">
                <a
                  href="#shop"
                  className="inline-flex items-center justify-center bg-maroon px-6 py-4 text-[0.75rem] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-terracotta"
                >
                  Shop the Collection
                </a>
                <a
                  href={CUSTOM_WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-maroon px-6 py-4 text-[0.75rem] uppercase tracking-[0.2em] text-maroon transition-colors hover:bg-maroon hover:text-ivory"
                >
                  Custom &amp; Bulk Orders
                </a>
              </div>

              <p className="mt-7 text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground">
                Wedding favours · Corporate gifting · Custom prints · From 3 days
              </p>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 hidden border border-maroon/20 lg:block"
                style={{ borderRadius: "14rem 14rem 4px 4px" }}
              />
              <AssetImage
                src={siteAssets.hero}
                alt="Colourful Jaipur courtyard with handmade block-print bags"
                placeholderLabel="Hero — Jaipur courtyard bag image"
                loading="eager"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="arch-soft aspect-[4/5] w-full shadow-[var(--shadow-lift)]"
              />
            </div>
          </div>
        </section>

        {/* Story / Craft */}
        <section id="craft" className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="rule-eyebrow">The Jai Story</p>
              <h2 className="mt-5 font-serif text-4xl leading-tight text-maroon sm:text-5xl">
                Crafted in colour. Rooted in Jaipur.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground/80">
                Inspired by the Pink City’s warm sandstone facades and timeless
                craft traditions, every Jai Fabrication piece is made in 100%
                cotton with handmade block-print character.
              </p>
            </div>

            <ol className="grid gap-px bg-border sm:grid-cols-2">
              {[
                {
                  step: "01",
                  title: "Carving the block",
                  body: "Teak blocks are hand-carved into motifs drawn from Jaipur’s jali screens and garden florals.",
                },
                {
                  step: "02",
                  title: "Natural cotton",
                  body: "Only 100% cotton is prepared, washed and stretched across the printing table.",
                },
                {
                  step: "03",
                  title: "Printing by hand",
                  body: "Colour is laid repeat by repeat — the gentle irregularity is the mark of the maker.",
                },
                {
                  step: "04",
                  title: "Cut, quilt, finish",
                  body: "Panels are cut, reinforced and stitched in our Hawa Sadak workshop.",
                },
              ].map((s) => (
                <li key={s.step} className="bg-background p-7 lg:p-9">
                  <span className="font-serif text-2xl text-terracotta">{s.step}</span>
                  <h3 className="mt-4 text-lg text-maroon">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Shop */}
        <section
          id="shop"
          className="bg-secondary/45 py-20 lg:py-28"
          aria-labelledby="shop-title"
        >
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <p className="rule-eyebrow">Shop the Edit</p>
            <h2
              id="shop-title"
              className="mt-4 font-serif text-4xl text-maroon sm:text-5xl"
            >
              Made to be carried.
            </h2>

            <ul className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {PRODUCTS.map((p) => (
                <li key={p.name} className="group flex flex-col">
                  <AssetImage
                    src={p.asset}
                    alt={`${p.name} — handmade block-print cotton bag by Jai Fabrication`}
                    placeholderLabel={p.placeholder}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="arch aspect-[4/5] w-full shadow-[var(--shadow-soft)]"
                    imgClassName="transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                  />
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["100% Cotton", "Handmade"].map((label) => (
                      <span
                        key={label}
                        className="border border-maroon/25 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-maroon/80"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-4 font-serif text-2xl text-maroon">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.note}</p>
                  <p className="mt-3 text-base tracking-wide text-foreground">
                    {p.price}
                  </p>
                  <a
                    href={wa(
                      `Hello Jai Fabrication, I would like to enquire about the ${p.name} (${p.price}).`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-fit items-center gap-2 border-b border-maroon pb-1 text-[0.72rem] uppercase tracking-[0.18em] text-maroon transition-colors hover:border-terracotta hover:text-terracotta"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Enquire on WhatsApp
                    <span className="sr-only"> about {p.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Custom */}
        <section
          id="custom"
          className="relative overflow-hidden py-20 text-ivory lg:py-28"
          style={{ backgroundImage: "var(--gradient-maroon)" }}
          aria-labelledby="custom-title"
        >
          <div
            aria-hidden="true"
            className="motif-field pointer-events-none absolute inset-0 opacity-30"
          />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20 lg:px-10">
            <div>
              <p className="rule-eyebrow text-ivory/70">Custom &amp; Bulk</p>
              <h2
                id="custom-title"
                className="mt-5 font-serif text-4xl leading-tight sm:text-5xl"
              >
                Your motif, your palette, your occasion.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-ivory/85">
                Made to order in Jaipur. Production begins from three days,
                depending on quantity.
              </p>
              <a
                href={CUSTOM_WA}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex items-center gap-2 bg-ivory px-7 py-4 text-[0.75rem] uppercase tracking-[0.2em] text-maroon transition-colors hover:bg-sandstone"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Start a custom order on WhatsApp
              </a>
            </div>

            <ul className="grid gap-px bg-ivory/20 sm:grid-cols-3 lg:grid-cols-1">
              {[
                {
                  title: "Custom prints",
                  body: "Bespoke blocks and colourways matched to your brand or invitation suite.",
                },
                {
                  title: "Wedding favours",
                  body: "Pouches and totes for mehendi, welcome hampers and return gifts.",
                },
                {
                  title: "Corporate gifts",
                  body: "Considered, sustainable cotton gifting at volume, logo printing available.",
                },
              ].map((c) => (
                <li
                  key={c.title}
                  className="p-7 lg:p-8"
                  style={{ backgroundImage: "var(--gradient-maroon)" }}
                >
                  <h3 className="text-xl">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/80">
                    {c.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Journal */}
        <section
          id="journal"
          className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28"
          aria-labelledby="journal-title"
        >
          <p className="rule-eyebrow">The Journal</p>
          <h2
            id="journal-title"
            className="mt-4 font-serif text-4xl text-maroon sm:text-5xl"
          >
            Stories from the printing table.
          </h2>
          <ul className="mt-12 grid gap-px bg-border sm:grid-cols-2">
            {JOURNAL.map((j) => (
              <li key={j.title} className="bg-background p-8 lg:p-10">
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-terracotta">
                  {j.kicker}
                </p>
                <h3 className="mt-4 font-serif text-2xl text-maroon">{j.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {j.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="bg-secondary/45 py-20 lg:py-28"
          aria-labelledby="faq-title"
        >
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10">
            <div>
              <p className="rule-eyebrow">Good to know</p>
              <h2
                id="faq-title"
                className="mt-4 font-serif text-4xl text-maroon sm:text-5xl"
              >
                Frequently asked.
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`} className="border-maroon/15">
                  <AccordionTrigger className="text-left font-serif text-lg text-maroon hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
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
        className="border-t border-border bg-background py-16 lg:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-3 lg:px-10">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Handmade 100% cotton block-print totes, duffles and pouches,
              crafted in Jaipur.
            </p>
          </div>

          <address className="not-italic">
            <h2 className="font-serif text-xl text-maroon">Visit the workshop</h2>
            <p className="mt-4 flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
              23, Hawa Sadak Rd, Brij Colony, Hawa Sadak, Ramnagar Extension,
              Ramnagar, Jaipur, Rajasthan 302019, India
            </p>
            <p className="mt-3 flex gap-3 text-sm text-muted-foreground">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
              10:00 AM–6:00 PM
            </p>
          </address>

          <div>
            <h2 className="font-serif text-xl text-maroon">Get in touch</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={CUSTOM_WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-terracotta"
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
              className="mt-6 inline-flex items-center gap-3 border border-maroon/25 bg-secondary px-5 py-3 font-medium text-maroon transition-colors hover:bg-terracotta hover:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
              Follow @jaifabrication
            </a>
            <p className="mt-6 text-sm text-muted-foreground">
              Worldwide shipping. Defective items can be reported within 3 days
              of delivery.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-5 lg:px-10">
          <p className="hairline pt-6 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
            © {new Date().getFullYear()} Jai Fabrication · Jaipur, Rajasthan
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={CUSTOM_WA}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 bg-maroon px-5 py-4 text-[0.7rem] uppercase tracking-[0.18em] text-ivory shadow-[var(--shadow-lift)] transition-colors hover:bg-terracotta"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp us</span>
        <span className="sr-only sm:hidden">Chat with Jai Fabrication on WhatsApp</span>
      </a>
    </div>
  );
}
