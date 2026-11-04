import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { EXAMS, KIND_SUMMARY, KINDS, SampleKind } from '../core/content';
import { Photo, PHOTOS, VIDEO_AUBE } from '../core/photos';
import { Autoplay } from '../shared/autoplay';
import { ContactBand } from '../shared/contact-band';
import { PageTitle } from '../shared/page-title';
import { PriceSentence } from '../shared/price-sentence';
import { Reveal } from '../shared/reveal';

/** One section per kind of sample: the statement on the left, its exams pushed right. */
@Component({
  selector: 'app-services',
  imports: [NgOptimizedImage, PageTitle, PriceSentence, ContactBand, Reveal, Autoplay],
  template: `
    <app-page-title title="Examens">
      Prise de sang, urines, selles et échographie, avec ou sans ordonnance. Pour chaque examen : le tube, s’il faut
      venir à jeun, et quand le résultat est prêt.
    </app-page-title>

    @for (kind of kinds; track kind) {
      <section class="frame grid-12 gap-y-10 pt-(--section)" [attr.aria-labelledby]="'k-' + $index">
        <div class="col-span-12 md:col-span-5">
          <h2 [id]="'k-' + $index" class="head" appReveal>{{ kind }}</h2>
          <p class="mt-6 max-w-[38ch]" appReveal="1">{{ summary[kind] }}</p>
          @if (photoFor(kind); as p) {
            <img
              class="mt-10 aspect-4/5 w-3/4 bg-surface object-cover md:w-2/3"
              [ngSrc]="p.id"
              [width]="p.width"
              [height]="p.height"
              sizes="(max-width: 767px) 70vw, 24vw"
              [alt]="p.alt"
              appReveal="2"
            />
          }
        </div>
        <div class="col-span-12 md:col-span-6 md:col-start-7" appReveal="1">
          <table class="w-full">
            <caption class="visually-hidden">Examens : {{ kind }}</caption>
            <thead>
              <tr class="text-small text-muted">
                <th scope="col" class="pb-3 text-left font-normal">Examen</th>
                <th scope="col" class="pb-3 text-left font-normal max-sm:hidden">Tube</th>
                <th scope="col" class="pb-3 text-right font-normal">Résultat</th>
              </tr>
            </thead>
            <tbody>
              @for (exam of byKind(kind); track exam.id) {
                <tr>
                  <th scope="row" class="py-3 pr-4 text-left align-top font-normal">
                    {{ exam.name }}
                    @if (exam.fasting) {
                      <span class="block text-small text-muted">À jeun</span>
                    }
                  </th>
                  <td class="py-3 pr-4 align-top max-sm:hidden">
                    @if (exam.tube; as t) {
                      <span class="inline-flex items-center gap-2">
                        <span class="cap" [style.background]="t.colour" aria-hidden="true"></span>{{ t.label }}
                      </span>
                    } @else {
                      —
                    }
                  </td>
                  <td class="py-3 text-right align-top whitespace-nowrap">{{ exam.delay }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    }

    <section class="frame pt-(--section)" aria-labelledby="avant-title">
      <div class="grid-12 gap-y-6">
        <div class="col-span-12 md:col-span-5">
          <h2 id="avant-title" class="head" appReveal>Avant de venir</h2>
          <figure class="mt-10" appReveal="2">
            <video appAutoplay class="aspect-video w-full bg-field object-cover" muted loop playsinline preload="none" [poster]="video.poster" [attr.aria-label]="video.label">
              <source [src]="video.src" type="video/mp4" />
            </video>
            <figcaption class="mt-3 text-small text-muted">Le matin sur Kinshasa. Le centre ouvre à 7 h.</figcaption>
          </figure>
        </div>
        <ul class="col-span-12 space-y-4 text-lead md:col-span-6 md:col-start-7" appReveal="1">
          <li>Apportez votre ordonnance si vous en avez une, et une pièce d’identité.</li>
          <li>Glycémie, bilan lipidique, échographie abdominale : ne mangez pas le matin.</li>
          <li>Échographie pelvienne : venez la vessie pleine.</li>
        </ul>
      </div>
    </section>

    <div class="mt-(--section)"><app-price-sentence /></div>
    <app-contact-band />
  `,
  styles: `
    .cap {
      width: 0.9em;
      height: 0.9em;
      border-radius: 50%;
    }
  `,
})
export class Services {
  protected readonly kinds = KINDS;
  protected readonly summary = KIND_SUMMARY;
  protected readonly photos = PHOTOS;
  protected readonly video = VIDEO_AUBE;

  protected byKind(kind: SampleKind) {
    return EXAMS.filter((e) => e.kind === kind);
  }

  protected photoFor(kind: SampleKind): Photo | null {
    if (kind === 'Sang') return PHOTOS.prelevement;
    if (kind === 'Échographie') return PHOTOS.echo;
    return null;
  }
}
