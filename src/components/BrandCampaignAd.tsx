import { useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Film,
  Instagram,
  Heart,
  Share2,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { siteAssets } from "@/lib/site-assets";
import { WA_BASE_PHONE } from "@/lib/cart-context";
import { AssetImage } from "@/components/AssetImage";

export function BrandCampaignAd() {
  const [isPlayingCommercial, setIsPlayingCommercial] = useState(false);
  const [isLikedReel, setIsLikedReel] = useState(false);
  const [likeCount, setLikeCount] = useState(1428);

  const handleToggleLike = () => {
    if (isLikedReel) {
      setIsLikedReel(false);
      setLikeCount((c) => c - 1);
    } else {
      setIsLikedReel(true);
      setLikeCount((c) => c + 1);
    }
  };

  return (
    <section
      id="campaign-ad"
      className="bg-maroon text-ivory py-20 lg:py-28 relative overflow-hidden border-t border-maroon/30"
      aria-labelledby="campaign-ad-heading"
    >
      {/* Background Rajasthani Motif Texture */}
      <div
        aria-hidden="true"
        className="motif-field pointer-events-none absolute inset-0 opacity-15"
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-ivory/10 px-4 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-sandstone font-semibold mb-3 backdrop-blur-xs">
            <Film className="h-3.5 w-3.5 text-sandstone animate-pulse" />
            Official Brand Campaign &amp; Video Ads
          </div>
          <h2
            id="campaign-ad-heading"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-ivory"
          >
            Crafted for the conscious traveler.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-ivory/80 leading-relaxed max-w-2xl mx-auto">
            Experience our Jaipur heritage in motion. Explore our signature commercial cinema ad and social video reel campaigns.
          </p>
        </div>

        {/* Dual Ad Visuals Showcase Grid */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          {/* Left Column: 16:9 Cinema Commercial Video Ad */}
          <div className="relative overflow-hidden rounded-md border border-ivory/20 bg-black/40 shadow-2xl group">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-maroon/90">
              {/* Cinematic Visual Asset */}
              <img
                src={siteAssets.luxuryCraftVideoAd || ""}
                alt="Cinema commercial ad showing master Jaipur artisan stamping peacock woodblock"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

              {/* Ad Badges Top */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-ivory">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-ivory/20 text-[0.62rem] uppercase tracking-wider font-semibold">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <span>Official Commercial 4K</span>
                </div>
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-ivory/20 text-[0.62rem] font-mono">
                  <span>01:30 · Dolby Sound</span>
                </div>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href="#craft-videos"
                  className="grid h-16 w-16 place-items-center rounded-full bg-ivory text-maroon shadow-2xl transition-transform hover:scale-110 active:scale-95 group-hover:scale-110"
                  aria-label="Play commercial film"
                >
                  <Play className="h-7 w-7 fill-maroon ml-1" />
                </a>
              </div>

              {/* Bottom Cinema Info Bar */}
              <div className="absolute bottom-4 left-4 right-4 text-ivory">
                <p className="text-[0.65rem] uppercase tracking-widest text-sandstone font-bold">
                  Documentary Series · Episode 01
                </p>
                <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight drop-shadow-md mt-0.5">
                  The Soul of Sanganer: 50,000 Strikes of Pure Teak
                </h3>
                <p className="mt-1 text-xs text-ivory/80 line-clamp-1 max-w-lg drop-shadow-sm">
                  Featuring Master Artisan Ramprasad Ji in our Ramnagar Jaipur workshop atelier.
                </p>
              </div>
            </div>

            {/* Commercial Action Footer */}
            <div className="p-5 sm:p-6 bg-sandstone/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-ivory/15">
              <div>
                <p className="text-xs uppercase tracking-wider text-sandstone font-semibold">
                  Direct From Atelier · No Middlemen
                </p>
                <p className="font-serif text-lg font-bold text-ivory">
                  Wholesale &amp; Custom Gifting from ₹649/pc
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`https://wa.me/${WA_BASE_PHONE}?text=${encodeURIComponent(
                    "Hello Jai Fabrication, I saw your official craft commercial ad and would like to order handcrafted bags."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-ivory px-5 py-3 text-[0.72rem] uppercase tracking-widest text-maroon font-bold rounded-xs hover:bg-sandstone transition-colors shadow-md"
                >
                  <MessageCircle className="h-4 w-4" />
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 9:16 Social Media Story Reel Ad */}
          <div className="relative mx-auto w-full max-w-xs lg:max-w-none">
            <div className="relative overflow-hidden rounded-2xl border-4 border-ivory/25 bg-black shadow-2xl aspect-[9/16] group">
              {/* Vertical Lifestyle Reel Visual */}
              <img
                src={siteAssets.jaipurReelAd || ""}
                alt="Social media video reel ad showing Jaipur courtyard and floral duffle bag"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Shading */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />

              {/* Top Social Bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-ivory z-10">
                <div className="flex items-center gap-2">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-maroon text-[0.6rem] font-bold ring-2 ring-ivory/40">
                    JF
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">jaifabrication</p>
                    <p className="text-[0.55rem] text-ivory/75">Jaipur, Rajasthan · Sponsored Reel</p>
                  </div>
                </div>

                <a
                  href="https://instagram.com/jaifabrication"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-ivory/20 backdrop-blur-md px-2.5 py-1 text-[0.6rem] font-bold text-ivory hover:bg-ivory/30 transition-colors flex items-center gap-1"
                >
                  <Instagram className="h-3 w-3" />
                  Follow
                </a>
              </div>

              {/* Floating Product Price Tag on Reel */}
              <div className="absolute top-1/3 left-4 rounded-full bg-black/75 backdrop-blur-md px-3 py-1.5 border border-ivory/30 shadow-lg animate-bounce duration-1000">
                <div className="flex items-center gap-1.5 text-ivory">
                  <span className="h-2 w-2 rounded-full bg-terracotta" />
                  <span className="text-[0.65rem] font-bold">Mughal Duffle · ₹2,199</span>
                </div>
              </div>

              {/* Right Side Interaction Buttons */}
              <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 text-ivory z-10">
                <button
                  type="button"
                  onClick={handleToggleLike}
                  className="flex flex-col items-center gap-1 group/btn"
                  aria-label="Like reel"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-black/50 backdrop-blur-md group-hover/btn:bg-black/70 transition-colors">
                    <Heart className={`h-5 w-5 ${isLikedReel ? "fill-red-500 text-red-500" : "text-ivory"}`} />
                  </div>
                  <span className="text-[0.62rem] font-bold font-mono">{likeCount}</span>
                </button>

                <a
                  href={`https://wa.me/${WA_BASE_PHONE}?text=${encodeURIComponent(
                    "Hello Jai Fabrication, I saw your Instagram reel ad and would like to order the Mughal Botanical Duffle & Vanity Pouch!"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 group/btn"
                  aria-label="Share on WhatsApp"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-black/50 backdrop-blur-md group-hover/btn:bg-black/70 transition-colors">
                    <MessageCircle className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="text-[0.62rem] font-bold">Enquire</span>
                </a>
              </div>

              {/* Bottom Reel Caption & Shop CTA */}
              <div className="absolute bottom-4 left-4 right-4 text-ivory z-10">
                <p className="text-xs font-semibold drop-shadow-md">
                  Pink City sunsets &amp; pure cotton travels 🌸✨
                </p>
                <p className="text-[0.65rem] text-ivory/80 mt-0.5 line-clamp-1">
                  100% natural block print · Diamond quilted · 2–5 days dispatch
                </p>

                <a
                  href="#shop"
                  className="mt-3 flex items-center justify-center gap-2 w-full bg-terracotta py-2.5 text-[0.7rem] uppercase tracking-wider font-bold text-ivory rounded-sm shadow-xl hover:bg-ivory hover:text-maroon transition-all"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  Shop The Reel Edit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
