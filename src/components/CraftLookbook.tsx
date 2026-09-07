import { useState } from "react";
import { siteAssets } from "@/lib/site-assets";
import { AssetImage } from "@/components/AssetImage";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sparkles, ZoomIn, Eye, ArrowUpRight } from "lucide-react";

interface LookbookItem {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  details: string[];
  image: string | null;
  placeholder: string;
}

const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: "teak-carving",
    step: "Phase 01",
    title: "Hand Carving the Teak Blocks",
    subtitle: "A craft passed down through five generations",
    location: "Sanganer Workshop, Jaipur",
    description:
      "Every block begins with seasoned Sheesham (Indian Rosewood) or Teak wood. Master carvers, known as 'Batikars', use miniature chisels ('tinkas') to meticulously carve intricate floral jali patterns entirely by hand.",
    details: [
      "Requires 7–10 days of precision hand-chiselling per intricate motif",
      "Wood is soaked in mustard oil for 15 days to prevent warping during printing",
      "Air-release holes are drilled by hand to ensure flat, even dye suction",
    ],
    image: siteAssets.hero,
    placeholder: "Artisan carving teak wood block in Jaipur workshop",
  },
  {
    id: "pigment-mixing",
    step: "Phase 02",
    title: "Botanical Dyes & Pigment Mixing",
    subtitle: "Harmonizing the colors of Rajasthan",
    location: "Bagru Natural Vat House",
    description:
      "Our distinct palette of Sandstone Pink, Terracotta, Indigo, and Marigold Yellow is mixed by master colorists ('Rangrez'). We use azo-free, skin-friendly pigments and traditional mud-resist dabu pastes.",
    details: [
      "Natural indigo fermented in underground terracotta vats",
      "Hard water from local wells gives the distinctive Jaipur color vibrancy",
      "Azo-free, hypoallergenic, and gentle on sensitive skin",
    ],
    image: siteAssets.floralTote,
    placeholder: "Artisan mixing natural terracotta and indigo pigments",
  },
  {
    id: "rhythmic-stamping",
    step: "Phase 03",
    title: "Rhythmic Table Stamping",
    subtitle: "The signature heartbeat of the printing table",
    location: "Hawa Sadak Printing Atelier",
    description:
      "Stretched tightly across 6-meter long padded printing tables, 100% pure cotton is stamped section by section. The artisan strikes the block with the heel of their hand in a rhythmic dance, repeating each bootah with pinpoint visual registration.",
    details: [
      "Up to 8 individual wooden blocks used per multi-colored piece",
      "Minor organic variations in alignment celebrate authentic human craft",
      "Printed only during optimal ambient humidity and daylight hours",
    ],
    image: siteAssets.patchworkDuffle,
    placeholder: "Master craftsman hand stamping cotton fabric with wooden block",
  },
  {
    id: "courtyard-curing",
    step: "Phase 04",
    title: "Sun-Curing in Jaipur Courtyards",
    subtitle: "Basking under the desert sunshine",
    location: "Open Courtyards of Jaipur",
    description:
      "After printing, fabrics are hung across open-air bamboo terraces under the warm Rajasthani sun. Solar curing deepens the pigment bonds before the fabric is tailored, quilted, and finished with reinforced stitching.",
    details: [
      "Natural sun exposure oxidizes and fixes organic pigments into the cotton fibers",
      "Washed in fresh running water to remove excess surface dyes",
      "Precision diamond quilting and edge binding completed by our tailoring unit",
    ],
    image: siteAssets.yellowPouch,
    placeholder: "Hand-printed cotton fabrics drying in sunlit Jaipur courtyard",
  },
];

export function CraftLookbook() {
  const [activeItem, setActiveItem] = useState<LookbookItem | null>(null);

  return (
    <section
      id="lookbook"
      className="bg-background py-20 lg:py-28 border-t border-border/70"
      aria-labelledby="lookbook-heading"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="rule-eyebrow">Artisan Heritage Lookbook</p>
            <h2
              id="lookbook-heading"
              className="mt-4 font-serif text-4xl text-maroon sm:text-5xl"
            >
              Behind the Printing Table.
            </h2>
            <p className="mt-4 text-base text-foreground/80 leading-relaxed">
              Explore the timeless four-step journey of traditional Rajasthani woodblock artistry — 
              from hand-chiselled teak blocks to sunlit courtyard drying.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-medium text-terracotta">
            <Sparkles className="h-4 w-4" />
            <span>Click any frame to inspect the artisan craft</span>
          </div>
        </div>

        {/* 4-Grid Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LOOKBOOK_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer flex flex-col justify-between rounded-sm border border-border/70 bg-card p-4 transition-all duration-300 hover:border-terracotta/60 hover:shadow-[var(--shadow-soft)]"
            >
              <div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary">
                  <AssetImage
                    src={item.image}
                    alt={item.title}
                    placeholderLabel={item.placeholder}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-maroon/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 bg-ivory/95 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-maroon shadow-md">
                      <ZoomIn className="h-3.5 w-3.5" /> Inspect Craft
                    </span>
                  </div>
                  <span className="absolute top-2.5 left-2.5 bg-background/90 backdrop-blur-xs px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest text-maroon border border-border/80">
                    {item.step}
                  </span>
                </div>

                <div className="mt-4">
                  <span className="text-[0.65rem] uppercase tracking-wider text-terracotta font-medium block">
                    {item.location}
                  </span>
                  <h3 className="font-serif text-lg text-maroon mt-1 leading-snug group-hover:text-terracotta transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[0.7rem] uppercase tracking-wider text-maroon font-semibold">
                <span>View story</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lookbook Detail Dialog */}
      <Dialog open={!!activeItem} onOpenChange={(open) => !open && setActiveItem(null)}>
        <DialogContent className="max-w-2xl bg-background p-0 sm:rounded-sm overflow-hidden border-border shadow-2xl">
          {activeItem && (
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr]">
              <div className="relative aspect-[4/5] bg-secondary sm:h-full">
                <AssetImage
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-maroon text-ivory px-2.5 py-1 text-xs font-semibold uppercase tracking-widest">
                  {activeItem.step}
                </span>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-terracotta font-semibold">
                    {activeItem.location}
                  </p>
                  <DialogTitle className="font-serif text-2xl text-maroon mt-1 leading-snug">
                    {activeItem.title}
                  </DialogTitle>
                  <p className="text-xs text-muted-foreground italic mt-0.5">
                    "{activeItem.subtitle}"
                  </p>

                  <DialogDescription className="mt-4 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                    {activeItem.description}
                  </DialogDescription>

                  <div className="mt-5 space-y-2 border-t border-border/70 pt-4">
                    <p className="text-[0.68rem] uppercase tracking-[0.18em] text-maroon font-semibold">
                      Artisan Technique Details:
                    </p>
                    <ul className="space-y-1.5 text-xs text-foreground/75 list-disc list-inside">
                      {activeItem.details.map((d, i) => (
                        <li key={i} className="leading-relaxed">
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60">
                  <a
                    href="#shop"
                    onClick={() => setActiveItem(null)}
                    className="inline-flex w-full items-center justify-center bg-maroon px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory hover:bg-terracotta transition-colors font-semibold"
                  >
                    Shop Handcrafted Bags from this Craft
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
