import { Component } from '@angular/core';

/**
 * A results sheet drawn in HTML: the object the patient takes to the doctor, with the biologist's stamp.
 * It is an example (labelled as such); the values are typical adult reference values.
 * `data-ui` tells the taste inspector that its table lines belong to the document.
 */
@Component({
  selector: 'app-bulletin',
  host: { 'data-ui': '' },
  template: `
    <figure class="sheet" aria-label="Exemple de bulletin d’analyses validé par un biologiste">
      <div class="sheet__head">
        <p class="font-semibold">Centre de santé Elikya</p>
        <p>Laboratoire · Bumbu, Kinshasa</p>
      </div>
      <p class="sheet__title">Numération formule sanguine — exemple</p>
      <table>
        <thead>
          <tr><th scope="col">Analyse</th><th scope="col">Résultat</th><th scope="col">Valeurs usuelles</th></tr>
        </thead>
        <tbody>
          <tr><th scope="row">Hémoglobine</th><td>12,8 g/dL</td><td>12 – 16</td></tr>
          <tr><th scope="row">Globules blancs</th><td>6 400 /mm³</td><td>4 000 – 10 000</td></tr>
          <tr><th scope="row">Plaquettes</th><td>245 000 /mm³</td><td>150 000 – 400 000</td></tr>
        </tbody>
      </table>
      <div class="sheet__foot">
        <p>Résultat relu et signé par le biologiste.</p>
        <p class="stamp" aria-hidden="true">Validé<br /><span>Elikya · Bumbu</span></p>
      </div>
    </figure>
  `,
  styles: `
    .sheet {
      margin: 0;
      width: min(100%, 30rem);
      padding: clamp(1.25rem, 3vw, 2rem);
      background: #fff;
      color: #1b1b1b;
      font-size: var(--text-small);
      line-height: 1.45;
    }
    .sheet p {
      margin: 0;
    }
    .sheet__head {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid #1b1b1b;
    }
    .sheet__title {
      margin: 1.25rem 0 0.75rem !important;
      font-size: var(--text-body);
      font-weight: 600;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th,
    td {
      padding: 0.45rem 0.5rem 0.45rem 0;
      border-bottom: 1px solid #d6d6d6;
      text-align: left;
      font-weight: 400;
    }
    thead th {
      color: #5b5b5b;
    }
    td:nth-child(2) {
      font-weight: 600;
    }
    .sheet__foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-top: 1.25rem;
    }
    .stamp {
      flex: none;
      display: grid;
      place-content: center;
      width: 6.5rem;
      height: 6.5rem;
      border: 3px solid #1d3f9a;
      border-radius: 50%;
      color: #1d3f9a;
      font-size: 1.1rem;
      font-weight: 600;
      line-height: 1.1;
      text-align: center;
      text-transform: none;
      transform: rotate(-12deg);
    }
    .stamp span {
      font-size: 0.7rem;
      font-weight: 500;
    }
  `,
})
export class Bulletin {}
