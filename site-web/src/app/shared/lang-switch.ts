import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { I18n, Lang } from '../core/i18n';

/** FR | LN: the same page in the other language. Real links, so they work without script too. */
@Component({
  selector: 'app-lang-switch',
  imports: [RouterLink],
  template: `
    <nav class="switch" [attr.aria-label]="i18n.lang() === 'ln' ? 'Lokota' : 'Langue'">
      @for (l of langs; track l.code) {
        <a
          [routerLink]="target(l.code)"
          [attr.lang]="l.code"
          [attr.hreflang]="l.code"
          [attr.aria-current]="i18n.lang() === l.code ? 'true' : null"
          [class.is-current]="i18n.lang() === l.code"
          >{{ l.short }}<span class="visually-hidden"> {{ l.name }}</span></a
        >
      }
    </nav>
  `,
  styles: `
    .switch {
      display: inline-flex;
      padding: 0.2rem;
      border-radius: 999px;
      background: var(--color-surface);
    }
    a {
      min-width: 2.75rem;
      min-height: 2.25rem;
      display: grid;
      place-items: center;
      padding: 0 0.6rem;
      border-radius: 999px;
      color: var(--color-ink);
      font-size: var(--text-small);
      font-weight: 600;
      text-decoration: none;
    }
    a.is-current {
      background: #fff;
      color: var(--color-accent);
      box-shadow: 0 1px 3px rgb(15 47 92 / 0.15);
    }
  `,
})
export class LangSwitch {
  protected readonly i18n = inject(I18n);
  private readonly router = inject(Router);
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected readonly langs = [
    { code: 'fr' as Lang, short: 'FR', name: 'Français' },
    { code: 'ln' as Lang, short: 'LN', name: 'Lingala' },
  ];

  private readonly urls = computed(() => ({
    fr: this.router.parseUrl(I18n.switchUrl(this.url(), 'fr')),
    ln: this.router.parseUrl(I18n.switchUrl(this.url(), 'ln')),
  }));

  protected target(lang: Lang) {
    return this.urls()[lang];
  }
}
