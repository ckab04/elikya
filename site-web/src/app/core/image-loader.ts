import { ImageLoaderConfig } from '@angular/common';

/** Widths generated for every photo in public/images. */
export const PHOTO_WIDTHS = [480, 960, 1600] as const;

/**
 * NgOptimizedImage loader for the pre-generated WebP files: `ngSrc="tube"` → `/images/tube-960.webp`.
 * The requested width is rounded up to the nearest generated file.
 */
export function photoLoader(config: ImageLoaderConfig): string {
  const wanted = config.width ?? 960;
  const width = PHOTO_WIDTHS.find((w) => w >= wanted) ?? PHOTO_WIDTHS[PHOTO_WIDTHS.length - 1];
  return `/images/${config.src}-${width}.webp`;
}
