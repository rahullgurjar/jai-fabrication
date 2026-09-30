import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Film,
  MessageCircle,
  ShoppingBag,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { siteAssets } from "@/lib/site-assets";
import { AssetImage } from "@/components/AssetImage";
import { WA_BASE_PHONE } from "@/lib/cart-context";

interface HeroSlide {
  id: string;
  badge: string;
  badgeIcon?: "sparkles" | "film" | "wedding" | "bag";
  title: string;
  highlightText?: string;
  description: string;
  primaryCta: { label: string; href: string; isExternal?: boolean };
  secondaryCta: { label: string; href: string; isExternal?: boolean };
  highlights: string[];
  mediaType: "image" | "video";
  mediaSrc: string;
  posterImage?: string;
  imageAlt: string;
  artisanTag: { label: string; sub: string; linkText: string; linkHref: string };
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "heritage-pink-city",
    badge: "Handcrafted in Jaipur · 100% Pure Cotton",
    badgeIcon: "sparkles",
    title: "Carry a piece of the Pink City.",
    description:
      "Hand-block printed cotton bags with colourful character, made for everyday journeys, conscious luxury, and meaningful gifting. Direct from our artisan printing tables in Jaipur.",
    primaryCta: { label: "Shop Collection", href: "#shop" },
    secondaryCta: { label: "Custom & Bulk Orders", href: "#custom" },
    highlights: ["Wedding Favours", "Corporate Gifting", "Custom Prints", "From 3 Days"],
    mediaType: "image",
    mediaSrc: siteAssets.hero || "",
    imageAlt: "Colourful Jaipur courtyard with handmade block-print bags",
    artisanTag: {
      label: "Jaipur Atelier",
      sub: "100% Teak Woodblock Craft",
      linkText: "Lookbook →",
      linkHref: "#lookbook",
    },
  },
  {
    id: "motion-video-craft",
    badge: "Motion Visual · Live From Workshop Tables",
    badgeIcon: "film",
    title: "Rhythmic Woodblock Stamping in Motion.",
    description:
      "Watch seasoned master artisans in Hawa Sadak apply hand-carved teakwood blocks repeat by repeat onto organic cotton canvas with natural vegetable and mineral pigments.",
    primaryCta: { label: "Watch Workshop Reels", href: "#craft-videos" },
    secondaryCta: { label: "Our Artisan Craft", href: "#craft" },
    highlights: ["Sheesham Teak Blocks", "Natural Azo-Free Dyes", "Diamond Quilting", "Pan-India Shipping"],
    mediaType: "video",
    mediaSrc:
      "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-spinning-wool-with-a-spindle-41845-large.mp4",
    posterImage: siteAssets.mughalBotanicalDuffle || "",
    imageAlt: "Live video of Jaipur block printing and textile craft",
    artisanTag: {
      label: "Live Workshop Feed",
      sub: "Teakwood & Natural Pigments",
      linkText: "Reels Cinema →",
      linkHref: "#craft-videos",
    },
  },
  {
    id: "wedding-favours",
    badge: "Destination Weddings · Bridal & Mehendi Favours",
    badgeIcon: "wedding",
    title: "Personalized Favours for Your Special Day.",
    description:
      "Custom couple initials block carving, bespoke pastel colour palettes, and elegant cotton gift hamper bags crafted with fast 3 to 7-day turnaround for weddings worldwide.",
    primaryCta: {
      label: "Enquire Wedding Favours",
      href: `https://wa.me/${WA_BASE_PHONE}?text=${encodeURIComponent(
        "Hello Jai Fabrication, I would like to discuss custom wedding favours and monogram block print bags."
      )}`,
      isExternal: true,
    },
    secondaryCta: { label: "Explore Gift Sets", href: "#shop" },
    highlights: ["Custom Monogram Blocks", "Gift Ribbon Packaging", "Pastel Themes", "25+ Pcs Bulk Discounts"],
    mediaType: "image",
    mediaSrc: siteAssets.peachPleatedClutchTrio || siteAssets.lavenderQuiltedPouch || "",
    imageAlt: "Handmade peach sanganeri pleated clutch trio for wedding favours",
    artisanTag: {
      label: "Wedding Atelier",
      sub: "Bespoke Monogram Carving",
      linkText: "Custom Builder →",
      linkHref: "#custom",
    },
  },
  {
    id: "travel-duffles",
    badge: "Heritage Travel Collection · Airline Cabin Size",
    badgeIcon: "bag",
    title: "Quilted Weekender Duffles & Vanity Sets.",
    description:
      "Dense diamond quilting with pure cotton wadding, heavy-duty antique brass zippers, and wipeable water-resistant interior linings made to travel for decades.",
    primaryCta: { label: "Explore Travel Duffles", href: "#shop" },
    secondaryCta: { label: "Wholesale Tiers (20% OFF)", href: "#shop" },
    highlights: ["Pure Cotton Batting", "Luggage Trolley Sleeve", "YKK Brass Zippers", "Wipeable Inner Lining"],
    mediaType: "image",
    mediaSrc: siteAssets.mughalBotanicalDuffle || siteAssets.blueMughalVanityBox || "",
    imageAlt: "Mughal botanical quilted duffle and travel vanity bag",
    artisanTag: {
      label: "Travel Series",
      sub: "Diamond Quilted Cotton",
      linkText: "Shop Duffles →",
      linkHref: "#shop",
    },
  },
];

export function SlidingHero() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const slide = HERO_SLIDES[currentSlideIndex];

  // Auto-advance timer (6.5s per slide)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentSlideIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handleToggleVideoAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const handleToggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-sandstone/25 border-b border-border/70"
      style={{ backgroundImage: "var(--gradient-sandstone)" }}
      aria-labelledby="hero-main-title"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Rajasthani Motif Texture */}
      <div
        aria-hidden="true"
        className="motif-field pointer-events-none absolute inset-0 opacity-30"
      />

      {/* Main Slide Container */}
      <div className="relative mx-auto max-w-7xl px-5 pt-8 pb-16 lg:px-10 lg:pt-14 lg:pb-24">
        {/* Slide Indicator Tabs Top Bar */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto no-scrollbar">
            {HERO_SLIDES.map((s, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setCurrentSlideIndex(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.65rem] uppercase tracking-wider font-semibold transition-all ${
                    isActive
                      ? "bg-maroon text-ivory shadow-sm scale-105"
                      : "bg-background/80 border border-border/80 text-muted-foreground hover:text-foreground hover:bg-card"
                  }`}
                >
                  <span className="font-mono text-[0.6rem] opacity-75">0{idx + 1}</span>
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
              );
            })}
          </div>

          {/* Navigation Prev / Next Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              className="grid h-8 w-8 place-items-center rounded-full border border-maroon/25 bg-background text-maroon hover:bg-maroon hover:text-ivory transition-colors shadow-xs"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="grid h-8 w-8 place-items-center rounded-full border border-maroon/25 bg-background text-maroon hover:bg-maroon hover:text-ivory transition-colors shadow-xs"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 min-h-[460px]">
          {/* Left Column: Slide Content */}
          <div className="max-w-2xl animate-in fade-in slide-in-from-left-4 duration-500 key={slide.id}">
            <div className="inline-flex items-center gap-2 rounded-full border border-maroon/20 bg-background/90 px-3.5 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-maroon font-semibold mb-4 backdrop-blur-xs shadow-2xs">
              {slide.badgeIcon === "film" ? (
                <Film className="h-3.5 w-3.5 text-terracotta animate-pulse" />
              ) : (
                <Sparkles className="h-3.5 w-3.5 text-terracotta" />
              )}
              <span>{slide.badge}</span>
            </div>

            <h1
              id="hero-main-title"
              className="mt-2 font-serif text-[2.7rem] leading-[1.08] text-maroon sm:text-6xl lg:text-7xl font-medium"
            >
              {slide.title}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
              {slide.description}
            </p>

            {/* CTAs */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 max-w-md">
              {slide.primaryCta.isExternal ? (
                <a
                  href={slide.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-maroon px-6 py-3.5 text-[0.75rem] uppercase tracking-[0.2em] text-ivory transition-all hover:bg-terracotta shadow-md font-semibold rounded-xs"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{slide.primaryCta.label}</span>
                </a>
              ) : (
                <a
                  href={slide.primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 bg-maroon px-6 py-3.5 text-[0.75rem] uppercase tracking-[0.2em] text-ivory transition-all hover:bg-terracotta shadow-md font-semibold rounded-xs"
                >
                  <span>{slide.primaryCta.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}

              {slide.secondaryCta.isExternal ? (
                <a
                  href={slide.secondaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-maroon px-6 py-3.5 text-[0.75rem] uppercase tracking-[0.2em] text-maroon transition-all hover:bg-maroon hover:text-ivory font-semibold rounded-xs bg-background/60"
                >
                  {slide.secondaryCta.label}
                </a>
              ) : (
                <a
                  href={slide.secondaryCta.href}
                  className="inline-flex items-center justify-center border border-maroon px-6 py-3.5 text-[0.75rem] uppercase tracking-[0.2em] text-maroon transition-all hover:bg-maroon hover:text-ivory font-semibold rounded-xs bg-background/60"
                >
                  {slide.secondaryCta.label}
                </a>
              )}
            </div>

            {/* Highlights strip */}
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground font-medium pt-4 border-t border-maroon/15">
              {slide.highlights.map((h, i) => (
                <span key={h} className="inline-flex items-center gap-1.5">
                  {i > 0 && <span className="text-terracotta font-bold">·</span>}
                  <span>{h}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Media Frame (Video or Photo with Arch Frame) */}
          <div className="relative animate-in fade-in zoom-in-95 duration-500 key={slide.id}">
            <div
              aria-hidden="true"
              className="absolute -inset-3.5 hidden border border-maroon/25 lg:block"
              style={{ borderRadius: "14rem 14rem 6px 6px" }}
            />

            <div className="relative overflow-hidden arch-soft aspect-[4/5] w-full shadow-[var(--shadow-lift)] bg-maroon/95">
              {slide.mediaType === "video" ? (
                <div className="relative h-full w-full">
                  <video
                    ref={videoRef}
                    key={slide.mediaSrc}
                    src={slide.mediaSrc}
                    poster={slide.posterImage}
                    autoPlay
                    loop
                    muted={isVideoMuted}
                    playsInline
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon/85 via-transparent to-black/30 pointer-events-none" />

                  {/* Video Overlay Top Controls */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-ivory">
                    <div className="flex items-center gap-2 bg-maroon/80 backdrop-blur-md px-3 py-1 rounded-full border border-ivory/20 text-[0.62rem] uppercase tracking-wider font-semibold">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Workshop Reel</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleToggleVideoAudio}
                        className="grid h-7 w-7 place-items-center rounded-full bg-background/50 backdrop-blur-md text-ivory hover:bg-background/80 transition-colors"
                        aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
                      >
                        {isVideoMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={handleToggleVideoPlay}
                        className="grid h-7 w-7 place-items-center rounded-full bg-background/50 backdrop-blur-md text-ivory hover:bg-background/80 transition-colors"
                        aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                      >
                        {isVideoPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-ivory ml-0.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <AssetImage
                  src={slide.mediaSrc}
                  alt={slide.imageAlt}
                  placeholderLabel={slide.title}
                  loading="eager"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              )}

              {/* Floating Artisan / Feature Badge */}
              <div className="absolute bottom-5 left-5 right-5 rounded-sm bg-background/95 p-3.5 backdrop-blur-md border border-border/80 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.2em] text-terracotta font-semibold">
                      {slide.artisanTag.label}
                    </p>
                    <p className="font-serif text-sm font-semibold text-maroon">
                      {slide.artisanTag.sub}
                    </p>
                  </div>
                  <a
                    href={slide.artisanTag.linkHref}
                    className="text-[0.65rem] uppercase tracking-wider text-maroon font-bold underline underline-offset-2 hover:text-terracotta transition-colors"
                  >
                    {slide.artisanTag.linkText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Progress Timer Line */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setCurrentSlideIndex(idx);
                setIsAutoPlaying(false);
              }}
              className="group py-2 px-1 focus:outline-none"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  idx === currentSlideIndex
                    ? "w-10 bg-maroon shadow-xs"
                    : "w-3 bg-maroon/20 group-hover:bg-maroon/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
