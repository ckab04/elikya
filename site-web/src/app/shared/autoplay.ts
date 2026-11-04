import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';

/**
 * A silent loop plays only while it is on screen, and never under reduced motion (the poster stays).
 * Use on `<video muted loop playsinline preload="none">` without `autoplay`.
 */
@Directive({ selector: 'video[appAutoplay]' })
export class Autoplay {
  constructor() {
    const el = inject<ElementRef<HTMLVideoElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => undefined);
        else el.pause();
      });
      io.observe(el);
      destroyRef.onDestroy(() => io.disconnect());
    });
  }
}
