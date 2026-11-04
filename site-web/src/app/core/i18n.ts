import { DOCUMENT, inject, Pipe, PipeTransform, Service, signal } from '@angular/core';
import { LN } from './i18n.ln';

export type Lang = 'fr' | 'ln';

/** French is the source language: every text in the templates is French, and is looked up in LN. */
const normalise = (s: string) => s.replace(/[\u00a0\u202f]/g, ' ').replace(/\s+/g, ' ').trim();
const DICT = new Map(Object.entries(LN).map(([fr, ln]) => [normalise(fr), ln]));

/**
 * Current language of the page. It is set by the route (`/ln/...` is Lingala, everything else French)
 * before the page renders, so prerendered pages come out in the right language.
 */
@Service()
export class I18n {
  private readonly document = inject(DOCUMENT);
  readonly lang = signal<Lang>('fr');

  set(lang: Lang): void {
    this.lang.set(lang);
    this.document.documentElement.lang = lang;
  }

  /** The Lingala text for a French text; the French text itself when no translation exists yet. */
  t(fr: string): string {
    if (this.lang() === 'fr') return fr;
    return DICT.get(normalise(fr)) ?? fr;
  }

  /** An internal path in the current language: `/tarifs` → `/ln/tarifs`. */
  path(path: string): string {
    if (this.lang() === 'fr') return path;
    return path === '/' ? '/ln' : `/ln${path}`;
  }

  /** The same page in the other language, for the switcher. */
  static switchUrl(url: string, to: Lang): string {
    const [path, rest = ''] = url.split(/(?=[?#])/);
    const bare = path === '/ln' ? '/' : path.startsWith('/ln/') ? path.slice(3) : path;
    const target = to === 'fr' ? bare : bare === '/' ? '/ln' : `/ln${bare}`;
    return target + rest;
  }
}

/** `{{ 'Nos prestations' | tr }}` — impure so that persistent parts (header, footer) follow the language. */
@Pipe({ name: 'tr', pure: false })
export class TrPipe implements PipeTransform {
  private readonly i18n = inject(I18n);
  transform(fr: string | null | undefined): string {
    return fr ? this.i18n.t(fr) : '';
  }
}

/** `[routerLink]="'/tarifs' | lp"` — internal link in the current language. */
@Pipe({ name: 'lp', pure: false })
export class LocalPathPipe implements PipeTransform {
  private readonly i18n = inject(I18n);
  transform(path: string): string {
    return this.i18n.path(path);
  }
}
