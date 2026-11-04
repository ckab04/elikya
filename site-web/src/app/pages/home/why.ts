import { Component } from '@angular/core';
import { TrPipe } from '../../core/i18n';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal';

/** Four reasons with their icons. */
@Component({
  selector: 'app-why',
  imports: [Icon, Reveal, TrPipe],
  template: `
    <section class="band py-(--section)" aria-labelledby="pourquoi-title">
      <div class="container-site">
        <h2 id="pourquoi-title" class="head text-center" appReveal>{{ 'Pourquoi choisir Elikya ?' | tr }}</h2>
        <ul class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (r of reasons; track r.title; let i = $index) {
            <li class="card p-6" [appReveal]="i">
              <span class="icon-tile"><app-icon [name]="r.icon" /></span>
              <h3 class="mt-4 text-lead font-semibold">{{ r.title | tr }}</h3>
              <p class="mt-2 text-muted">{{ r.text | tr }}</p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class Why {
  protected readonly reasons = [
    { icon: 'pin', title: 'La proximité', text: 'Un laboratoire moderne à Bumbu, sans longs trajets à travers Kinshasa.' },
    { icon: 'check', title: 'Des résultats fiables', text: 'Chaque résultat est vérifié et signé par un biologiste.' },
    { icon: 'clock', title: 'Des délais courts', text: 'La plupart des résultats sont prêts le jour même.' },
    { icon: 'lock', title: 'La confidentialité', text: 'Votre résultat est remis à vous seul, ou à votre médecin si vous le demandez.' },
  ] as const;
}
