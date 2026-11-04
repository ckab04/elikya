import { Component } from '@angular/core';
import { TrPipe, LocalPathPipe } from '../core/i18n';
import { RouterLink } from '@angular/router';
import { CREDITS } from '../core/photos';
import { SITE } from '../core/site.config';
import { NAV_LINKS } from './header';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TrPipe, LocalPathPipe],
  template: `
    <footer class="bg-paper text-white [--focus:#ffffff]">
      <div class="container-site grid-12 gap-y-8 py-14">
        <div class="col-span-12 md:col-span-5">
          <p class="flex items-center gap-3 text-lead font-semibold"><span class="grid size-10 place-items-center rounded-lg bg-white text-accent" aria-hidden="true">E</span>{{ site.name | tr }}</p>
          <address class="mt-3 not-italic">
            {{ site.address.street | tr }}<br />{{ site.address.landmark | tr }}<br />{{ site.address.district | tr }}, {{ site.address.city }}
          </address>
          <p class="mt-3">
            <a class="link text-white!" [href]="'tel:' + site.phone">{{ site.phoneDisplay }}</a> ·
            <a class="link text-white!" [href]="'https://wa.me/' + site.whatsapp">{{ 'WhatsApp' | tr }}</a>
          </p>
          <p class="break-words"><a class="link text-white!" [href]="'mailto:' + site.email">{{ site.email }}</a></p>
        </div>

        <div class="col-span-6 md:col-span-3">
          <p class="font-semibold">{{ 'Horaires' | tr }}</p>
          <ul class="mt-3 space-y-1">
            @for (h of site.openingHours; track h.days) {
              <li>{{ h.days | tr }}{{ ' :' | tr }} {{ h.hours | tr }}</li>
            }
          </ul>
        </div>

        <nav [attr.aria-label]="'Pied de page' | tr" class="col-span-6 md:col-span-3 md:col-start-10">
          <p class="font-semibold">{{ 'Pages' | tr }}</p>
          <ul class="mt-3 space-y-1">
            @for (link of links; track link.path) {
              <li><a class="link text-white!" [routerLink]="link.path | lp">{{ link.label | tr }}</a></li>
            }
          </ul>
        </nav>
      </div>

      <div class="container-site flex flex-wrap justify-between gap-x-8 gap-y-3 border-t border-white/15 py-8 text-small text-white/75">
        <p class="max-w-[90ch]">
          {{ 'Photos et vidéo :' | tr }}
          @for (c of credits; track c.page; let last = $last) {
            <a class="link text-white!" [href]="c.page">{{ '« ' | tr }}{{ c.title }}{{ ' »' | tr }}</a> {{ 'par' | tr }} {{ c.author }},
            <a class="link text-white!" [href]="c.licenceUrl">{{ c.licence }}</a>{{ last ? '.' : ' ;' }}
          }
        </p>
        <p>© {{ year }} {{ site.name | tr }}</p>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly site = SITE;
  protected readonly links = NAV_LINKS;
  protected readonly credits = CREDITS;
  // Calculée au prérendu : reconstruire le site chaque année suffit.
  protected readonly year = new Date().getFullYear();
}
