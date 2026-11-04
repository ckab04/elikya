import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Banner for the doctors and health centres who send patients. */
@Component({
  selector: 'app-partners-close',
  imports: [RouterLink],
  template: `
    <section class="container-site pb-(--section)" aria-labelledby="medecins-title">
      <div class="flex flex-col items-start justify-between gap-6 rounded-2xl bg-paper p-8 text-white md:flex-row md:items-center md:p-12 [--focus:#ffffff]">
        <div>
          <h2 id="medecins-title" class="head">Vous êtes médecin, hôpital ou partenaire&nbsp;?</h2>
          <p class="mt-3 max-w-[56ch] text-lead text-white/85">
            Orientez vos patients vers nous&nbsp;: avec leur accord, le résultat validé vous est envoyé directement.
          </p>
        </div>
        <a class="btn btn-ink shrink-0" routerLink="/partenaires">Devenir partenaire</a>
      </div>
    </section>
  `,
})
export class PartnersClose {}
