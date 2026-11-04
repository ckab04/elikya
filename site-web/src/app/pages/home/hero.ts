import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../core/site.config';
import { Icon } from '../../shared/icon';

/** First screen: what the centre is and how to reach it, with the practical card on the right. */
@Component({
  selector: 'app-hero',
  imports: [RouterLink, Icon],
  template: `
    <section class="band" aria-labelledby="hero-title">
      <div class="container-site grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <p class="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-small font-medium text-accent">
            <app-icon name="clock" [size]="16" /> Ouverture en {{ site.openingYear }}
          </p>
          <h1 id="hero-title" class="display mt-5 max-w-[18ch]">Des analyses médicales fiables, près de chez vous à Bumbu</h1>
          <p class="mt-5 max-w-[46ch] text-lead text-muted">
            Laboratoire d’analyses et échographie. Résultat le jour même pour les examens courants, relu par un
            biologiste.
          </p>
          <p class="mt-8 flex flex-col gap-3 sm:flex-row">
            <a class="btn" routerLink="/services">Voir nos examens</a>
            <a class="btn btn-ghost bg-white" routerLink="/contact">Nous contacter</a>
          </p>
        </div>

        <aside class="card p-6 md:p-8" aria-label="Informations pratiques">
          <ul class="space-y-6">
            <li class="flex gap-4">
              <span class="icon-tile"><app-icon name="pin" /></span>
              <span>
                <span class="block font-semibold">Où&nbsp;?</span>
                {{ site.address.district }}, {{ site.address.city }}<br />
                <span class="text-muted">{{ site.address.landmark }}</span>
              </span>
            </li>
            <li class="flex gap-4">
              <span class="icon-tile"><app-icon name="clock" /></span>
              <span>
                <span class="block font-semibold">Quand&nbsp;?</span>
                @for (h of site.openingHours; track h.days) {
                  <span class="block">{{ h.days }}&nbsp;: {{ h.hours }}</span>
                }
              </span>
            </li>
            <li class="flex gap-4">
              <span class="icon-tile"><app-icon name="phone" /></span>
              <span>
                <span class="block font-semibold">Contact</span>
                <a class="link" [href]="'tel:' + site.phone">{{ site.phoneDisplay }}</a><br />
                <a class="link" [href]="'https://wa.me/' + site.whatsapp">Écrire sur WhatsApp</a>
              </span>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  `,
})
export class Hero {
  protected readonly site = SITE;
}
