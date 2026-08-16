/**
 * Image bindings for Jai Fabrication — real brand photography, served from CDN.
 */
import logoAsset from "@/assets/jai-fabrication-logo.jpeg.asset.json";
import heroAsset from "@/assets/jaipur-courtyard-hero.jpeg.asset.json";
import floralToteAsset from "@/assets/floral-tote.jpeg.asset.json";
import patchworkDuffleAsset from "@/assets/patchwork-duffle.jpeg.asset.json";
import quiltedPouchAsset from "@/assets/quilted-pouch.jpeg.asset.json";

export type AssetBinding = string | null;

export const siteAssets: {
  logo: AssetBinding;
  hero: AssetBinding;
  floralTote: AssetBinding;
  patchworkDuffle: AssetBinding;
  indigoPouch: AssetBinding;
} = {
  logo: logoAsset.url,
  hero: heroAsset.url,
  floralTote: floralToteAsset.url,
  patchworkDuffle: patchworkDuffleAsset.url,
  indigoPouch: quiltedPouchAsset.url,
};
