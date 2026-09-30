import { siteAssets } from "./site-assets";

export interface BulkTier {
  qty: number;
  label: string;
  discountPercent: number;
  tag?: string;
}

export const BULK_TIERS: BulkTier[] = [
  { qty: 1, label: "1 pc (Sample)", discountPercent: 0 },
  { qty: 10, label: "10 pcs", discountPercent: 5, tag: "5% OFF" },
  { qty: 25, label: "25 pcs (Weddings)", discountPercent: 10, tag: "10% OFF" },
  { qty: 50, label: "50 pcs (Events)", discountPercent: 15, tag: "15% OFF" },
  { qty: 100, label: "100 pcs (Wholesale)", discountPercent: 20, tag: "20% OFF" },
];

export function calculateTierPrice(baseUnitPrice: number, qty: number) {
  let discount = 0;
  if (qty >= 100) discount = 0.20;
  else if (qty >= 50) discount = 0.15;
  else if (qty >= 25) discount = 0.10;
  else if (qty >= 10) discount = 0.05;

  const discountedUnit = Math.round(baseUnitPrice * (1 - discount));
  const total = discountedUnit * qty;
  return {
    discountPercent: Math.round(discount * 100),
    unitPrice: discountedUnit,
    totalPrice: total,
    savings: baseUnitPrice * qty - total,
  };
}

export interface Product {
  id: string;
  name: string;
  category: "all" | "tech" | "duffles" | "pouches" | "yoga" | "totes" | "gifting";
  categoryLabel: string;
  price: number;
  formattedPrice: string;
  asset: string | null;
  placeholder: string;
  shortDescription: string;
  fullDescription: string;
  dimensions: string;
  material: string;
  craft: string;
  closure: string;
  pockets: string;
  washCare: string;
  tags: string[];
  isBestseller?: boolean;
  isNew?: boolean;
}

export const CATEGORIES = [
  { id: "all", label: "All Creations" },
  { id: "duffles", label: "Duffle & Travel" },
  { id: "tech", label: "Laptop Sleeves" },
  { id: "pouches", label: "Pouches & Vanity" },
  { id: "yoga", label: "Yoga & Active" },
  { id: "totes", label: "Totes & Shoppers" },
  { id: "gifting", label: "Sets & Favours" },
] as const;

export const PRODUCTS_DATA: Product[] = [
  // 1. Laptop Sleeves
  {
    id: "pink-ruffle-laptop-sleeve",
    name: "Pink Blossom Ruffled Quilted Laptop Sleeve",
    category: "tech",
    categoryLabel: "Laptop Sleeves",
    price: 1299,
    formattedPrice: "₹1,299",
    asset: siteAssets.pinkRuffleLaptopSleeve,
    placeholder: "Pink Ruffle Laptop Sleeve — product image",
    shortDescription: "Quilted Jaipur floral cotton with mustard ruffle trims, front bow-tie closure and scrunchie carry strap.",
    fullDescription:
      "A charming marriage of vintage femininity and modern utility. Handcrafted in 100% pure quilted cotton with shock-absorbing foam padding to keep your MacBook or laptop protected. Features contrast mustard yellow block-print ruffle borders, an adjustable front bow tie, and a matching ruched scrunchie shoulder strap.",
    dimensions: "Fits 13\" to 14.2\" Laptops / MacBooks (14\" W x 10.5\" H x 1.2\" D)",
    material: "100% Pure Cotton Voile exterior, quilted foam padding, soft cotton lining",
    craft: "Sanganeri hand-block floral repeat with artisan ruffle frill detailing",
    closure: "Protective flap with dual cotton tie-up ribbons",
    pockets: "Main padded laptop chamber + inner notebook slip slot",
    washCare: "Gentle cold hand wash, dry flat in shade. Do not tumble dry.",
    tags: ["100% Cotton", "Scrunchie Strap", "Bestseller", "Ruffle Design"],
    isBestseller: true,
    isNew: true,
  },

  // 2. Duffles & Travel
  {
    id: "pink-lemon-stripe-travel-tote",
    name: "Pink Lemon Stripe Quilted Travel Holdall",
    category: "duffles",
    categoryLabel: "Duffle & Travel",
    price: 1749,
    formattedPrice: "₹1,749",
    asset: siteAssets.pinkLemonStripeTravelTote,
    placeholder: "Pink Lemon Stripe Travel Holdall — product image",
    shortDescription: "Candy-stripe pink channel quilting with sunny yellow lemon motifs, deep front pocket and long shoulder straps.",
    fullDescription:
      "Bright, playful, and crafted for wanderlust. High-density channel quilting in candy-pink and white vertical stripes, overlaid with hand-block printed Meyer lemon bootahs. Long comfortable shoulder straps allow easy carrying over coats and jackets.",
    dimensions: "20\" L x 11\" H x 9\" D (Handle Drop: 11.5\")",
    material: "100% Heavyweight Cotton Canvas with soft channel padding",
    craft: "Two-register hand woodblock printing & vertical channel quilting",
    closure: "Smooth full-width top zipper with reinforced pull tab",
    pockets: "1 Deep front slip pocket + 1 internal zippered compartment",
    washCare: "Spot clean with mild detergent or gentle cold hand wash.",
    tags: ["100% Cotton", "Candy Stripe", "Bestseller", "Vacation Holdall"],
    isBestseller: true,
    isNew: true,
  },
  {
    id: "dusty-rose-floral-duffle",
    name: "Dusty Rose Floral Quilted Weekend Duffle",
    category: "duffles",
    categoryLabel: "Duffle & Travel",
    price: 1699,
    formattedPrice: "₹1,699",
    asset: siteAssets.dustyRoseDuffle,
    placeholder: "Dusty Rose Duffle — product image",
    shortDescription: "Pastel pink quilted cotton with botanical floral prints and candy-striped webbing straps.",
    fullDescription:
      "An ethereal travel companion tailored for weekend escapes and staycations. Features hand-block floral motifs on delicate dusty rose cotton, reinforced vertical channel quilting, candy-striped twin handles, and an adjustable detachable crossbody shoulder strap.",
    dimensions: "19\" L x 10\" H x 10\" D (Capacity: ~26 Litres)",
    material: "100% Pure Cotton with thick channel quilting & cotton lining",
    craft: "Fine-line botanical hand block printing, Jaipur atelier stitch",
    closure: "Heavy-duty antique brass zipper with dual pulls",
    pockets: "Exterior front slip pocket + inner zippered valuables pocket",
    washCare: "Spot clean with damp cloth or gentle dry clean.",
    tags: ["100% Cotton", "Weekend Duffle", "Detachable Strap"],
    isNew: true,
  },
  {
    id: "indigo-floral-barrel-duffle",
    name: "Indigo White Floral Barrel Duffle Bag",
    category: "duffles",
    categoryLabel: "Duffle & Travel",
    price: 1599,
    formattedPrice: "₹1,599",
    asset: siteAssets.indigoFloralDuffle,
    placeholder: "Indigo Floral Duffle — product image",
    shortDescription: "Classic Indigo dabu block-print with white chrysanthemum blooms, striped borders and brass hardware.",
    fullDescription:
      "Crafted with deep indigo dyes, this cylinder barrel duffle celebrates Rajasthan's iconic blue pottery and Bagru textile traditions. Quilted with fine Kantha-style stitching for structure and durability.",
    dimensions: "18\" L x 10\" Diameter (Capacity: ~24 Litres)",
    material: "100% Indigo-Dyed Cotton Canvas with reinforced inner lining",
    craft: "Traditional Indigo vat block printing with pin-stripe cotton piping",
    closure: "Sturdy metal zipper with matching block-print pull tabs",
    pockets: "Two side exterior slip pockets + 1 interior zip pocket",
    washCare: "Hand wash cold separately or dry clean.",
    tags: ["Natural Indigo", "100% Cotton", "Bestseller"],
    isBestseller: true,
  },
  {
    id: "mughal-botanical-weekender",
    name: "Mughal Botanical Quilted Holdall Bag",
    category: "duffles",
    categoryLabel: "Duffle & Travel",
    price: 1799,
    formattedPrice: "₹1,799",
    asset: siteAssets.mughalBotanicalDuffle,
    placeholder: "Mughal Botanical Duffle — product image",
    shortDescription: "Ivory cotton canvas with slate blue Mughal flower bootahs, dual side bottle pockets and striped straps.",
    fullDescription:
      "Sophisticated and roomy, this oversized weekender is inspired by royal palace courtyards. Features twin side slip pockets for water bottles/accessories, deep front passport pocket, and thick padded carrying handles.",
    dimensions: "21\" L x 12\" H x 10\" D (Capacity: ~32 Litres)",
    material: "Heavyweight 100% Kora Cotton Canvas (340 GSM)",
    craft: "Multi-register Mughal woodblock printing & channel quilting",
    closure: "Two-way heavy-gauge brass zipper",
    pockets: "2 Exterior side pockets + 1 front drop-in pocket + 2 inside compartments",
    washCare: "Dry clean recommended.",
    tags: ["Extra Roomy", "100% Cotton", "Luxury Travel"],
    isNew: true,
  },
  {
    id: "boho-patchwork-travel-duffle",
    name: "Bohemian Kantha Patchwork Travel Duffle",
    category: "duffles",
    categoryLabel: "Duffle & Travel",
    price: 1899,
    formattedPrice: "₹1,899",
    asset: siteAssets.bohoPatchworkDuffle,
    placeholder: "Boho Patchwork Duffle — product image",
    shortDescription: "Multicolour pieced artisan block-print panels with Kantha running stitches and monochrome striped piping.",
    fullDescription:
      "A true collector's piece. Each bag is a unique collage of hand-printed indigo, mustard, turquoise, and magenta cotton swatches, united by rhythmic Kantha hand quilting and black & white striped piping.",
    dimensions: "20\" L x 10.5\" Diameter (Capacity: ~28 Litres)",
    material: "100% Upcycled Pure Cotton Swatches, reinforced batting",
    craft: "Artisan Kantha patchwork & hand-block stamping",
    closure: "Heavy brass zipper with dual pulls",
    pockets: "Front slip pocket + internal zip security pocket",
    washCare: "Professional spot clean or dry clean.",
    tags: ["One of a Kind", "Kantha Quilted", "Artisan Classic"],
    isBestseller: true,
  },

  // 3. Pouches & Vanity
  {
    id: "blue-mughal-vanity-box",
    name: "Blue Mughal Flora Quilted Vanity Train Case",
    category: "pouches",
    categoryLabel: "Pouches & Vanity",
    price: 899,
    formattedPrice: "₹899",
    asset: siteAssets.blueMughalVanityBox,
    placeholder: "Blue Mughal Vanity Box — product image",
    shortDescription: "Structured box silhouette with top carry handle, azure floral bootahs and wipe-clean interior lining.",
    fullDescription:
      "Designed for skincare connoisseurs and dressing tables. Stands upright with a rigid base to prevent cosmetics from toppling over. The full zip-around lid provides a bird's-eye view of your beauty collection, while the wipe-clean barrier guards against accidental spills.",
    dimensions: "9.5\" W x 6\" H x 5.5\" D (Top Handle Drop: 3\")",
    material: "100% Pure Quilted Cotton with waterproof PVC wipe-clean interior",
    craft: "Mughal garden woodblock repeat & box-structure tailoring",
    closure: "Two-way wrap-around brass zipper",
    pockets: "Wide cavity + inner elasticized cosmetic brush bands",
    washCare: "Wipe interior with damp cloth; hand wash exterior.",
    tags: ["Top Handle", "Wipe-Clean Lining", "Bestseller", "Train Case"],
    isBestseller: true,
    isNew: true,
  },
  {
    id: "lavender-quilted-vanity-pouch",
    name: "Lavender Bloom Triangular Vanity Case",
    category: "pouches",
    categoryLabel: "Pouches & Vanity",
    price: 749,
    formattedPrice: "₹749",
    asset: siteAssets.lavenderVanityPouch,
    placeholder: "Lavender Vanity Pouch — product image",
    shortDescription: "Standing triangular silhouette in royal purple floral block print with silk tassel pull.",
    fullDescription:
      "Designed to stand upright on dressing tables and vanity counters. The triangular base allows wide-open access to skincare, makeup brushes, and toiletries. Lined with a soft wipe-clean barrier.",
    dimensions: "9\" W (base) x 7\" H x 4.5\" D",
    material: "100% Quilted Cotton exterior with water-resistant interior lining",
    craft: "Traditional Sanganeri block printing with handmade silk thread tassel",
    closure: "Top zipper with matching purple thread tassel",
    pockets: "Spacious main compartment + 2 interior lip gloss slots",
    washCare: "Wipe interior clean with damp cloth; hand wash exterior gently.",
    tags: ["Standing Base", "Water-Resistant Lining", "Bestseller"],
    isBestseller: true,
    isNew: true,
  },
  {
    id: "lime-floral-quilted-pouch",
    name: "Lime & Pink Flora Quilted Cosmetic Pouch",
    category: "pouches",
    categoryLabel: "Pouches & Vanity",
    price: 699,
    formattedPrice: "₹699",
    asset: siteAssets.limeFloralPouch,
    placeholder: "Lime Floral Pouch — product image",
    shortDescription: "Chartreuse lime cotton with pink lily block prints and dual handcrafted pom-pom tassels.",
    fullDescription:
      "Fresh, playful, and tactile. Quilted in parallel channels for cushioned protection of cosmetics, perfumes, and tech chargers. Embellished with two-tone handmade thread tassels.",
    dimensions: "8.5\" W x 5.5\" H x 3.5\" Gusset",
    material: "100% Cotton Voile with soft inner padding",
    craft: "Hand woodblock floral stamping with dual braided tassels",
    closure: "Smooth zipper with braided cotton cord pull",
    pockets: "Single wide opening with internal side elastic pockets",
    washCare: "Hand wash cold, air dry.",
    tags: ["100% Cotton", "Dual Tassels", "Gifting Favourite"],
    isNew: true,
  },
  {
    id: "pink-stripe-quilted-clutch",
    name: "Candy Pink Striped Quilted Clutch & Vanity Box",
    category: "pouches",
    categoryLabel: "Pouches & Vanity",
    price: 799,
    formattedPrice: "₹799",
    asset: siteAssets.pinkStripeClutch,
    placeholder: "Pink Stripe Clutch — product image",
    shortDescription: "Vibrant hot pink and rose striped channel quilting with block-print wristlet strap.",
    fullDescription:
      "A versatile hybrid vanity box and evening clutch. Features candy-stripe channel quilting, an attached monochrome block-printed wristlet loop for effortless carrying, and generous interior depth.",
    dimensions: "9.5\" W x 5\" H x 4\" D (Wristlet Drop: 6\")",
    material: "100% Pure Cotton with dense channel stitch quilting",
    craft: "Hand-aligned stripe quilting and block-print wristlet band",
    closure: "Top zip closure with loop wristlet handle",
    pockets: "Main cavity + internal credit card / coin slip sleeve",
    washCare: "Spot clean or gentle hand wash.",
    tags: ["Wristlet Strap", "Dual Use", "Festive Pop"],
    isNew: true,
  },
  {
    id: "yellow-quilted-pouch",
    name: "Sunlit Marigold Quilted Pouch",
    category: "pouches",
    categoryLabel: "Pouches & Vanity",
    price: 699,
    formattedPrice: "₹699",
    asset: siteAssets.yellowPouch,
    placeholder: "Yellow Quilted Pouch — product image",
    shortDescription: "Quilted yellow cotton with floral motif, hand-finished zip pouch.",
    fullDescription:
      "Bright, uplifting marigold tones printed with micro floral jaal. Softly padded with diamond quilting, making it ideal for cosmetics, stationery, tech cords, or everyday handbag organization.",
    dimensions: "9\" W x 6\" H x 3.5\" Gusset",
    material: "100% Cotton Voile with soft cotton inner padding",
    craft: "Traditional Sanganeri block printing & diamond quilting",
    closure: "Smooth nylon coil zipper with tassel pull",
    pockets: "1 Main compartment + 2 interior elasticized slip pockets",
    washCare: "Hand wash cold, reshape and dry flat.",
    tags: ["100% Cotton", "Handmade", "Gifting Favourite"],
    isBestseller: true,
  },

  // 4. Yoga & Active
  {
    id: "peach-sanganeri-yoga-mat-bag",
    name: "Peach Blossom Sanganeri Yoga Mat Carrier",
    category: "yoga",
    categoryLabel: "Yoga & Active",
    price: 1449,
    formattedPrice: "₹1,449",
    asset: siteAssets.peachSanganeriYogaMatBag,
    placeholder: "Peach Sanganeri Yoga Mat Bag — product image",
    shortDescription: "Pastel peach and sage floral geometric print with full zipper and striped shoulder strap.",
    fullDescription:
      "An uplifting, lightweight yoga mat bag for morning sadhana and studio sessions. Features full-length heavy-duty brass zipper for effortless mat insertion, breathable 100% cotton fabric, and an adjustable pink candy-striped shoulder strap.",
    dimensions: "28\" Length x 6.5\" Diameter (Fits 2mm to 8mm mats)",
    material: "100% Heavy Pure Cotton Canvas with quilted interlining",
    craft: "Sanganeri geometric floral block print & channel stitch",
    closure: "Full-length side zipper with dual brass pullers",
    pockets: "External zip key pocket + phone slip slot",
    washCare: "Gentle cold hand wash or machine wash gentle. Air dry.",
    tags: ["Fits Thick Mats", "100% Cotton", "New Arrival"],
    isNew: true,
  },
  {
    id: "tropical-safari-yoga-mat-bag",
    name: "Azure Safari Quilted Yoga Mat Carrier Bag",
    category: "yoga",
    categoryLabel: "Yoga & Active",
    price: 1499,
    formattedPrice: "₹1,499",
    asset: siteAssets.tropicalSafariYogaMatBag,
    placeholder: "Safari Yoga Mat Bag — product image",
    shortDescription: "Cerulean blue palm & wildlife hand-block print with quilted padding and adjustable shoulder strap.",
    fullDescription:
      "Take your practice to the studio or the seaside. Hand-block printed on azure cotton with exotic palm and jungle motifs. Features full-length heavy-duty zipper for easy mat loading, breathable eyelets, and a padded adjustable striped shoulder strap.",
    dimensions: "28\" Length x 6.5\" Diameter (Fits all standard & extra-thick yoga mats)",
    material: "100% Heavy Cotton Canvas with shock-resistant quilted interlining",
    craft: "Artisan multi-block tropical wildlife print & diamond quilting",
    closure: "Full-length side zipper with dual brass pullers",
    pockets: "External zip pocket for keys/phone + water bottle loop",
    washCare: "Machine wash cold gentle cycle or hand wash. Line dry.",
    tags: ["Fits Thick Mats", "100% Cotton", "Adjustable Strap", "Bestseller"],
    isBestseller: true,
    isNew: true,
  },

  // 5. Totes & Shoppers
  {
    id: "floral-canvas-tote",
    name: "Jaipur Floral Canvas Tote",
    category: "totes",
    categoryLabel: "Totes & Shoppers",
    price: 1199,
    formattedPrice: "₹1,199",
    asset: siteAssets.floralTote,
    placeholder: "Floral Tote — product image",
    shortDescription: "Hand-block floral repeat on structured cotton canvas with reinforced handles.",
    fullDescription:
      "Crafted with heritage teak wooden blocks, this spacious cotton tote is designed for everyday elegance, market trips, or weekend strolls. Features double-stitched shoulder straps, a magnetic top closure, and a secure inner zippered pocket.",
    dimensions: "16\" H x 15\" W x 4.5\" D (Handle Drop: 10.5\")",
    material: "100% Heavyweight Cotton Canvas (320 GSM)",
    craft: "Hand-carved wooden block print, azo-free pigments",
    closure: "Antique brass magnetic snap button",
    pockets: "1 Inner zippered security pocket + 1 quick-access slip pocket",
    washCare: "Gentle cold hand wash with mild detergent. Line dry in shade.",
    tags: ["100% Cotton", "Handmade", "Bestseller"],
    isBestseller: true,
  },

  // 6. Gifting & Sets
  {
    id: "peach-pleated-clutch-trio",
    name: "3-Piece Peach Pleated Cosmetic Clutch Nest",
    category: "gifting",
    categoryLabel: "Sets & Favours",
    price: 1349,
    formattedPrice: "₹1,349",
    asset: siteAssets.peachPleatedClutchTrio,
    placeholder: "Peach Pleated Clutch Trio — product image",
    shortDescription: "Curated set of 3 pleated channel-quilted clutches with handcrafted beaded tassels.",
    fullDescription:
      "A stunning trio of pleated cosmetic pouches in graduating sizes. Hand-block printed on soft peach cotton with botanical leaves. Each pouch features artisanal channel tuck pleating and is finished with hand-strung glass beaded tassels on the zipper pulls.",
    dimensions: "Small: 6.5\"x4.5\" | Medium: 8.5\"x6\" | Large: 10.5\"x7.5\"",
    material: "100% Pure Quilted Cotton with handcrafted tuck pleating",
    craft: "Tuck-pleat tailoring & block printing with beaded pull tassels",
    closure: "Smooth metal zippers with beaded tassel pulls",
    pockets: "Three discrete pouch organizer cavities",
    washCare: "Spot clean or gentle cold hand wash.",
    tags: ["Set of 3", "Beaded Tassels", "Gifting Favourite", "New Arrival"],
    isNew: true,
    isBestseller: true,
  },
  {
    id: "nesting-pouch-set-3pc",
    name: "3-Piece Gifting Nest Pouch Set",
    category: "gifting",
    categoryLabel: "Sets & Favours",
    price: 1299,
    formattedPrice: "₹1,299",
    asset: siteAssets.yellowPouch,
    placeholder: "3-Piece Pouch Set — product image",
    shortDescription: "Set of three nesting quilted pouches in complementary Jaipur motifs.",
    fullDescription:
      "A curated trio of Small (jewellery/coins), Medium (cosmetics/chargers), and Large (toiletry/skincare) quilted pouches. Tied with a pure cotton block-printed ribbon, making it an ideal gift.",
    dimensions: "Small: 6\"x4\" | Medium: 8\"x5.5\" | Large: 10\"x7\"",
    material: "100% Pure Quilted Cotton with soft piping",
    craft: "Harmonized 3-pattern hand block print collection",
    closure: "Quality zip closures with matching cotton zipper tabs",
    pockets: "Individual pouch organization compartments",
    washCare: "Gentle cold hand wash.",
    tags: ["Gift Boxed", "Set of 3", "Best Value"],
    isBestseller: true,
  },
];
