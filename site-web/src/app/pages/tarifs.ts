import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EXAMS, FC_PER_USD, formatFc, formatUsd, KINDS, PRICES_CONFIRMED, SampleKind } from '../core/content';
import { PHOTOS } from '../core/photos';
import { ContactBand } from '../shared/contact-band';
import { PageTitle } from '../shared/page-title';
import { PriceSentence } from '../shared/price-sentence';
import { Reveal } from '../shared/reveal';

/** The whole price list, in Congolese francs first: the live sentence, then every exam. */
@Component({
  selector: 'app-tarifs',
  imports: [NgOptimizedImage, RouterLink, PageTitle, PriceSentence, ContactBand, Reveal],
  template: `
    <app-page-title title="Tarifs">
      Le prix de chaque examen, affiché avant que vous veniez. Paiement en francs congolais ou en dollars.
    </app-page-title>

    <app-price-sentence [linkToPrices]="false" />

    <figure class="frame mt-12 overflow-clip">
      <img
        class="aspect-[21/9] w-full bg-surface object-cover max-md:aspect-video"
        [ngSrc]="photos.quartier.id"
        [width]="photos.quartier.width"
        [height]="photos.quartier.height"
        sizes="100vw"
        style="object-position: 50% 60%"
        [alt]="photos.quartier.alt"
      />
    </figure>

    <section class="frame grid-12 gap-y-12 pt-(--section)" aria-labelledby="liste-title">
      <div class="col-span-12 md:col-span-4">
        <h2 id="liste-title" class="head" appReveal>Tous les examens</h2>
        <p class="mt-6 max-w-[34ch]" appReveal="1">
          @if (!pricesConfirmed) {
            Tarifs indicatifs, confirmés avant l’ouverture.
          }
          L’équivalent en dollars est calculé à {{ rate }} FC pour 1 $.
        </p>
        <img
          class="mt-10 aspect-4/5 w-3/4 bg-surface object-cover max-md:hidden"
          [ngSrc]="photos.echo.id"
          [width]="photos.echo.width"
          [height]="photos.echo.height"
          sizes="22vw"
          [alt]="photos.echo.alt"
          appReveal="2"
        />
        <img
          class="mt-6 aspect-4/5 w-3/4 bg-surface object-cover max-md:hidden"
          [ngSrc]="photos.prelevement.id"
          [width]="photos.prelevement.width"
          [height]="photos.prelevement.height"
          sizes="22vw"
          [alt]="photos.prelevement.alt"
          appReveal="3"
        />
      </div>

      <div class="col-span-12 space-y-16 md:col-span-7 md:col-start-6">
        @for (kind of kinds; track kind) {
          <table class="w-full" appReveal>
            <caption class="pb-4 text-left text-lead font-semibold">{{ kind }}</caption>
            <thead class="visually-hidden">
              <tr><th scope="col">Examen</th><th scope="col">Résultat</th><th scope="col">Prix en francs</th><th scope="col">En dollars</th></tr>
            </thead>
            <tbody>
              @for (exam of byKind(kind); track exam.id) {
                <tr>
                  <th scope="row" class="py-2.5 pr-4 text-left align-top font-normal">
                    {{ exam.name }}
                    <span class="block text-small text-muted">Résultat {{ exam.delay }}{{ exam.fasting ? ', à jeun' : '' }}</span>
                  </th>
                  <td class="py-2.5 text-right align-top font-medium whitespace-nowrap">{{ fc(exam.priceFc) }}</td>
                  <td class="w-20 py-2.5 text-right align-top whitespace-nowrap text-muted">{{ usd(exam.priceFc) }}</td>
                </tr>
              }
            </tbody>
          </table>
        }
        <p appReveal>
          Un examen manque ? <a class="link font-medium" routerLink="/contact">Demandez-nous</a>. Hôpitaux et centres de
          santé : <a class="link font-medium" routerLink="/partenaires">tarifs sous convention</a>.
        </p>
      </div>
    </section>

    <app-contact-band />
  `,
})
export class Tarifs {
  protected readonly kinds = KINDS;
  protected readonly photos = PHOTOS;
  protected readonly pricesConfirmed = PRICES_CONFIRMED;
  protected readonly rate = new Intl.NumberFormat('fr-FR').format(FC_PER_USD).replace(/\u202f/g, '\u00a0');
  protected readonly fc = formatFc;
  protected readonly usd = formatUsd;

  protected byKind(kind: SampleKind) {
    return EXAMS.filter((e) => e.kind === kind);
  }
}
