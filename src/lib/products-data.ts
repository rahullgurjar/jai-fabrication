import { siteAssets } from "./site-assets";

export interface Product {
  id: string;
  name: string;
  category: "totes" | "duffles" | "pouches" | "slings" | "gifting";
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
  { id: "totes", label: "Totes & Shoppers" },
  { id: "duffles", label: "Duffle & Travel" },
  { id: "pouches", label: "Pouches & Vanity" },
  { id: "slings", label: "Crossbody & Slings" },
  { id: "gifting", label: "Favours & Sets" },
] as const;

export const PRODUCTS_DATA: Product[] = [
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
  {
    id: "patchwork-duffle-bag",
    name: "Heritage Patchwork Weekend Duffle",
    category: "duffles",
    categoryLabel: "Duffle & Travel",
    price: 1499,
    formattedPrice: "₹1,499",
    asset: siteAssets.patchworkDuffle,
    placeholder: "Patchwork Duffle — product image",
    shortDescription: "Pieced block-print panels, quilted padding, roomy weekend silhouette.",
    fullDescription:
      "A masterpiece of Jaipur artisan quilting. Individual hand-printed fabric panels are pieced together in harmonious symmetry. Thick quilted cotton batting provides structural protection for weekend getaways, yoga gear, and travel essentials.",
    dimensions: "20\" L x 10.5\" Diameter (Capacity: ~28 Litres)",
    material: "100% Pure Quilted Cotton with recycled cotton inner lining",
    craft: "Pieced artisan patchwork & Kantha-inspired quilting",
    closure: "Heavy-duty YKK brass zipper with cotton pull tab",
    pockets: "2 Outer side slip pockets + 1 internal zippered compartment",
    washCare: "Spot clean or dry clean recommended to preserve quilt structure.",
    tags: ["Quilted", "100% Cotton", "Travel Essential"],
    isBestseller: true,
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
  {
    id: "mughal-garden-shopper",
    name: "Mughal Garden Oversized Shopper",
    category: "totes",
    categoryLabel: "Totes & Shoppers",
    price: 1349,
    formattedPrice: "₹1,349",
    asset: siteAssets.floralTote,
    placeholder: "Mughal Garden Shopper — product image",
    shortDescription: "Intricate floral bootah block print on unbleached natural kora cotton.",
    fullDescription:
      "Inspired by the royal gardens of Amer Fort, this oversized shopper carries laptops, books, and essentials with ease. Structured base with piped cotton trim for enduring shape.",
    dimensions: "17\" H x 18\" W x 5\" D (Handle Drop: 11\")",
    material: "100% Unbleached Kora Cotton Canvas",
    craft: "Multi-colour hand block printing with brass-fitted teak blocks",
    closure: "Cotton tie-up ribbons & inner magnetic clasp",
    pockets: "2 Inner drop-in phone/sunglass pockets",
    washCare: "Cold gentle wash, iron on reverse side.",
    tags: ["100% Cotton", "Extra Roomy", "New Arrival"],
    isNew: true,
  },
  {
    id: "indigo-bagru-holdall",
    name: "Indigo Bagru Travel Holdall",
    category: "duffles",
    categoryLabel: "Duffle & Travel",
    price: 1699,
    formattedPrice: "₹1,699",
    asset: siteAssets.patchworkDuffle,
    placeholder: "Indigo Bagru Holdall — product image",
    shortDescription: "Natural indigo dabu mud-resist print with reinforced vegan leather trims.",
    fullDescription:
      "Handcrafted using centuries-old Bagru mud-resist techniques and fermented indigo vat dips. Generously sized with padded shoulder strap for effortless long-distance travel.",
    dimensions: "22\" L x 11.5\" H x 11\" D",
    material: "100% Hand-dyed Bagru Cotton with water-resistant inner lining",
    craft: "Traditional Dabu mud resist & natural Indigo vat dyeing",
    closure: "Two-way brass zipper with lockable pulls",
    pockets: "Front exterior zip pocket + large shoe compartment",
    washCare: "Professional dry clean recommended.",
    tags: ["Natural Indigo", "100% Cotton", "Artisan Classic"],
    isNew: true,
  },
  {
    id: "peacock-cosmetic-pouch",
    name: "Turquoise Peacock Cosmetic Pouch",
    category: "pouches",
    categoryLabel: "Pouches & Vanity",
    price: 649,
    formattedPrice: "₹649",
    asset: siteAssets.yellowPouch,
    placeholder: "Peacock Cosmetic Pouch — product image",
    shortDescription: "Peacock feather jaal print, waterproof inner lining for skincare & makeup.",
    fullDescription:
      "A handy everyday cosmetic organizer featuring regal turquoise motifs. Lined with wipe-clean water-resistant barrier inside to keep your beauty essentials safe on the move.",
    dimensions: "8.5\" W x 5.5\" H x 3\" Base",
    material: "100% Cotton exterior with wipe-clean inner lining",
    craft: "Fine-line hand woodblock stamping",
    closure: "Metal zip with handcrafted cotton bead pull",
    pockets: "Single wide opening with internal side partitions",
    washCare: "Wipe interior clean with damp cloth; hand wash exterior.",
    tags: ["Water-Resistant Lining", "Compact", "Handmade"],
  },
  {
    id: "marigold-crossbody-sling",
    name: "Royal Marigold Crossbody Sling",
    category: "slings",
    categoryLabel: "Crossbody & Slings",
    price: 899,
    formattedPrice: "₹899",
    asset: siteAssets.floralTote,
    placeholder: "Crossbody Sling — product image",
    shortDescription: "Lightweight quilted cotton sling with adjustable strap and flap closure.",
    fullDescription:
      "Designed for hands-free city wandering. Features a curved saddle silhouette, antiqued brass slider, and vibrant festive block motifs that add joy to any outfit.",
    dimensions: "10\" W x 8.5\" H x 3\" D (Adjustable Strap: up to 52\")",
    material: "100% Quilted Cotton Fabric",
    craft: "Jaipur hand-block floral repeat",
    closure: "Magnetic flap closure with internal zip",
    pockets: "1 Back slip pocket + 1 zip coin compartment",
    washCare: "Hand wash cold separately. Dry in shade.",
    tags: ["Hands-Free", "Adjustable Strap", "New Arrival"],
    isNew: true,
  },
  {
    id: "desert-blossom-mini-sling",
    name: "Desert Blossom Compact Sling",
    category: "slings",
    categoryLabel: "Crossbody & Slings",
    price: 799,
    formattedPrice: "₹799",
    asset: siteAssets.yellowPouch,
    placeholder: "Mini Sling — product image",
    shortDescription: "Slim mobile phone & passport sling in terracotta geometric block prints.",
    fullDescription:
      "The perfect compact companion for carrying your smartphone, cards, passport, and lip balm. Soft quilted texture keeps devices cushioned and safe.",
    dimensions: "8\" H x 5.5\" W x 1.5\" D (Crossbody Strap: 48\")",
    material: "100% Cotton with soft interlining",
    craft: "Geometric jali hand block print",
    closure: "Top zip closure",
    pockets: "Exterior card sleeve + main compartment",
    washCare: "Cold spot cleaning or gentle hand wash.",
    tags: ["Phone Bag", "Lightweight", "100% Cotton"],
  },
  {
    id: "nesting-pouch-set-3pc",
    name: "3-Piece Gifting Nest Pouch Set",
    category: "gifting",
    categoryLabel: "Favours & Sets",
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
  {
    id: "wedding-favor-hamper-set",
    name: "Mehendi Wedding Favor Bag Bundle (10 pcs)",
    category: "gifting",
    categoryLabel: "Favours & Sets",
    price: 4999,
    formattedPrice: "₹4,999",
    asset: siteAssets.floralTote,
    placeholder: "Wedding Favor Set — product image",
    shortDescription: "Pack of 10 customized block-print gift tote bags for weddings & events.",
    fullDescription:
      "Delight your wedding and celebration guests with authentic Jaipur handmade cotton tote bags. Includes custom couple monogram hangtags and customizable colour combinations upon request.",
    dimensions: "12\" H x 11\" W (Set of 10 Bags)",
    material: "100% Cotton Sheeting Fabric (200 GSM)",
    craft: "Customizable hand block printing (Sanganer / Bagru style)",
    closure: "Open top with cotton tape handles",
    pockets: "Single main open cavity",
    washCare: "Hand wash cold, air dry.",
    tags: ["Bulk Bundle", "Customizable", "Wedding Favours"],
  },
];
