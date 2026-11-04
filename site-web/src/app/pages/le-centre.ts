import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TrPipe } from '../core/i18n';
import { PHOTOS } from '../core/photos';
import { Bulletin } from '../shared/bulletin';
import { ContactBand } from '../shared/contact-band';
import { Icon, IconName } from '../shared/icon';
import { PageTitle } from '../shared/page-title';
import { Reveal } from '../shared/reveal';

/** Why the centre exists, then each promise as a statement with its proof beside it. */
@Component({
  selector: 'app-le-centre',
  imports: [NgOptimizedImage, PageTitle, Bulletin, ContactBand, Reveal, Icon, TrPipe],
  template: `
    <app-page-title [title]="'Le centre' | tr">
      {{ 'Un laboratoire et un cabinet d’échographie de quartier, qui ouvre en 2027 à Bumbu, dans le district de la Funa.' | tr }}
    </app-page-title>

    <section class="frame grid items-center gap-10 py-(--section) lg:grid-cols-2" aria-labelledby="origine-title">
      <div>
        <h2 id="origine-title" class="head" appReveal>{{ 'D’où vient le projet' | tr }}</h2>
        <p class="mt-5 text-lead" appReveal="1">
          {{ 'À Bumbu, une prise de sang veut souvent dire une demi-journée de trajet vers un laboratoire d’une autre commune, puis un second voyage pour chercher le résultat. Pendant ce temps, le traitement attend.' | tr }}
        </p>
        <p class="mt-4 text-muted" appReveal="2">
          {{ 'Elikya veut dire « espoir » en lingala. Le centre veut rendre ces examens ordinaires : on vient le matin, on repart avec son résultat, on le montre à son médecin le soir même.' | tr }}
        </p>
      </div>
      <img
        class="aspect-16/10 w-full rounded-xl! bg-surface object-cover shadow-lg"
        [ngSrc]="photos.quartier.id"
        [width]="photos.quartier.width"
        [height]="photos.quartier.height"
        sizes="(max-width: 1023px) 92vw, 46vw"
        style="object-position: 55% 60%"
        [alt]="photos.quartier.alt | tr"
        appReveal="1"
      />
    </section>

    <section class="frame pb-(--section)" [attr.aria-label]="'Le centre en bref' | tr">
      <ul class="grid gap-6 md:grid-cols-3">
        @for (f of facts; track f.title; let i = $index) {
          <li class="card flex items-start gap-4 p-6" [appReveal]="i">
            <span class="icon-tile shrink-0"><app-icon [name]="f.icon" /></span>
            <span>
              <span class="block text-small text-muted">{{ f.label | tr }}</span>
              <span class="block text-lead font-semibold">{{ f.title | tr }}</span>
            </span>
          </li>
        }
      </ul>
    </section>

    <section class="band py-(--section)" aria-labelledby="engagements-title">
      <div class="frame">
        <h2 id="engagements-title" class="head" appReveal>{{ 'Nos engagements' | tr }}</h2>
        <div class="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_auto]">
          <ul class="grid gap-6 sm:grid-cols-2">
            @for (e of promises; track e.title; let i = $index) {
              <li class="card p-6" [appReveal]="i">
                <span class="icon-tile"><app-icon [name]="e.icon" /></span>
                <h3 class="mt-4 text-lead font-semibold">{{ e.title | tr }}</h3>
                <p class="mt-2 text-muted">{{ e.text | tr }}</p>
              </li>
            }
          </ul>
          <figure class="card overflow-hidden p-4" appReveal="2">
            <app-bulletin />
            <figcaption class="mt-3 px-2 text-small text-muted">{{ 'Exemple de bulletin, validé et signé par le biologiste.' | tr }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="frame py-(--section)" aria-labelledby="equipe-title">
      <div class="card grid items-center gap-8 overflow-hidden md:grid-cols-[1fr_20rem]">
        <div class="p-6 md:p-10">
          <span class="icon-tile"><app-icon name="users" /></span>
          <h2 id="equipe-title" class="head mt-4" appReveal>{{ 'L’équipe' | tr }}</h2>
          <!-- TODO(contenu) : nom, fonction et photo de chaque membre de l'équipe, prise au centre. -->
          <p class="mt-3 text-lead text-muted" appReveal="1">
            {{ 'Des biologistes, des techniciens de laboratoire et une équipe d’accueil. Nous les présenterons ici, avec leurs photos, avant l’ouverture.' | tr }}
          </p>
        </div>
        <img
          class="h-full w-full rounded-none! bg-surface object-cover max-md:aspect-16/9"
          [ngSrc]="photos.microscope.id"
          [width]="photos.microscope.width"
          [height]="photos.microscope.height"
          sizes="(max-width: 767px) 92vw, 20rem"
          style="object-position: 50% 35%"
          [alt]="photos.microscope.alt | tr"
        />
      </div>
    </section>

    <app-contact-band />
  `,

})
export class LeCentre {
  protected readonly photos = PHOTOS;

  protected readonly facts: readonly { icon: IconName; label: string; title: string }[] = [
    { icon: 'pin', label: 'Où', title: 'Bumbu, district de la Funa' },
    { icon: 'building', label: 'Ouverture', title: 'Premier trimestre 2027' },
    { icon: 'clock', label: 'Horaires', title: 'Lun.–ven. 7 h–18 h, sam. 8 h–14 h' },
  ];

  protected readonly promises: readonly { icon: IconName; title: string; text: string }[] = [
    { icon: 'check', title: 'Un biologiste relit chaque résultat', text: 'Aucun résultat ne sort du laboratoire sans avoir été vérifié et signé.' },
    { icon: 'lock', title: 'Votre résultat vous appartient', text: 'Remis à vous seul, ou à votre médecin si vous le demandez.' },
    { icon: 'bolt', title: 'Pas d’arrêt pendant les coupures', text: 'Alimentation de secours et réserve d’eau : les analyses continuent.' },
    { icon: 'money', title: 'Des prix affichés', text: 'Vous connaissez le prix avant l’examen, en francs congolais.' },
  ];
}
