import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { I18n, LocalPathPipe, TrPipe } from '../core/i18n';
import { SITE } from '../core/site.config';
import { Icon } from '../shared/icon';
import { LangSwitch } from '../shared/lang-switch';

export const NAV_LINKS = [
  { path: '/', label: 'Accueil' },
  { path: '/services', label: 'Examens' },
  { path: '/tarifs', label: 'Tarifs' },
  { path: '/le-centre', label: 'Le centre' },
  { path: '/partenaires', label: 'Partenaires' },
  { path: '/contact', label: 'Contact' },
] as const;

/** Sticky white bar: logo, five links, the call button. */
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Icon, LangSwitch, TrPipe, LocalPathPipe],
  host: { '(document:keydown.escape)': 'closeAndFocusToggle()' },
  template: `
    <header class="bar">
      <div class="container-site relative flex min-h-18 items-center justify-between gap-6">
      <a [routerLink]="'/' | lp" class="brand" (click)="close()">
        <span class="brand__mark" aria-hidden="true">E</span>
        <span class="flex flex-col leading-tight">
          <span class="text-lead font-semibold">Elikya</span>
          <span class="text-small whitespace-nowrap text-muted max-xl:hidden">{{ 'Centre de santé' | tr }} · Bumbu</span>
        </span>
      </a>

      <nav id="main-nav" [attr.aria-label]="'Navigation principale' | tr" class="nav" [class.nav--open]="open()">
        <ul class="nav__list">
          @for (link of links; track link.path) {
            <li>
              <a
                #firstLink
                [routerLink]="link.path | lp"
                routerLinkActive="is-active"
                [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                ariaCurrentWhenActive="page"
                class="nav__link"
                (click)="close()"
                >{{ link.label | tr }}</a
              >
            </li>
          }
        </ul>
      </nav>

      <div class="flex items-center gap-3">
        <app-lang-switch />
        <a class="btn min-h-11! px-3! py-2! sm:px-4!" [href]="'tel:' + site.phone" [attr.aria-label]="'Appeler' | tr"><app-icon name="phone" [size]="18" /><span class="max-sm:hidden" [class.call-label-ln]="i18n.lang() === 'ln'">{{ 'Appeler' | tr }}</span></a>
        <button
          #toggleBtn
          type="button"
          class="menu-toggle"
          aria-controls="main-nav"
          [attr.aria-expanded]="open()"
          (click)="toggle()"
        >
          {{ (open() ? 'Fermer' : 'Menu') | tr }}
        </button>
      </div>
      </div>
    </header>
  `,
  styles: `
    /* Lingala labels are longer: between the menu breakpoint and 1536 px the call button keeps only its icon. */
    @media (min-width: 1081px) and (max-width: 1535px) {
      .call-label-ln {
        display: none;
      }
    }
    .bar {
      position: sticky;
      top: 0;
      z-index: 50;
      background: #ffffff;
      box-shadow: 0 1px 0 #dbe5f1, 0 4px 16px rgb(15 47 92 / 0.05);
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--color-ink);
      text-decoration: none;
    }
    .brand__mark {
      display: grid;
      place-items: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 0.6rem;
      background: var(--color-accent);
      color: #fff;
      font-size: 1.25rem;
      font-weight: 600;
    }
    .nav__list {
      display: flex;
      gap: 0.25rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .nav__link {
      text-decoration: underline;
      text-decoration-color: transparent;
      text-underline-offset: 0.35em;
      text-decoration-thickness: 2px;
      transition: text-decoration-color var(--t-hover) ease;
    }
    .nav__link {
      display: block;
      white-space: nowrap;
      padding: 0.45rem 0.75rem;
      border-radius: 0.5rem;
      font-weight: 500;
    }
    .nav__link.is-active {
      color: var(--color-accent);
      background: var(--color-surface);
      text-decoration-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
      .nav__link:hover {
        text-decoration-color: var(--color-muted);
      }
    }
    .menu-toggle {
      display: none;
      min-height: 2.75rem;
      padding: 0.5rem 0.25rem;
      background: none;
      border: 0;
      color: inherit;
      font: inherit;
      font-weight: 500;
      text-decoration: underline;
      text-underline-offset: 0.3em;
      cursor: pointer;
    }
    @media (max-width: 1080px) {
      .menu-toggle {
        display: inline-block;
      }
      .nav {
        display: none;
        position: absolute;
        inset: 100% calc(-1 * var(--margin)) auto;
        padding: 1rem var(--margin) 1.5rem;
        background: #ffffff;
        box-shadow: 0 12px 24px rgb(15 47 92 / 0.12);
      }
      .nav--open {
        display: block;
      }
      .nav__list {
        flex-direction: column;
        gap: 0.25rem;
      }
      .nav__link {
        display: block;
        padding-block: 0.6rem;
        font-size: var(--text-lead);
        font-weight: 500;
      }
    }
  `,
})
export class Header {
  protected readonly site = SITE;
  protected readonly i18n = inject(I18n);
  protected readonly links = NAV_LINKS;
  protected readonly open = signal(false);

  private readonly firstLink = viewChild<ElementRef<HTMLElement>>('firstLink');
  private readonly toggleBtn = viewChild.required<ElementRef<HTMLButtonElement>>('toggleBtn');

  protected toggle(): void {
    this.open.update((v) => !v);
    if (this.open()) {
      // Move focus into the menu once it is displayed, so keyboard and screen-reader users land on the links.
      setTimeout(() => this.firstLink()?.nativeElement.focus());
    }
  }

  protected close(): void {
    this.open.set(false);
  }

  protected closeAndFocusToggle(): void {
    if (!this.open()) return;
    this.open.set(false);
    this.toggleBtn().nativeElement.focus();
  }
}
