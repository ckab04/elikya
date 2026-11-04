import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PHOTOS } from '../core/photos';
import { Bulletin } from '../shared/bulletin';
import { ContactBand } from '../shared/contact-band';
import { PageTitle } from '../shared/page-title';
import { Reveal } from '../shared/reveal';

/** Why the centre exists, then each promise as a statement with its proof beside it. */
@Component({
  selector: 'app-le-centre',
  imports: [NgOptimizedImage, RouterLink, PageTitle, Bulletin, ContactBand, Reveal],
  template: `
    <app-page-title title="Le centre">
      Un laboratoire et un cabinet d’échographie de quartier, qui ouvre en 2027 à Bumbu, dans le district de la Funa.
    </app-page-title>

    <section class="frame grid-12 gap-y-10 pt-(--section)" aria-labelledby="origine-title">
      <h2 id="origine-title" class="head col-span-12 md:col-span-5" appReveal>D’où vient le projet</h2>
      <div class="col-span-12 space-y-6 text-lead md:col-span-6 md:col-start-7" appReveal="1">
        <p>
          À Bumbu, une prise de sang veut souvent dire une demi-journée de trajet vers un laboratoire d’une autre
          commune, puis un second voyage pour chercher le résultat. Pendant ce temps, le traitement attend.
        </p>
        <p class="text-muted">
          Le centre veut rendre ces examens ordinaires : on vient le matin, on repart avec son résultat, on le montre
          à son médecin le soir même.
        </p>
      </div>
    </section>

    <section class="pt-(--section)" aria-labelledby="engagements-title">
      <div class="frame grid-12 items-center gap-y-10">
        <div class="col-span-12 md:col-span-5">
          <h2 id="engagements-title" class="head mb-12" appReveal>Nos engagements</h2>
          <h3 class="text-lead font-semibold" appReveal>Un biologiste relit chaque résultat.</h3>
          <p class="mt-4 max-w-[38ch]" appReveal="1">Aucun résultat ne sort du laboratoire sans avoir été vérifié et signé.</p>
          <h3 class="mt-16 text-lead font-semibold" appReveal="2">Votre résultat vous appartient.</h3>
          <p class="mt-4 max-w-[38ch]" appReveal="3">
            Nous le remettons à vous seul. Nous l’envoyons à votre médecin seulement si vous nous le demandez.
          </p>
        </div>
        <div class="col-span-12 md:col-span-6 md:col-start-7" appReveal="2"><app-bulletin /></div>
      </div>

      <div class="bg-field mt-(--section) py-(--section)">
        <div class="frame grid-12 items-center gap-y-10">
          <img
            class="col-span-12 aspect-4/5 w-full bg-surface object-cover md:col-span-4"
            [ngSrc]="photos.microscope.id"
            [width]="photos.microscope.width"
            [height]="photos.microscope.height"
            sizes="(max-width: 767px) 92vw, 30vw"
            [alt]="photos.microscope.alt"
            appReveal
          />
          <div class="col-span-12 md:col-span-6 md:col-start-7">
            <h3 class="text-lead font-semibold" appReveal>Le courant ne doit pas arrêter le laboratoire.</h3>
            <p class="mt-4 max-w-[38ch]" appReveal="1">
              Le centre a sa propre alimentation de secours et sa réserve d’eau : les analyses continuent pendant les
              coupures.
            </p>
          </div>
        </div>
      </div>

      <div class="frame grid-12 mt-(--section) items-end gap-y-10">
        <div class="col-span-12 md:col-span-5">
          <h3 class="text-lead font-semibold" appReveal>Des prix affichés.</h3>
          <p class="mt-4 max-w-[38ch]" appReveal="1">
            Vous connaissez le prix avant l’examen, en francs congolais.
            <a class="link font-medium" routerLink="/tarifs">Voir les tarifs</a>
          </p>
        </div>
        <img
          class="col-span-12 aspect-16/10 w-full bg-surface object-cover md:col-span-6 md:col-start-7"
          [ngSrc]="photos.tube.id"
          [width]="photos.tube.width"
          [height]="photos.tube.height"
          sizes="(max-width: 767px) 92vw, 46vw"
          [alt]="photos.tube.alt"
          appReveal="2"
        />
      </div>
    </section>

    <section class="frame grid-12 gap-y-6 pt-(--section)" aria-labelledby="equipe-title">
      <h2 id="equipe-title" class="head col-span-12 md:col-span-5" appReveal>L’équipe</h2>
      <!-- TODO(contenu) : nom, fonction et photo de chaque membre de l'équipe, prise au centre. -->
      <p class="col-span-12 text-lead md:col-span-6 md:col-start-7" appReveal="1">
        Des biologistes, des techniciens de laboratoire et une équipe d’accueil. Nous les présenterons ici, avec leurs
        photos, avant l’ouverture.
      </p>
    </section>

    <app-contact-band />
  `,
})
export class LeCentre {
  protected readonly photos = PHOTOS;
}
