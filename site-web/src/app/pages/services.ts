import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TrPipe, LocalPathPipe } from '../core/i18n';
import { EXAMS, KIND_SUMMARY, KINDS, SampleKind } from '../core/content';
import { Photo, PHOTOS, VIDEO_AUBE } from '../core/photos';
import { Autoplay } from '../shared/autoplay';
import { ContactBand } from '../shared/contact-band';
import { Icon, IconName } from '../shared/icon';
import { PageTitle } from '../shared/page-title';
import { PriceSentence } from '../shared/price-sentence';
import { Reveal } from '../shared/reveal';

const KIND_ICON: Record<SampleKind, IconName> = { Sang: 'drop', Urines: 'cup', Selles: 'cup', Échographie: 'wave' };
const KIND_ID: Record<SampleKind, string> = { Sang: 'sang', Urines: 'urines', Selles: 'selles', Échographie: 'echographie' };

/** One card per kind of sample: what it is, then its exams with the tube and when the result is ready. */
@Component({
  selector: 'app-services',
  imports: [NgOptimizedImage, PageTitle, PriceSentence, ContactBand, Reveal, Autoplay, Icon, TrPipe, LocalPathPipe],
  template: `
    <app-page-title [title]="'Examens' | tr">
      {{ 'Prise de sang, urines, selles et échographie, avec ou sans ordonnance. Pour chaque examen : le tube, s’il faut venir à jeun, et quand le résultat est prêt.' | tr }}
    </app-page-title>

    <nav class="frame mt-8 flex flex-wrap gap-2" [attr.aria-label]="'Types d’examens' | tr">
      @for (kind of kinds; track kind) {
        <a class="chip-link" [href]="('/services' | lp) + '#' + ids[kind]">
          <app-icon [name]="icons[kind]" [size]="18" />{{ kind | tr }}
        </a>
      }
    </nav>

    <div class="frame mt-8 space-y-6 pb-(--section)">
      @for (kind of kinds; track kind) {
        <section class="card scroll-mt-24 overflow-hidden" [id]="ids[kind]" [attr.aria-labelledby]="'k-' + ids[kind]" appReveal>
          <div class="grid lg:grid-cols-[1fr_18rem]">
            <div class="p-6 md:p-8">
              <div class="flex items-start gap-4">
                <span class="icon-tile shrink-0"><app-icon [name]="icons[kind]" /></span>
                <div>
                  <h2 [id]="'k-' + ids[kind]" class="head">{{ kind | tr }}</h2>
                  <p class="mt-2 max-w-[60ch] text-muted">{{ summary[kind] | tr }}</p>
                </div>
              </div>

              <table class="mt-6 w-full">
                <caption class="visually-hidden">{{ 'Examens :' | tr }} {{ kind | tr }}</caption>
                <thead>
                  <tr class="text-small text-muted">
                    <th scope="col" class="pb-2 text-left font-medium">{{ 'Examen' | tr }}</th>
                    <th scope="col" class="pb-2 text-left font-medium max-sm:hidden">{{ 'Prélèvement' | tr }}</th>
                    <th scope="col" class="pb-2 text-right font-medium">{{ 'Résultat' | tr }}</th>
                  </tr>
                </thead>
                <tbody>
                  @for (exam of byKind(kind); track exam.id) {
                    <tr class="row">
                      <th scope="row" class="py-3 pr-4 text-left align-top font-medium">
                        {{ exam.name | tr }}
                        @if (exam.fasting) {
                          <span class="badge">{{ 'À jeun' | tr }}</span>
                        }
                      </th>
                      <td class="py-3 pr-4 align-top text-muted max-sm:hidden">
                        @if (exam.tube; as t) {
                          <span class="inline-flex items-center gap-2">
                            <span class="cap" [style.background]="t.colour" aria-hidden="true"></span>{{ t.label | tr }}
                          </span>
                        } @else {
                          {{ 'Sans prélèvement' | tr }}
                        }
                      </td>
                      <td class="py-3 text-right align-top whitespace-nowrap">{{ exam.delay | tr }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>

            @if (photoFor(kind); as p) {
              <img
                class="h-full max-h-80 w-full rounded-none! bg-surface object-cover max-lg:aspect-16/9 lg:max-h-none"
                [ngSrc]="p.id"
                [width]="p.width"
                [height]="p.height"
                sizes="(max-width: 1023px) 92vw, 18rem"
                [alt]="p.alt | tr"
              />
            }
          </div>
        </section>
      }
    </div>

    <section class="band py-(--section)" aria-labelledby="avant-title">
      <div class="frame grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h2 id="avant-title" class="head" appReveal>{{ 'Avant de venir' | tr }}</h2>
          <ul class="mt-6 space-y-3">
            @for (tip of tips; track tip; let i = $index) {
              <li class="card flex items-start gap-3 p-4" [appReveal]="i">
                <span class="mt-0.5 text-accent"><app-icon name="check" /></span>
                <span>{{ tip | tr }}</span>
              </li>
            }
          </ul>
        </div>
        <figure appReveal="1">
          <video
            appAutoplay
            class="aspect-video w-full bg-field object-cover shadow-lg"
            muted
            loop
            playsinline
            preload="none"
            [poster]="video.poster"
            [attr.aria-label]="video.label | tr"
          >
            <source [src]="video.src" type="video/mp4" />
          </video>
          <figcaption class="mt-3 text-small text-muted">{{ 'Un quartier de Kinshasa, du jour à la nuit. Le centre ouvre à 7 h.' | tr }}</figcaption>
        </figure>
      </div>
    </section>

    <app-price-sentence />
    <app-contact-band />
  `,
  styles: `
    .chip-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      min-height: 2.75rem;
      padding: 0.5rem 1rem;
      border: 1px solid #dbe5f1;
      border-radius: 999px;
      background: #fff;
      color: var(--color-ink);
      font-weight: 500;
      text-decoration: none;
      transition: border-color var(--t-hover) ease, color var(--t-hover) ease;
    }
    .chip-link app-icon {
      color: var(--color-accent);
    }
    @media (hover: hover) and (pointer: fine) {
      .chip-link:hover {
        border-color: var(--color-accent);
        color: var(--color-accent);
      }
    }
    .row + .row > * {
      border-top: 1px solid #e6edf6;
    }
    .badge {
      display: inline-block;
      margin-left: 0.5rem;
      padding: 0.05rem 0.5rem;
      border-radius: 999px;
      background: #fff4e0;
      color: #8a4b00;
      font-size: var(--text-small);
      font-weight: 500;
      vertical-align: 0.1em;
    }
    .cap {
      width: 0.9em;
      height: 0.9em;
      border-radius: 50%;
      outline: 1px solid rgb(0 0 0 / 0.12);
    }
  `,
})
export class Services {
  protected readonly kinds = KINDS;
  protected readonly summary = KIND_SUMMARY;
  protected readonly icons = KIND_ICON;
  protected readonly ids = KIND_ID;
  protected readonly video = VIDEO_AUBE;
  protected readonly tips = [
    'Apportez votre ordonnance si vous en avez une, et une pièce d’identité.',
    'Glycémie, bilan lipidique, échographie abdominale : ne mangez pas le matin.',
    'Échographie pelvienne : venez la vessie pleine.',
    'Pour une échographie, appelez avant pour prendre rendez-vous.',
  ];

  protected byKind(kind: SampleKind) {
    return EXAMS.filter((e) => e.kind === kind);
  }

  protected photoFor(kind: SampleKind): Photo | null {
    if (kind === 'Sang') return PHOTOS.prelevement;
    if (kind === 'Échographie') return PHOTOS.echo;
    if (kind === 'Urines') return PHOTOS.microscope;
    return null;
  }
}
