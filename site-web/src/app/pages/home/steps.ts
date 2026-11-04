import { Component } from '@angular/core';
import { TrPipe } from '../../core/i18n';
import { Reveal } from '../../shared/reveal';

/** The visit in four plain steps: what to bring, how long it takes, how the result arrives. */
@Component({
  selector: 'app-steps',
  imports: [Reveal, TrPipe],
  template: `
    <section class="container-site py-(--section)" aria-labelledby="visite-title">
      <h2 id="visite-title" class="head text-center" appReveal>{{ 'Comment se passe votre examen ?' | tr }}</h2>
      <ol class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        @for (step of steps; track step.title; let i = $index) {
          <li class="card p-6" [appReveal]="i">
            <span class="num" aria-hidden="true">{{ i + 1 }}</span>
            <h3 class="mt-4 text-lead font-semibold">{{ step.title | tr }}</h3>
            <p class="mt-2 text-muted">{{ step.text | tr }}</p>
          </li>
        }
      </ol>
    </section>
  `,
  styles: `
    ol {
      list-style: none;
      padding: 0;
    }
    .num {
      display: inline-grid;
      place-items: center;
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      background: var(--color-accent);
      color: var(--color-accent-ink);
      font-weight: 600;
    }
  `,
})
export class Steps {
  protected readonly steps = [
    {
      title: 'Venez le matin',
      text: 'Le centre ouvre à 7 h. Apportez votre ordonnance si vous en avez une. Certains examens se font à jeun.',
    },
    { title: 'Le prélèvement', text: 'La prise de sang dure cinq minutes. Chaque tube porte votre nom et un numéro.' },
    { title: 'L’analyse', text: 'Les analyses se font sur place, à Bumbu. Les tubes ne traversent pas la ville.' },
    {
      title: 'Votre résultat',
      text: 'Un biologiste le relit et le signe. Vous le recevez sur papier, par SMS ou par e-mail.',
    },
  ] as const;
}
