import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TrPipe, LocalPathPipe } from '../../core/i18n';
import { RouterLink } from '@angular/router';
import { PHOTOS } from '../../core/photos';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal';

/** The three services as cards, each with its picture and a link to the details. */
@Component({
  selector: 'app-services-overview',
  imports: [NgOptimizedImage, RouterLink, Icon, Reveal, TrPipe, LocalPathPipe],
  template: `
    <section class="container-site py-(--section)" aria-labelledby="services-title">
      <div class="text-center">
        <h2 id="services-title" class="head" appReveal>{{ 'Nos prestations' | tr }}</h2>
        <p class="mx-auto mt-3 max-w-[52ch] text-muted" appReveal="1">
          {{ 'Trois domaines pour accompagner les patients et les médecins de la Funa.' | tr }}
        </p>
      </div>
      <ul class="mt-10 grid gap-6 md:grid-cols-3">
        @for (s of services; track s.title; let i = $index) {
          <li class="card flex flex-col overflow-hidden" [appReveal]="i">
            <img
              class="aspect-16/10 w-full rounded-none! bg-surface object-cover"
              [ngSrc]="s.photo.id"
              [width]="s.photo.width"
              [height]="s.photo.height"
              sizes="(max-width: 767px) 92vw, 30vw"
              [style.object-position]="s.position"
              [alt]="s.photo.alt | tr"
            />
            <div class="flex grow flex-col p-6">
              <span class="icon-tile -mt-12 border-4 border-white bg-surface"><app-icon [name]="s.icon" /></span>
              <h3 class="mt-3 text-lead font-semibold">{{ s.title | tr }}</h3>
              <p class="mt-2 grow text-muted">{{ s.text | tr }}</p>
              <a class="link mt-5 inline-flex items-center gap-1.5 font-medium" [routerLink]="s.link | lp">
                {{ s.linkLabel | tr }} <app-icon name="arrow" [size]="18" />
              </a>
            </div>
          </li>
        }
      </ul>
    </section>
  `,
})
export class ServicesOverview {
  protected readonly services = [
    {
      icon: 'flask',
      title: 'Analyses biologiques',
      text: 'Prise de sang, urines, selles. Le prélèvement se fait sur place, sans rendez-vous, et chaque résultat est validé par un biologiste.',
      link: '/services',
      linkLabel: 'Voir les analyses',
      photo: PHOTOS.tube,
      position: '35% 45%',
    },
    {
      icon: 'wave',
      title: 'Échographie',
      text: 'Grossesse, pelvis, abdomen. Vous repartez avec les images et le compte rendu, envoyé aussi à votre médecin si vous le souhaitez.',
      link: '/services',
      linkLabel: 'Voir les échographies',
      photo: PHOTOS.echo,
      position: '50% 50%',
    },
    {
      icon: 'shield',
      title: 'Dépistage et suivi',
      text: 'Paludisme, diabète, tension, bilans de santé. Des tarifs affichés en francs congolais, connus avant de venir.',
      link: '/tarifs',
      linkLabel: 'Voir les tarifs',
      photo: PHOTOS.microscope,
      position: '50% 35%',
    },
  ] as const;
}
