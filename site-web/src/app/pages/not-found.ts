import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAV_LINKS } from '../layout/header';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="frame flex min-h-[80svh] flex-col justify-center gap-10">
      <h1 class="display max-w-[10ch]">Page introuvable.</h1>
      <p class="max-w-[38ch] text-lead">Cette adresse n’existe pas, ou la page a changé de place. Elle est peut-être ici :</p>
      <ul class="flex flex-wrap gap-x-8 gap-y-3 text-lead">
        <li><a class="link font-medium" routerLink="/">Accueil</a></li>
        @for (link of links; track link.path) {
          <li><a class="link" [routerLink]="link.path">{{ link.label }}</a></li>
        }
      </ul>
    </section>
  `,
})
export class NotFound {
  protected readonly links = NAV_LINKS;
}
