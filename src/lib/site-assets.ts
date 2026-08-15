/**
 * Replaceable image bindings for Jai Fabrication.
 *
 * The original brand photography (circular logo, Jaipur courtyard hero, product
 * shots) was not available at build time. Drop the real files into
 * `src/assets/` and swap each `null` below for an ES6 import, e.g.
 *
 *   import logo from "@/assets/jai-logo.png";
 *   export const siteAssets = { logo, ... };
 *
 * Nothing else needs to change: every consumer renders a neutral block-print
 * placeholder while a binding is `null`, and a correctly cropped
 * `object-cover` image as soon as one is provided. No stock imagery is used.
 */
export type AssetBinding = string | null;

export const siteAssets: {
  logo: AssetBinding;
  hero: AssetBinding;
  floralTote: AssetBinding;
  patchworkDuffle: AssetBinding;
  indigoPouch: AssetBinding;
} = {
  logo: null,
  hero: null,
  floralTote: null,
  patchworkDuffle: null,
  indigoPouch: null,
};
