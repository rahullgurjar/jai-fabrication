import type { AssetBinding } from "@/lib/site-assets";
import { cn } from "@/lib/utils";

type AssetImageProps = {
  src: AssetBinding;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Shown inside the placeholder while the real asset is not bound yet. */
  placeholderLabel: string;
  sizes?: string;
  loading?: "lazy" | "eager";
};

/**
 * Renders a responsive, object-cover image when the asset binding exists.
 * While the binding is null it renders an accessible block-print placeholder
 * with the same aspect box, so the real photo can be dropped in without any
 * layout change, stretching or blurring.
 */
export function AssetImage({
  src,
  alt,
  className,
  imgClassName,
  placeholderLabel,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  loading = "lazy",
}: AssetImageProps) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={`${alt} — image pending`}
        className={cn(
          "motif-field relative flex items-end bg-secondary/70",
          className,
        )}
      >
        <span className="m-4 inline-flex items-center gap-2 bg-background/85 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
          {placeholderLabel}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-secondary/60", className)}>
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={loading}
        decoding="async"
        className={cn("h-full w-full object-cover object-center", imgClassName)}
      />
    </div>
  );
}
