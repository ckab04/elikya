import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TrPipe, LocalPathPipe } from '../core/i18n';
import { RouterLink } from '@angular/router';
import { Photo, PHOTOS } from '../core/photos';
import { ContactBand } from '../shared/contact-band';
import { Icon, IconName } from '../shared/icon';
import { PageTitle } from '../shared/page-title';
import { Reveal } from '../shared/reveal';

interface Audience {
  readonly id: string;
  readonly title: string;
  readonly text: string;
  readonly icon: IconName;
  readonly benefits: readonly string[];
  readonly photo: Photo;
  readonly position: string;
}

/** Three audiences, each a statement with a picture, alternating sides so neighbours never share a layout. */
@Component({
  selector: 'app-partenaires',
  imports: [NgOptimizedImage, RouterLink, PageTitle, ContactBand, Reveal, Icon, TrPipe, LocalPathPipe],
  template: `
    <app-page-title [title]="'Partenaires' | tr">
      {{ 'Un laboratoire de quartier fonctionne bien quand les médecins et les structures de santé autour de lui travaillent avec lui.' | tr }}
    </app-page-title>

    <section class="frame py-(--section)" [attr.aria-label]="'Qui peut travailler avec nous' | tr">
      <ul class="grid gap-6 lg:grid-cols-3">
        @for (a of audiences; track a.id; let i = $index) {
          <li class="card flex flex-col overflow-hidden scroll-mt-24" [id]="a.id" [appReveal]="i">
            <img
              class="aspect-16/10 w-full rounded-none! bg-surface object-cover"
              [ngSrc]="a.photo.id"
              [width]="a.photo.width"
              [height]="a.photo.height"
              sizes="(max-width: 1023px) 92vw, 30vw"
              [alt]="a.photo.alt | tr"
              [style.object-position]="a.position"
            />
            <div class="flex grow flex-col p-6">
              <span class="icon-tile -mt-12 border-4 border-white"><app-icon [name]="a.icon" /></span>
              <h2 class="mt-3 text-lead font-semibold">{{ a.title | tr }}</h2>
              <p class="mt-2">{{ a.text | tr }}</p>
              <ul class="mt-4 space-y-2 text-muted">
                @for (b of a.benefits; track b) {
                  <li class="flex gap-2"><span class="mt-0.5 text-accent"><app-icon name="check" [size]="18" /></span>{{ b | tr }}</li>
                }
              </ul>
            </div>
          </li>
        }
      </ul>
    </section>

    <section class="frame pb-(--section)" aria-labelledby="ecrire-title">
      <div class="flex flex-col items-start justify-between gap-6 rounded-2xl bg-paper p-8 text-white md:flex-row md:items-center md:p-12 [--focus:#ffffff]">
        <div>
          <h2 id="ecrire-title" class="head">{{ 'Proposer un partenariat' | tr }}</h2>
          <p class="mt-3 max-w-[56ch] text-lead text-white/85">
            {{ 'Écrivez-nous : nous vous répondons pour fixer ensemble les conditions.' | tr }}
          </p>
        </div>
        <a class="btn btn-ink shrink-0" [routerLink]="'/contact' | lp" [queryParams]="{ objet: 'partenariat' }">{{ 'Nous écrire' | tr }}</a>
      </div>
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
      icon: 'users',
      benefits: ['Résultat envoyé dès qu’il est validé', 'Le biologiste répond à vos questions', 'Ordonnance habituelle, rien à changer'],
      text: 'Adressez-nous vos patients avec une ordonnance habituelle. S’ils sont d’accord, le résultat vous est envoyé dès qu’il est validé.',
      photo: PHOTOS.tube,
      position: '35% 45%',
    },
    {
      id: 'etablissements',
      title: 'Hôpitaux et centres de santé',
      icon: 'building',
      benefits: ['Convention de partenariat', 'Tarifs et délais fixés ensemble', 'Suivi des patients adressés'],
      text: 'Pas de laboratoire, pas d’échographe, ou trop de demandes ? Nous prenons vos examens en charge.',
      photo: PHOTOS.microscope,
      position: '50% 30%',
    },
    {
      id: 'donateurs',
      title: 'Donateurs',
      icon: 'heart',
      benefits: ['Budget présenté en détail', 'Compte rendu de l’usage des fonds', 'Un impact direct dans le quartier'],
      text: 'Il manque encore une partie des fonds pour l’équipement. Nous vous montrons le budget en détail.',
      photo: PHOTOS.quartier,
      position: '60% 60%',
    },
  ];
}
