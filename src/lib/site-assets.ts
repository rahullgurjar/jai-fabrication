/**
 * Image bindings for Jai Fabrication — real brand photography, served from CDN.
 */
import logoAsset from "@/assets/jai-fabrication-logo.jpeg";
import heroAsset from "@/assets/jaipur-courtyard-hero.jpeg";
import floralToteAsset from "@/assets/floral-tote.jpeg";
import patchworkDuffleAsset from "@/assets/patchwork-duffle.jpeg";
import quiltedPouchAsset from "@/assets/quilted-pouch.jpeg";

export type AssetBinding = string | null;

export const siteAssets: {
  logo: AssetBinding;
  hero: AssetBinding;
  floralTote: AssetBinding;
  patchworkDuffle: AssetBinding;
  yellowPouch: AssetBinding;
} = {
  logo: logoAsset,
  hero: heroAsset,
  floralTote: floralToteAsset,
  patchworkDuffle: patchworkDuffleAsset,
  yellowPouch: quiltedPouchAsset,
};
