/**
 * Catalogue des examens : une seule source pour la liste, les tarifs et la phrase « Une NFS coûte … ».
 *
 * TODO(contenu) — à valider par le biologiste avant l'ouverture :
 * - la liste des examens, les tubes et les délais ;
 * - les prix : ce sont des PRIX INDICATIFS d'exemple (ordre de grandeur des laboratoires privés de Kinshasa),
 *   affichés avec la mention « Tarifs indicatifs » tant que `PRICES_CONFIRMED` vaut false.
 */

export const PRICES_CONFIRMED = false;

/** Taux utilisé pour l'équivalent en dollars. TODO(contenu) : taux du jour à l'ouverture. */
export const FC_PER_USD = 2850;

export type SampleKind = 'Sang' | 'Urines' | 'Selles' | 'Échographie';

export interface Tube {
  /** Nom courant du tube, tel qu'on le dit au laboratoire. */
  readonly label: string;
  readonly colour: string;
}

export interface Exam {
  readonly id: string;
  readonly name: string;
  /** Forme courte avec article, pour la phrase : « Une NFS coûte … ». */
  readonly phrase: string;
  /** Nom court, pour les boutons de choix. */
  readonly short: string;
  readonly kind: SampleKind;
  readonly tube: Tube | null;
  readonly fasting: boolean;
  readonly delay: string;
  readonly priceFc: number;
}

const VIOLET: Tube = { label: 'tube violet', colour: '#7b4fa0' };
const GRIS: Tube = { label: 'tube gris', colour: '#9a9a9a' };
const ROUGE: Tube = { label: 'tube rouge', colour: '#c8102e' };
const NOIR: Tube = { label: 'tube noir', colour: '#111111' };
const POT: Tube = { label: 'pot stérile', colour: '#e8e8e8' };

export const EXAMS: readonly Exam[] = [
  { id: 'nfs', name: 'Numération formule sanguine (NFS)', phrase: 'Une NFS', short: 'NFS', kind: 'Sang', tube: VIOLET, fasting: false, delay: 'le jour même', priceFc: 15000 },
  { id: 'goutte-epaisse', name: 'Goutte épaisse (paludisme)', phrase: 'Une goutte épaisse', short: 'Goutte épaisse', kind: 'Sang', tube: VIOLET, fasting: false, delay: 'en 2 heures', priceFc: 5000 },
  { id: 'glycemie', name: 'Glycémie', phrase: 'Une glycémie', short: 'Glycémie', kind: 'Sang', tube: GRIS, fasting: true, delay: 'en 2 heures', priceFc: 5000 },
  { id: 'groupe', name: 'Groupe sanguin et rhésus', phrase: 'Un groupe sanguin', short: 'Groupe sanguin', kind: 'Sang', tube: VIOLET, fasting: false, delay: 'le jour même', priceFc: 7000 },
  { id: 'vs', name: 'Vitesse de sédimentation (VS)', phrase: 'Une VS', short: 'VS', kind: 'Sang', tube: NOIR, fasting: false, delay: 'le jour même', priceFc: 5000 },
  { id: 'creatinine', name: 'Créatinine et urée', phrase: 'Une créatinine', short: 'Créatinine', kind: 'Sang', tube: ROUGE, fasting: false, delay: 'le lendemain', priceFc: 8000 },
  { id: 'transaminases', name: 'Transaminases (ASAT, ALAT)', phrase: 'Un bilan du foie', short: 'Bilan du foie', kind: 'Sang', tube: ROUGE, fasting: false, delay: 'le lendemain', priceFc: 12000 },
  { id: 'lipides', name: 'Bilan lipidique', phrase: 'Un bilan lipidique', short: 'Bilan lipidique', kind: 'Sang', tube: ROUGE, fasting: true, delay: 'le lendemain', priceFc: 25000 },
  { id: 'grossesse', name: 'Test de grossesse', phrase: 'Un test de grossesse', short: 'Test de grossesse', kind: 'Urines', tube: POT, fasting: false, delay: 'en 1 heure', priceFc: 5000 },
  { id: 'ecbu', name: 'Examen des urines (ECBU)', phrase: 'Un ECBU', short: 'ECBU', kind: 'Urines', tube: POT, fasting: false, delay: 'en 48 à 72 heures', priceFc: 20000 },
  { id: 'selles', name: 'Examen des selles (KAOP)', phrase: 'Un examen des selles', short: 'Selles', kind: 'Selles', tube: POT, fasting: false, delay: 'le lendemain', priceFc: 6000 },
  { id: 'echo-grossesse', name: 'Échographie de grossesse', phrase: 'Une écho de grossesse', short: 'Écho de grossesse', kind: 'Échographie', tube: null, fasting: false, delay: 'tout de suite', priceFc: 35000 },
  { id: 'echo-pelvienne', name: 'Échographie pelvienne', phrase: 'Une écho pelvienne', short: 'Écho pelvienne', kind: 'Échographie', tube: null, fasting: false, delay: 'tout de suite', priceFc: 30000 },
  { id: 'echo-abdominale', name: 'Échographie abdominale', phrase: 'Une écho abdominale', short: 'Écho abdominale', kind: 'Échographie', tube: null, fasting: true, delay: 'tout de suite', priceFc: 35000 },
];

/** Les examens proposés dans la phrase de la page d'accueil, dans l'ordre où on les demande le plus. */
export const FEATURED_EXAMS = ['nfs', 'goutte-epaisse', 'glycemie', 'grossesse', 'echo-grossesse'] as const;

export const KIND_SUMMARY: Record<SampleKind, string> = {
  Sang: 'Une prise de sang au bras, faite sur place. Pour la glycémie et le bilan lipidique, venez à jeun.',
  Urines: 'Apportez le premier pot d’urines du matin, ou remplissez-le au centre.',
  Selles: 'Un petit pot, rempli le matin même.',
  Échographie:
    'Grossesse, pelvis ou abdomen. Vous repartez avec les images et le compte rendu. Pour l’échographie pelvienne, venez la vessie pleine.',
};

export const KINDS: readonly SampleKind[] = ['Sang', 'Urines', 'Selles', 'Échographie'];

const fc = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });

/** « 15 000 FC » avec une espace insécable fine entre les milliers. */
export function formatFc(value: number): string {
  return `${fc.format(value).replace(/\u202f/g, '\u00a0')}\u00a0FC`;
}

export function formatUsd(valueFc: number): string {
  return `${(valueFc / FC_PER_USD).toFixed(1).replace('.', ',')}\u00a0$`;
}
