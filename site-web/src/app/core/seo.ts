import { DOCUMENT, inject, Service } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { I18n } from './i18n';
import { SITE } from './site.config';

/**
 * On every navigation: meta description and Open Graph tags in the page language, and the
 * `hreflang` links that tell search engines the French and Lingala versions of the page belong together.
 */
@Service()
export class Seo {
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly i18n = inject(I18n);
  private readonly document = inject(DOCUMENT);

  init(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      const route = this.deepest(this.router.routerState.snapshot.root);
      const description = this.i18n.t((route.data['description'] as string | undefined) ?? SITE.description);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:title', content: this.i18n.t(route.title ?? SITE.name) });
      this.meta.updateTag({ property: 'og:locale', content: this.i18n.lang() === 'ln' ? 'ln_CD' : 'fr_CD' });
      this.alternates(this.router.url);
    });
  }

  private alternates(url: string): void {
    const head = this.document.head;
    head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    for (const lang of ['fr', 'ln'] as const) {
      const link = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      link.setAttribute('href', I18n.switchUrl(url.split(/[?#]/)[0], lang));
      head.appendChild(link);
    }
  }

  private deepest(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    return route.firstChild ? this.deepest(route.firstChild) : route;
  }
}
