import { Component, computed, input } from '@angular/core';

const PATHS = {
  flask: 'M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3M7 15h10',
  wave: 'M2 12h3l2-6 3 12 3-9 2 6 2-3h5',
  shield: 'M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Zm-3 9 2 2 4-4',
  clock: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  pin: 'M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Zm0-9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z',
  chat: 'M4 5h16v11H9l-5 4V5Z',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  check: 'M5 12.5 10 17l9-10',
  lock: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4',
  arrow: 'M5 12h14M13 6l6 6-6 6',
} as const;

export type IconName = keyof typeof PATHS;

/** Line icon, decorative (the text next to it carries the meaning). */
@Component({
  selector: 'app-icon',
  template: `
    <svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" fill="none" stroke="currentColor"
      stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path [attr.d]="path()" />
    </svg>
  `,
  host: { class: 'inline-flex shrink-0' },
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(22);
  protected readonly path = computed(() => PATHS[this.name()]);
}
