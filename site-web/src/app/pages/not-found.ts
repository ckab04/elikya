import { Component } from '@angular/core';
import { TrPipe, LocalPathPipe } from '../core/i18n';
import { RouterLink } from '@angular/router';
import { NAV_LINKS } from '../layout/header';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, TrPipe, LocalPathPipe],
  template: `
    <section class="frame flex min-h-[80svh] flex-col justify-center gap-10">
      <h1 class="display max-w-[10ch]">{{ 'Page introuvable.' | tr }}</h1>
      <p class="max-w-[38ch] text-lead">{{ 'Cette adresse n’existe pas, ou la page a changé de place. Elle est peut-être ici :' | tr }}</p>
      <ul class="flex flex-wrap gap-x-8 gap-y-3 text-lead">
        @for (link of links; track link.path) {
          <li><a class="link" [routerLink]="link.path | lp">{{ link.label | tr }}</a></li>
        }
      </ul>
    </section>
  `,
})
export class NotFound {
  protected readonly links = NAV_LINKS;
}
