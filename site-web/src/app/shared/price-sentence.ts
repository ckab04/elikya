import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EXAMS, FEATURED_EXAMS, formatFc, formatUsd, PRICES_CONFIRMED } from '../core/content';

/**
 * Price lookup: pick an exam, read its price, whether to come fasting and when the result is ready.
 * Without script the prerendered answer (NFS) and the link to the full price list remain.
 */
@Component({
  selector: 'app-price-sentence',
  imports: [RouterLink],
  template: `
    <section class="frame pt-(--section)" aria-labelledby="prix-title">
      <h2 id="prix-title" class="head">Combien coûte un examen&nbsp;?</h2>

      <div class="grid-12 mt-8 gap-y-6">
        <div role="group" aria-label="Choisir un examen" class="col-span-12 flex flex-wrap gap-2 lg:col-span-5 lg:flex-col lg:items-start">
          @for (exam of featured; track exam.id) {
            <button type="button" class="choice" [attr.aria-pressed]="exam.id === selectedId()" (click)="selectedId.set(exam.id)">
              {{ exam.short }}
            </button>
          }
        </div>

        <div class="panel col-span-12 lg:col-span-7" aria-live="polite">
          <p class="text-lead font-semibold">{{ exam().name }}</p>
          <p class="mt-2 text-[clamp(2rem,1.6rem+1.6vw,2.75rem)] leading-tight font-semibold text-accent">{{ price() }}</p>
          <p class="text-muted">soit environ {{ usd() }}</p>
          <ul class="mt-5 space-y-1.5">
            @for (line of details(); track line) {
              <li>{{ line }}</li>
            }
          </ul>
          @if (!pricesConfirmed) {
            <p class="mt-5 text-small text-muted">Tarifs indicatifs, confirmés avant l’ouverture.</p>
          }
        </div>
      </div>

      @if (linkToPrices()) {
        <p class="mt-6"><a class="link font-medium" routerLink="/tarifs">Voir tous les prix</a></p>
      }
    </section>
  `,
  styles: `
    .choice {
      min-height: 2.75rem;
      padding: 0.5rem 1rem;
      border: 2px solid var(--color-surface);
      border-radius: 0.375rem;
      background: var(--color-ground);
      color: var(--color-ink);
      font: inherit;
      font-weight: 500;
      cursor: pointer;
      transition: border-color var(--t-hover) ease, background-color var(--t-hover) ease;
    }
    .choice[aria-pressed='true'] {
      border-color: var(--color-accent);
      background: var(--color-accent);
      color: var(--color-accent-ink);
    }
    @media (hover: hover) and (pointer: fine) {
      .choice:not([aria-pressed='true']):hover {
        border-color: var(--color-accent);
      }
    }
  `,
})
export class PriceSentence {
  /** Show the « Voir tous les prix » link (off on the price page itself). */
  readonly linkToPrices = input(true);

  protected readonly pricesConfirmed = PRICES_CONFIRMED;
  protected readonly featured = FEATURED_EXAMS.map((id) => EXAMS.find((e) => e.id === id)!);
  protected readonly selectedId = signal<string>(FEATURED_EXAMS[0]);

  protected readonly exam = computed(() => EXAMS.find((e) => e.id === this.selectedId())!);
  protected readonly price = computed(() => formatFc(this.exam().priceFc));
  protected readonly usd = computed(() => formatUsd(this.exam().priceFc));
  protected readonly details = computed(() => {
    const e = this.exam();
    return [
      `Résultat ${e.delay}`,
      e.fasting ? 'Venez à jeun (ne mangez pas le matin)' : 'Pas besoin d’être à jeun',
      e.tube ? `Prélèvement : ${e.tube.label}` : 'Sans prise de sang',
    ];
  });
}
