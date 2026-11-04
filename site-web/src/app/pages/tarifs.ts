import { Component } from '@angular/core';
import { TrPipe, LocalPathPipe } from '../core/i18n';
import { RouterLink } from '@angular/router';
import { EXAMS, FC_PER_USD, formatFc, formatUsd, KINDS, PRICES_CONFIRMED, SampleKind } from '../core/content';
import { ContactBand } from '../shared/contact-band';
import { Icon, IconName } from '../shared/icon';
import { PageTitle } from '../shared/page-title';
import { PriceSentence } from '../shared/price-sentence';
import { Reveal } from '../shared/reveal';

/** The whole price list, in Congolese francs first: the live sentence, then every exam. */
@Component({
  selector: 'app-tarifs',
  imports: [RouterLink, PageTitle, PriceSentence, ContactBand, Reveal, Icon, TrPipe, LocalPathPipe],
  template: `
    <app-page-title [title]="'Tarifs' | tr">
      {{ 'Le prix de chaque examen, affiché avant que vous veniez. Paiement en francs congolais ou en dollars.' | tr }}
    </app-page-title>

    <app-price-sentence [linkToPrices]="false" />

    <section class="band py-(--section)" aria-labelledby="liste-title">
      <div class="frame">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <h2 id="liste-title" class="head" appReveal>{{ 'Tous les examens' | tr }}</h2>
          <p class="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-small text-muted" appReveal="1">
            <app-icon name="money" [size]="18" />
            @if (!pricesConfirmed) {
              {{ 'Tarifs indicatifs ·' | tr }}
            }
            {{ '1 $ =' | tr }} {{ rate }}{{ ' FC' | tr }}
          </p>
        </div>

        <div class="mt-8 grid gap-6 lg:grid-cols-2">
          @for (kind of kinds; track kind; let i = $index) {
            <div class="card p-6 md:p-8" [appReveal]="i">
              <table class="w-full">
                <caption class="pb-4 text-left">
                  <span class="flex items-center gap-3 text-lead font-semibold">
                    <span class="icon-tile size-10!"><app-icon [name]="icons[kind]" [size]="20" /></span>{{ kind | tr }}
                  </span>
                </caption>
                <thead class="visually-hidden">
                  <tr><th scope="col">{{ 'Examen' | tr }}</th><th scope="col">{{ 'Prix en francs' | tr }}</th><th scope="col">{{ 'En dollars' | tr }}</th></tr>
                </thead>
                <tbody>
                  @for (exam of byKind(kind); track exam.id) {
                    <tr class="row">
                      <th scope="row" class="py-3 pr-4 text-left align-top font-medium">
                        {{ exam.name | tr }}
                        <span class="block text-small font-normal text-muted">{{ 'Résultat' | tr }} {{ exam.delay | tr }}{{ (exam.fasting ? ', à jeun' : '') | tr }}</span>
                      </th>
                      <td class="py-3 text-right align-top font-semibold whitespace-nowrap text-accent">{{ fc(exam.priceFc) }}</td>
                      <td class="w-16 py-3 text-right align-top whitespace-nowrap text-small text-muted">{{ usd(exam.priceFc) }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>

        <div class="mt-6 grid gap-6 md:grid-cols-2">
          <p class="card flex items-start gap-4 p-6" appReveal>
            <span class="icon-tile shrink-0"><app-icon name="chat" /></span>
            <span>{{ 'Un examen manque dans la liste ?' | tr }} <a class="link font-medium" [routerLink]="'/contact' | lp">{{ 'Demandez-nous' | tr }}</a>{{ ', nous vous donnons le prix.' | tr }}</span>
          </p>
          <p class="card flex items-start gap-4 p-6" appReveal="1">
            <span class="icon-tile shrink-0"><app-icon name="building" /></span>
            <span>{{ 'Hôpitaux, centres de santé, entreprises :' | tr }} <a class="link font-medium" [routerLink]="'/partenaires' | lp">{{ 'tarifs sous convention' | tr }}</a>.</span>
          </p>
        </div>
      </div>
    </section>

    <app-contact-band />
  `,
  styles: `
    .row + .row > * {
      border-top: 1px solid #e6edf6;
    }
  `,

})
export class Tarifs {
  protected readonly kinds = KINDS;
  protected readonly icons: Record<SampleKind, IconName> = { Sang: 'drop', Urines: 'cup', Selles: 'cup', Échographie: 'wave' };
  protected readonly pricesConfirmed = PRICES_CONFIRMED;
  protected readonly rate = new Intl.NumberFormat('fr-FR').format(FC_PER_USD).replace(/\u202f/g, '\u00a0');
  protected readonly fc = formatFc;
  protected readonly usd = formatUsd;

  protected byKind(kind: SampleKind) {
    return EXAMS.filter((e) => e.kind === kind);
  }
}
