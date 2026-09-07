import { useState, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  CheckCircle2,
  Film,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { siteAssets } from "@/lib/site-assets";
import { WA_BASE_PHONE } from "@/lib/cart-context";

interface CraftReel {
  id: string;
  stage: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  fallbackPoster: string;
  duration: string;
  artisanQuote: string;
  artisanName: string;
}

const CRAFT_REELS: CraftReel[] = [
  {
    id: "block-carving",
    stage: "Woodcraft",
    stepNumber: "01",
    title: "Hand-Carving Sheesham Teak Blocks",
    subtitle: "Master chiseling with 0.5mm precision",
    description:
      "Every motif begins as a hand-drawn illustration transferred onto seasoned desert teakwood. Master block carvers in Jaipur chip away negative space using hardened steel chisels, taking up to 3 days per complex multi-colour block set.",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-hands-of-an-artisan-working-on-a-pottery-wheel-41484-large.mp4",
    fallbackPoster: siteAssets.hero || "",
    duration: "0:45",
    artisanQuote: "A woodblock holds the memory of 50,000 strikes. If the wood is true, the print sings.",
    artisanName: "Ustad Ramprasad Ji · Master Block Carver",
  },
  {
    id: "hand-stamping",
    stage: "Printing",
    stepNumber: "02",
    title: "Rhythmic Hand Block Stamping",
    subtitle: "Pinpoint registration on 100% cotton canvas",
    description:
      "Artisans dip wooden blocks into custom-blended mineral and vegetable pigment trays. With three rhythmic taps of the fist per strike, colour is transferred repeat by repeat across 12-meter printing tables with razor-sharp alignment.",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-spinning-wool-with-a-spindle-41845-large.mp4",
    fallbackPoster: siteAssets.mughalBotanicalDuffle || "",
    duration: "1:10",
    artisanQuote: "No machine can replicate the subtle breath and warmth of hand-pressed pigment.",
    artisanName: "Mohammad Arif · Sanganeri Master Printer",
  },
  {
    id: "sun-curing",
    stage: "Curing",
    stepNumber: "03",
    title: "Sun-Curing on Jaipur Terraces",
    subtitle: "Fixing natural dyes under the Rajasthan sun",
    description:
      "Freshly stamped cotton lengths are carried to open rooftop terraces where Rajasthan’s golden sun cures and locks the natural pigments. The fabric is then washed in flowing water to fix colour fastness.",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-seamstress-sewing-a-piece-of-fabric-41846-large.mp4",
    fallbackPoster: siteAssets.peachSanganeriYogaMatBag || "",
    duration: "0:52",
    artisanQuote: "The Jaipur sunlight gives our terracotta and indigo their signature earthy depth.",
    artisanName: "Shanti Bai · Master Dye Finisher",
  },
  {
    id: "quilting-tailoring",
    stage: "Tailoring",
    stepNumber: "04",
    title: "Diamond Quilting & Hand Finishing",
    subtitle: "Reinforced piping, brass hardware & pure cotton batting",
    description:
      "Printed panels are sandwiched with high-loft pure cotton wadding and diamond quilted line by line. Heavy-duty antique brass zippers, reinforced webbing straps, and piped edges are assembled in our Hawa Sadak workshop.",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-craftsman-cutting-leather-with-a-blade-41848-large.mp4",
    fallbackPoster: siteAssets.blueMughalVanityBox || "",
    duration: "1:25",
    artisanQuote: "We double-stitch every stress point so your duffle travels with you for a decade.",
    artisanName: "Kailash Gurjar · Head Tailoring Craftsman",
  },
];

export function CraftVideoShowcase() {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedModalVideo, setSelectedModalVideo] = useState<CraftReel | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeReel = CRAFT_REELS[activeReelIndex];

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      id="craft-videos"
      className="bg-sandstone/25 py-20 lg:py-28 border-t border-border/70 relative overflow-hidden"
      aria-labelledby="craft-video-heading"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-maroon/20 bg-background/80 px-3.5 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-maroon font-semibold mb-3">
              <Film className="h-3.5 w-3.5 text-terracotta" />
              Workshop Reel &amp; Motion Visuals
            </div>
            <h2
              id="craft-video-heading"
              className="font-serif text-4xl text-maroon sm:text-5xl font-medium"
            >
              Watch the craft in motion.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Step inside our Jaipur atelier on Hawa Sadak. Witness the ancient wooden block stamping,
              sun-cured natural dyes, and diamond quilting that brings every Jai Fabrication bag to life.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${WA_BASE_PHONE}?text=${encodeURIComponent(
                "Hello Jai Fabrication, I would like to book a workshop tour / video consultation for custom block print bags."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-maroon px-4 py-2.5 text-xs uppercase tracking-widest text-maroon font-semibold transition-colors hover:bg-maroon hover:text-ivory rounded-sm shadow-xs"
            >
              <MessageCircle className="h-3.5 w-3.5 text-terracotta" />
              Book Workshop Tour
            </a>
          </div>
        </div>

        {/* Main Video Cinema Showcase */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          {/* Left Column: Video Cinema Player */}
          <div className="relative overflow-hidden rounded-md border border-maroon/20 bg-maroon/95 shadow-2xl group aspect-[16/10] sm:aspect-[16/9]">
            {/* Live Video Element */}
            <video
              ref={videoRef}
              key={activeReel.videoUrl}
              src={activeReel.videoUrl}
              poster={activeReel.fallbackPoster}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="h-full w-full object-cover opacity-90 transition-opacity duration-500"
            />

            {/* Video Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 via-maroon/20 to-transparent pointer-events-none" />

            {/* Top Bar on Video */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-ivory">
              <div className="flex items-center gap-2 bg-maroon/80 backdrop-blur-md px-3 py-1 rounded-full border border-ivory/20 text-[0.65rem] uppercase tracking-wider font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Atelier Reel · {activeReel.stage}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleMute}
                  className="grid h-8 w-8 place-items-center rounded-full bg-background/40 backdrop-blur-md text-ivory hover:bg-background/70 transition-colors"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedModalVideo(activeReel)}
                  className="grid h-8 w-8 place-items-center rounded-full bg-background/40 backdrop-blur-md text-ivory hover:bg-background/70 transition-colors"
                  aria-label="Expand Cinema View"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Center Play/Pause Overlay Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button
                type="button"
                onClick={handleTogglePlay}
                className="pointer-events-auto grid h-14 w-14 place-items-center rounded-full bg-ivory text-maroon shadow-2xl transition-transform hover:scale-110 active:scale-95 group-hover:opacity-100 opacity-90"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause className="h-6 w-6 fill-maroon" /> : <Play className="h-6 w-6 fill-maroon ml-0.5" />}
              </button>
            </div>

            {/* Bottom Info Bar on Video */}
            <div className="absolute bottom-4 left-4 right-4 text-ivory pointer-events-auto">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-terracotta text-sm font-bold tracking-widest">
                  STAGE {activeReel.stepNumber}
                </span>
                <span className="text-ivory/60 text-xs">/ 04</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight drop-shadow-md">
                {activeReel.title}
              </h3>
              <p className="mt-1 text-xs text-ivory/80 line-clamp-1 max-w-lg drop-shadow-sm">
                {activeReel.subtitle}
              </p>
            </div>
          </div>

          {/* Right Column: Step-by-Step Reel Selector */}
          <div className="space-y-3">
            {CRAFT_REELS.map((reel, idx) => {
              const isSelected = idx === activeReelIndex;
              return (
                <button
                  key={reel.id}
                  type="button"
                  onClick={() => {
                    setActiveReelIndex(idx);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left p-4 rounded-md border transition-all duration-300 flex items-start gap-4 ${
                    isSelected
                      ? "bg-card border-terracotta shadow-md ring-1 ring-terracotta/30"
                      : "bg-background/80 border-border/80 hover:border-maroon/40 hover:bg-card"
                  }`}
                >
                  <div
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-sm font-serif text-base font-bold ${
                      isSelected ? "bg-maroon text-ivory" : "bg-secondary text-maroon/70"
                    }`}
                  >
                    {reel.stepNumber}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[0.62rem] uppercase tracking-widest text-terracotta font-semibold">
                        {reel.stage}
                      </span>
                      <span className="text-[0.62rem] text-muted-foreground font-mono">
                        {reel.duration}
                      </span>
                    </div>
                    <h4 className="font-serif text-base font-semibold text-maroon truncate">
                      {reel.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
                      {reel.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Artisan Quote Banner */}
        <div className="mt-8 rounded-md border border-maroon/20 bg-background/90 p-5 backdrop-blur-sm shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sandstone text-maroon font-serif font-bold">
              JF
            </div>
            <div>
              <p className="font-serif italic text-sm text-foreground/90">
                “{activeReel.artisanQuote}”
              </p>
              <p className="text-[0.65rem] uppercase tracking-wider text-terracotta font-semibold mt-0.5">
                — {activeReel.artisanName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedModalVideo(activeReel)}
            className="shrink-0 inline-flex items-center gap-2 bg-maroon px-4 py-2 text-[0.68rem] uppercase tracking-widest text-ivory font-semibold rounded-sm hover:bg-terracotta transition-colors shadow-xs"
          >
            <Film className="h-3.5 w-3.5" />
            Watch Full Reel
          </button>
        </div>
      </div>

      {/* Expanded Cinema Modal */}
      {selectedModalVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in"
        >
          <div className="relative w-full max-w-4xl overflow-hidden rounded-md bg-maroon border border-ivory/20 shadow-2xl">
            {/* Modal Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src={selectedModalVideo.videoUrl}
                poster={selectedModalVideo.fallbackPoster}
                autoPlay
                controls
                playsInline
                className="h-full w-full object-contain"
              />
            </div>

            {/* Modal Footer Info */}
            <div className="p-6 bg-sandstone/15 text-ivory flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[0.65rem] uppercase tracking-widest text-sandstone font-bold">
                  Stage {selectedModalVideo.stepNumber} · {selectedModalVideo.stage}
                </span>
                <h3 className="font-serif text-2xl font-bold mt-0.5 text-ivory">
                  {selectedModalVideo.title}
                </h3>
                <p className="text-xs text-ivory/80 max-w-xl mt-1 leading-relaxed">
                  {selectedModalVideo.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedModalVideo(null)}
                  className="rounded-sm bg-ivory/20 px-4 py-2 text-xs uppercase tracking-widest text-ivory hover:bg-ivory/30 transition-colors font-semibold"
                >
                  Close Cinema
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
