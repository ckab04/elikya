import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Photo, PHOTOS } from '../core/photos';
import { ContactBand } from '../shared/contact-band';
import { PageTitle } from '../shared/page-title';
import { Reveal } from '../shared/reveal';

interface Audience {
  readonly id: string;
  readonly title: string;
  readonly text: string;
  readonly more: string;
  readonly photo: Photo;
  readonly position: string;
}

/** Three audiences, each a statement with a picture, alternating sides so neighbours never share a layout. */
@Component({
  selector: 'app-partenaires',
  imports: [NgOptimizedImage, RouterLink, PageTitle, ContactBand, Reveal],
  template: `
    <app-page-title title="Partenaires">
      Un laboratoire de quartier fonctionne bien quand les médecins et les structures de santé autour de lui
      travaillent avec lui.
    </app-page-title>

    @for (a of audiences; track a.id; let even = $even) {
      <section class="frame grid-12 items-center gap-y-10 pt-(--section)" [id]="a.id" [attr.aria-labelledby]="a.id + '-title'">
        <img
          class="col-span-12 aspect-4/5 w-full bg-surface object-cover md:col-span-4"
          [class.md:col-start-9]="even"
          [class.md:row-start-1]="even"
          [ngSrc]="a.photo.id"
          [width]="a.photo.width"
          [height]="a.photo.height"
          sizes="(max-width: 767px) 92vw, 30vw"
          [alt]="a.photo.alt"
          [style.object-position]="a.position"
          appReveal="1"
        />
        <div class="col-span-12 md:col-span-6" [class.md:col-start-7]="!even" [class.md:col-start-1]="even">
          <h2 [id]="a.id + '-title'" class="head" appReveal>{{ a.title }}</h2>
          <p class="mt-6 max-w-[38ch] text-lead" appReveal="1">{{ a.text }}</p>
          <p class="mt-4 max-w-[42ch]" appReveal="2">{{ a.more }}</p>
        </div>
      </section>
    }

    <section class="frame pt-(--section)" aria-labelledby="ecrire-title">
      <h2 id="ecrire-title" class="head max-w-[18ch]" appReveal>Proposer un partenariat</h2>
      <p class="mt-8" appReveal="1">
        <a class="btn" routerLink="/contact" [queryParams]="{ objet: 'partenariat' }">Nous écrire</a>
      </p>
    </section>

    <app-contact-band />
  `,
})
export class Partenaires {
  protected readonly photos = PHOTOS;
  protected readonly audiences: readonly Audience[] = [
    {
      id: 'medecins',
      title: 'Médecins',
      text: 'Adressez-nous vos patients avec une ordonnance habituelle. S’ils sont d’accord, le résultat vous est envoyé dès qu’il est validé.',
      more: 'Pour un résultat inhabituel ou une question sur un examen, le biologiste répond directement.',
      photo: PHOTOS.tube,
      position: '35% 45%',
    },
    {
      id: 'etablissements',
      title: 'Hôpitaux et centres de santé',
      text: 'Pas de laboratoire, pas d’échographe, ou trop de demandes ? Nous prenons vos examens en charge.',
      more: 'Les tarifs, les délais et la transmission des résultats sont fixés ensemble dans une convention.',
      photo: PHOTOS.microscope,
      position: '50% 30%',
    },
    {
      id: 'donateurs',
      title: 'Donateurs',
      text: 'Il manque encore une partie des fonds pour l’équipement. Nous vous montrons le budget en détail.',
      more: 'Particuliers, organisations ou investisseurs : nous rendrons compte de l’usage de chaque contribution.',
      photo: PHOTOS.quartier,
      position: '60% 60%',
    },
  ];
}
