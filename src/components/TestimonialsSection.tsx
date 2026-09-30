import { Star, ShieldCheck, Heart, Sparkles, CheckCircle2, Award, Truck } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  occasion: string;
  rating: number;
  quote: string;
  itemPurchased: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Ananya Singhania",
    role: "Wedding & Event Planner",
    location: "Mumbai, Maharashtra",
    occasion: "Destination Wedding (200 Totes)",
    rating: 5,
    quote:
      "Jai Fabrication produced 200 custom block-printed tote bags for our Udaipur destination wedding in just 6 days. The print sharpness, sturdy canvas handles, and couple monogram tag were perfection. Our guests loved them!",
    itemPurchased: "Custom Monogram Canvas Totes",
  },
  {
    id: "2",
    name: "Dr. Rohini & Karan Mehta",
    role: "Private Client",
    location: "New Delhi",
    occasion: "Mehendi Gifting",
    rating: 5,
    quote:
      "The quilted pouches in sunlit yellow and turquoise were the highlight of my sister's Mehendi hampers. The zipper quality is smooth, the quilting is plush, and communication on WhatsApp was swift and warm.",
    itemPurchased: "Sunlit Marigold Quilted Pouches (85 pcs)",
  },
  {
    id: "3",
    name: "Claire Thorne",
    role: "Boutique Owner",
    location: "London, UK",
    occasion: "Retail Wholesale",
    rating: 5,
    quote:
      "Finding authentic 100% cotton Jaipur block prints with such consistent sewing quality is rare. The Duffle bags and Shopper totes sell out within days in our store. Direct workshop pricing with hassle-free shipping.",
    itemPurchased: "Heritage Patchwork Weekend Duffles",
  },
];

const TRUST_METRICS = [
  {
    icon: Sparkles,
    value: "10,000+",
    title: "Handcrafted Bags",
    desc: "Made on Jaipur printing tables",
  },
  {
    icon: Award,
    value: "100% Pure",
    title: "Natural Cotton",
    desc: "Azo-free skin friendly dyes",
  },
  {
    icon: Heart,
    value: "150+",
    title: "Wedding Favours",
    desc: "Bespoke bulk batches crafted",
  },
  {
    icon: Truck,
    value: "Express",
    title: "Pan-India & Global",
    desc: "Dispatched direct from Hawa Sadak",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="bg-secondary/40 py-20 lg:py-28 border-t border-border/70"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        {/* Trust Stats Bar */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6 pb-16 border-b border-border/80">
          {TRUST_METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.title}
                className="flex items-center gap-3.5 rounded-sm border border-border/70 bg-card p-4 sm:p-5 shadow-xs"
              >
                <div className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-full bg-maroon/10 text-maroon">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-terracotta" />
                </div>
                <div>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-maroon leading-none">
                    {metric.value}
                  </p>
                  <p className="text-xs font-semibold text-foreground mt-1">
                    {metric.title}
                  </p>
                  <p className="text-[0.68rem] text-muted-foreground">
                    {metric.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Heading */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="rule-eyebrow">Client Reflections</p>
          <h2
            id="testimonials-heading"
            className="mt-4 font-serif text-4xl text-maroon sm:text-5xl"
          >
            Loved across weddings, homes &amp; travels.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-foreground/80 leading-relaxed">
            Real stories from patrons, wedding couples, and boutique curators who carry our Pink City craft.
          </p>
        </div>

        {/* Testimonials 3-Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-between rounded-sm border border-border/80 bg-card p-6 sm:p-8 shadow-[var(--shadow-soft)] transition-all hover:border-terracotta/50"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-gold">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <p className="mt-5 text-sm sm:text-base text-foreground/85 leading-relaxed italic font-serif">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-border/70">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-maroon">{t.name}</h3>
                    <p className="text-xs text-muted-foreground">{t.role} · {t.location}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[0.62rem] font-bold uppercase tracking-wider text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-xs">
                    <CheckCircle2 className="h-3 w-3" /> Verified
                  </span>
                </div>
                <p className="mt-2 text-[0.68rem] text-muted-foreground bg-sandstone/30 px-2.5 py-1 rounded-xs inline-block">
                  Ordered: {t.itemPurchased}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
