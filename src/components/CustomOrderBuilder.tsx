import { useState } from "react";
import { MessageCircle, CheckCircle2, Sparkles, PackageCheck, Send, Layers, Calendar, HelpCircle } from "lucide-react";
import { WA_BASE_PHONE } from "@/lib/cart-context";

const OCCASIONS = [
  {
    id: "wedding",
    title: "Wedding & Mehendi Favours",
    desc: "Return gifts, bridesmaid pouches, welcome hamper totes.",
    icon: "💍",
  },
  {
    id: "corporate",
    title: "Corporate & Event Gifting",
    desc: "Sustainable cotton merch, conference kits, festival gifts.",
    icon: "🏢",
  },
  {
    id: "boutique",
    title: "Boutique & Retail Resale",
    desc: "Curated collections for lifestyle stores and concept shops.",
    icon: "🛍️",
  },
  {
    id: "custom",
    title: "Bespoke & Personal Projects",
    desc: "Family celebrations, anniversaries, yoga retreats.",
    icon: "✨",
  },
];

const SILHOUETTES = [
  { id: "tote", name: "Handmade Cotton Tote Bags", range: "₹450 - ₹750/pc in bulk" },
  { id: "pouch", name: "Quilted Zipper Pouches", range: "₹250 - ₹450/pc in bulk" },
  { id: "duffle", name: "Artisan Travel Duffle Bags", range: "₹850 - ₹1,200/pc in bulk" },
  { id: "sling", name: "Crossbody Slings & Organizers", range: "₹380 - ₹600/pc in bulk" },
  { id: "mixed", name: "Mixed Bundle / Assorted Set", range: "Custom pricing" },
];

const TIERS = [
  { id: "25-50", label: "25 – 50 pcs", desc: "Intimate Gatherings", time: "3–5 days" },
  { id: "51-150", label: "51 – 150 pcs", desc: "Popular for Weddings", time: "5–8 days" },
  { id: "151-500", label: "151 – 500 pcs", desc: "Corporate & Large Events", time: "8–14 days" },
  { id: "500+", label: "500+ pcs", desc: "Bulk Wholesale & Export", time: "12–20 days" },
];

const CUSTOMIZATIONS = [
  { id: "custom_block", label: "Custom Wooden Block Motif (Bespoke print design)" },
  { id: "logo_tag", label: "Custom Brand / Couple Monogram Label Tag" },
  { id: "color_match", label: "Custom Colour Palette (Pantone / Theme matching)" },
  { id: "gift_wrap", label: "Gift Box Packaging & Cotton Ribbon Tie" },
];

export function CustomOrderBuilder() {
  const [occasion, setOccasion] = useState(OCCASIONS[0].id);
  const [silhouette, setSilhouette] = useState(SILHOUETTES[0].id);
  const [tier, setTier] = useState(TIERS[1].id);
  const [selectedCustoms, setSelectedCustoms] = useState<string[]>([CUSTOMIZATIONS[1].id]);
  const [targetDate, setTargetDate] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const toggleCustomization = (id: string) => {
    setSelectedCustoms((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSendCustomInquiry = () => {
    const occObj = OCCASIONS.find((o) => o.id === occasion);
    const silObj = SILHOUETTES.find((s) => s.id === silhouette);
    const tierObj = TIERS.find((t) => t.id === tier);
    const customList = selectedCustoms
      .map((c) => CUSTOMIZATIONS.find((item) => item.id === c)?.label)
      .filter(Boolean);

    const messageLines = [
      "🌸 *JAI FABRICATION — CUSTOM & BULK ORDER BRIEF*",
      "Namaste! I would like to request a quotation for a custom batch of handmade bags:",
      "",
      `📌 *Occasion / Purpose:* ${occObj?.title}`,
      `👜 *Bag Silhouette:* ${silObj?.name}`,
      `📦 *Quantity Tier:* ${tierObj?.label} (${tierObj?.desc})`,
      `⏱️ *Estimated Production:* ${tierObj?.time}`,
    ];

    if (customList.length > 0) {
      messageLines.push("✨ *Customization Preferences:*");
      customList.forEach((c) => messageLines.push(`   • ${c}`));
    }

    if (targetDate) {
      messageLines.push(`📅 *Required By Date:* ${targetDate}`);
    }

    if (additionalNotes.trim()) {
      messageLines.push(`📝 *Specific Requirements:* ${additionalNotes.trim()}`);
    }

    messageLines.push("");
    messageLines.push("Please share catalog samples, bulk pricing sheet, and lead time confirmation. Thank you!");

    const url = `https://wa.me/${WA_BASE_PHONE}?text=${encodeURIComponent(messageLines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="custom"
      className="relative overflow-hidden py-20 text-ivory lg:py-28"
      style={{ backgroundImage: "var(--gradient-maroon)" }}
      aria-labelledby="custom-builder-title"
    >
      <div
        aria-hidden="true"
        className="motif-field pointer-events-none absolute inset-0 opacity-25"
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
        <div className="max-w-3xl">
          <p className="rule-eyebrow text-ivory/70">Bespoke Workshop Atelier</p>
          <h2
            id="custom-builder-title"
            className="mt-4 font-serif text-4xl leading-tight sm:text-5xl"
          >
            Custom Prints, Wedding Favours &amp; Bulk Orders
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ivory/85 sm:text-lg">
            Every piece is dyed, stamped, and stitched by master artisans in our Jaipur workshop.
            Configure your order requirements below for an instant WhatsApp estimate.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.35fr_0.85fr] lg:items-start">
          {/* Form Interactive Steps */}
          <div className="space-y-8 bg-black/20 p-6 sm:p-8 backdrop-blur-md border border-ivory/15 rounded-sm">
            {/* Step 1: Occasion */}
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-sandstone font-medium mb-3 flex items-center gap-1.5">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-sandstone/20 text-ivory text-xs font-bold">
                  1
                </span>
                Select Occasion or Project Type
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OCCASIONS.map((occ) => {
                  const isSelected = occasion === occ.id;
                  return (
                    <button
                      key={occ.id}
                      type="button"
                      onClick={() => setOccasion(occ.id)}
                      className={`text-left p-4 rounded-sm border transition-all ${
                        isSelected
                          ? "border-ivory bg-ivory/15 shadow-md ring-1 ring-ivory"
                          : "border-ivory/15 bg-ivory/5 hover:bg-ivory/10 hover:border-ivory/30"
                      }`}
                    >
                      <span className="text-xl mb-1.5 block">{occ.icon}</span>
                      <p className="font-serif text-base font-semibold text-ivory">
                        {occ.title}
                      </p>
                      <p className="text-xs text-ivory/70 mt-1 leading-relaxed">
                        {occ.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Bag Silhouette */}
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-sandstone font-medium mb-3 flex items-center gap-1.5">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-sandstone/20 text-ivory text-xs font-bold">
                  2
                </span>
                Select Bag Silhouette
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SILHOUETTES.map((sil) => {
                  const isSelected = silhouette === sil.id;
                  return (
                    <button
                      key={sil.id}
                      type="button"
                      onClick={() => setSilhouette(sil.id)}
                      className={`text-left p-3.5 rounded-sm border transition-all ${
                        isSelected
                          ? "border-ivory bg-ivory/15 ring-1 ring-ivory"
                          : "border-ivory/15 bg-ivory/5 hover:bg-ivory/10"
                      }`}
                    >
                      <p className="text-sm font-medium text-ivory">{sil.name}</p>
                      <p className="text-[0.68rem] text-sandstone mt-0.5">{sil.range}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Quantity Tier */}
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-sandstone font-medium mb-3 flex items-center gap-1.5">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-sandstone/20 text-ivory text-xs font-bold">
                  3
                </span>
                Select Quantity Tier
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {TIERS.map((t) => {
                  const isSelected = tier === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTier(t.id)}
                      className={`text-center p-3 rounded-sm border transition-all ${
                        isSelected
                          ? "border-ivory bg-ivory/20 ring-1 ring-ivory"
                          : "border-ivory/15 bg-ivory/5 hover:bg-ivory/10"
                      }`}
                    >
                      <p className="font-serif text-lg font-bold text-ivory">{t.label}</p>
                      <p className="text-[0.65rem] text-ivory/70 mt-0.5">{t.desc}</p>
                      <span className="mt-2 inline-block rounded-full bg-sandstone/20 px-2 py-0.5 text-[0.6rem] text-sandstone">
                        {t.time}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Customization Options */}
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-sandstone font-medium mb-3 flex items-center gap-1.5">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-sandstone/20 text-ivory text-xs font-bold">
                  4
                </span>
                Customization Preferences
              </p>
              <div className="space-y-2">
                {CUSTOMIZATIONS.map((c) => {
                  const isChecked = selectedCustoms.includes(c.id);
                  return (
                    <label
                      key={c.id}
                      onClick={() => toggleCustomization(c.id)}
                      className={`flex cursor-pointer items-center gap-3 p-3 rounded-sm border transition-all ${
                        isChecked
                          ? "border-ivory/50 bg-ivory/10 text-ivory"
                          : "border-ivory/15 bg-ivory/5 text-ivory/75 hover:bg-ivory/10"
                      }`}
                    >
                      <div
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-sm border ${
                          isChecked
                            ? "bg-ivory text-maroon border-ivory"
                            : "border-ivory/40 bg-transparent"
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="h-3.5 w-3.5 stroke-[2.5]" />}
                      </div>
                      <span className="text-xs sm:text-sm font-medium">{c.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label
                  htmlFor="target-date"
                  className="block text-xs uppercase tracking-wider text-sandstone font-medium mb-1.5"
                >
                  Event / Required Date (Optional)
                </label>
                <input
                  id="target-date"
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full rounded-sm border border-ivory/20 bg-ivory/10 p-2.5 text-xs text-ivory focus:border-ivory focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="bulk-notes"
                  className="block text-xs uppercase tracking-wider text-sandstone font-medium mb-1.5"
                >
                  Specific Details / Colours
                </label>
                <input
                  id="bulk-notes"
                  type="text"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="e.g. Mustard yellow and sage green palette"
                  className="w-full rounded-sm border border-ivory/20 bg-ivory/10 p-2.5 text-xs text-ivory placeholder:text-ivory/40 focus:border-ivory focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Live Summary Brief Card */}
          <div className="sticky top-24 rounded-sm border border-ivory/30 bg-black/30 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
            <div className="border-b border-ivory/20 pb-4">
              <span className="rule-eyebrow text-sandstone">Live Order Brief</span>
              <h3 className="font-serif text-2xl text-ivory mt-1">
                Your Custom Project Summary
              </h3>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between items-start gap-2">
                <span className="text-ivory/70">Occasion:</span>
                <span className="font-medium text-ivory text-right">
                  {OCCASIONS.find((o) => o.id === occasion)?.title}
                </span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-ivory/70">Style:</span>
                <span className="font-medium text-ivory text-right">
                  {SILHOUETTES.find((s) => s.id === silhouette)?.name}
                </span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-ivory/70">Volume:</span>
                <span className="font-medium text-sandstone text-right">
                  {TIERS.find((t) => t.id === tier)?.label} ({TIERS.find((t) => t.id === tier)?.time})
                </span>
              </div>
              {selectedCustoms.length > 0 && (
                <div className="border-t border-ivory/15 pt-2.5">
                  <span className="text-ivory/70 block mb-1">Custom Features:</span>
                  <ul className="list-disc list-inside space-y-1 text-ivory/90 pl-1">
                    {selectedCustoms.map((c) => (
                      <li key={c} className="truncate">
                        {CUSTOMIZATIONS.find((item) => item.id === c)?.label.split("(")[0]}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="rounded-sm bg-ivory/10 p-3.5 text-xs text-ivory/80 leading-relaxed border border-ivory/10">
              <p className="font-semibold text-ivory flex items-center gap-1 mb-1">
                <Sparkles className="h-3.5 w-3.5 text-sandstone" /> Direct Jaipur Workshop:
              </p>
              We craft samples before full batch production. Custom teak block carving starts from 3 days.
            </div>

            <button
              type="button"
              onClick={handleSendCustomInquiry}
              className="w-full flex items-center justify-center gap-2.5 bg-ivory px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-maroon transition-all hover:bg-sandstone active:scale-[0.99] shadow-xl"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Get WhatsApp Bulk Quote</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
