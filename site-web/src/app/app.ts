import { afterNextRender, Component, ElementRef, inject, viewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, skip } from 'rxjs';
import { TrPipe } from './core/i18n';
import { Seo } from './core/seo';
import { Footer } from './layout/footer';
import { Header } from './layout/header';
import { LangBar } from './shared/lang-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LangBar, Header, Footer, TrPipe],
  template: `
    <a class="skip-link" href="#contenu">{{ 'Aller au contenu' | tr }}</a>
    <app-lang-bar />
    <app-header />
    <main #main id="contenu" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
  `,
})
export class App {
  private readonly main = viewChild.required<ElementRef<HTMLElement>>('main');

  constructor() {
    inject(Seo).init();
    // Tells the fallback timer in index.html that reveals are handled by the app.
    afterNextRender(() => document.documentElement.classList.add('app-ready'));
    // After an in-app navigation, move focus to the new page so keyboard and screen-reader users
    // start at its content instead of on a link that no longer exists (the first load is left alone).
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        skip(1),
      )
      .subscribe(() => this.main().nativeElement.focus({ preventScroll: true }));
  }
}
