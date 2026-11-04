import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { I18n } from '../core/i18n';
import { Icon } from './icon';

/**
 * Thin bar above the header with one clear button to the same page in the other language.
 * Each message is written in the language it offers, so a Lingala reader recognises it on a French page.
 */
@Component({
  selector: 'app-lang-bar',
  imports: [RouterLink, Icon],
  template: `
    <nav class="bg-paper text-white [--focus:#ffffff]" aria-label="Langue / Lokota">
      <div class="container-site flex min-h-11 items-center justify-end gap-3 py-1.5 text-small">
        @if (i18n.lang() === 'fr') {
          <span lang="ln" class="max-sm:hidden">Site oyo ezali mpe na lingala</span>
          <a class="lang-btn" [routerLink]="target()" lang="ln" hreflang="ln">
            <app-icon name="globe" [size]="18" /> Lingala
          </a>
        } @else {
          <span lang="fr" class="max-sm:hidden">Ce site existe aussi en français</span>
          <a class="lang-btn" [routerLink]="target()" lang="fr" hreflang="fr">
            <app-icon name="globe" [size]="18" /> Français
          </a>
        }
      </div>
    </nav>
  `,
  styles: `
    .lang-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      min-height: 2.25rem;
      padding: 0.25rem 0.9rem;
      border-radius: 999px;
      background: #ffffff;
      color: var(--color-paper);
      font-weight: 600;
      text-decoration: none;
      transition: background-color var(--t-hover) ease;
    }
    @media (hover: hover) and (pointer: fine) {
      .lang-btn:hover {
        background: var(--color-surface);
      }
    }
  `,
})
export class LangBar {
  protected readonly i18n = inject(I18n);
  private readonly router = inject(Router);
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected readonly target = computed(() =>
    this.router.parseUrl(I18n.switchUrl(this.url(), this.i18n.lang() === 'fr' ? 'ln' : 'fr')),
  );
}
