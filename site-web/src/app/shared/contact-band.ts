import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TrPipe } from '../core/i18n';
import { PHOTOS } from '../core/photos';
import { SITE } from '../core/site.config';

/** How to reach the centre: the two buttons, the address with its landmark, one picture of the area. */
@Component({
  selector: 'app-contact-band',
  imports: [NgOptimizedImage, TrPipe],
  template: `
    <section class="band py-(--section)" aria-labelledby="joindre-title">
      <div class="frame grid-12 items-center gap-y-8">
      <div class="col-span-12 lg:col-span-6">
        <h2 id="joindre-title" class="head">{{ 'Une question ?' | tr }}</h2>
        <p class="mt-3 text-lead">{{ 'Sur un examen, un prix ou un horaire : appelez-nous ou écrivez sur WhatsApp.' | tr }}</p>
        <p class="mt-6 flex flex-col gap-3 sm:flex-row">
          <a class="btn" [href]="'tel:' + site.phone">{{ 'Appeler le' | tr }} {{ site.phoneDisplay }}</a>
          <a class="btn btn-ghost bg-white" [href]="'https://wa.me/' + site.whatsapp">{{ 'Écrire sur WhatsApp' | tr }}</a>
        </p>
        <p class="mt-6 text-muted">
          {{ site.address.street | tr }}, {{ site.address.landmark | tr }}, {{ site.address.district | tr }}.
        </p>
      </div>
      <img
        class="col-span-12 aspect-16/10 w-full rounded-xl! bg-surface shadow-lg object-cover lg:col-span-5 lg:col-start-8"
        [ngSrc]="photo.id"
        [width]="photo.width"
        [height]="photo.height"
        sizes="(max-width: 1023px) 92vw, 40vw"
        style="object-position: 50% 60%"
        [alt]="photo.alt | tr"
      />
      </div>
    </section>
  `,
})
export class ContactBand {
  protected readonly site = SITE;
  protected readonly photo = PHOTOS.quartier;
}
