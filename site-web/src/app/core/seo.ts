import { inject, Service } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SITE } from './site.config';

/**
 * Met à jour la balise meta description (et Open Graph) à chaque navigation,
 * à partir de `data.description` de la route active. Le titre est géré par
 * la propriété `title` des routes.
 */
@Service()
export class Seo {
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);

  init(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      const route = this.deepest(this.router.routerState.snapshot.root);
      const description = (route.data['description'] as string | undefined) ?? SITE.description;
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:title', content: route.title ?? SITE.name });
    });
  }

  private deepest(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    return route.firstChild ? this.deepest(route.firstChild) : route;
  }
}
