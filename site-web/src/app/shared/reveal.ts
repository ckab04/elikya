import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';

/**
 * Reveal once when the element enters the viewport (references/motion.md, « Reveal on scroll »).
 * The hidden state lives in styles.css behind `html.js` and `prefers-reduced-motion: no-preference`,
 * so nothing stays hidden without script, and the element is never replayed.
 * `appReveal="2"` staggers it as the third part of its section (80 ms per step).
 */
@Directive({
  selector: '[appReveal]',
  host: { 'data-reveal': '', '[style.--i]': 'step()' },
})
export class Reveal {
  readonly step = input(0, { alias: 'appReveal', transform: (v: string | number) => Number(v) || 0 });

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) {
        el.classList.add('is-in');
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            el.classList.add('is-in');
            io.disconnect();
          }
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
      );
      io.observe(el);
      destroyRef.onDestroy(() => io.disconnect());
    });
  }
}
