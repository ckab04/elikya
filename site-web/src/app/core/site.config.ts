/**
 * Informations institutionnelles du centre : point unique de modification.
 *
 * TODO(contenu) avant la mise en ligne : adresse, repère, téléphone, WhatsApp, e-mail et réseaux sociaux
 * sont des valeurs provisoires (marquées « à confirmer »).
 */
export interface OpeningHours {
  readonly days: string;
  readonly hours: string;
  /** Jours de la semaine (0 = dimanche) et heures d'ouverture, pour « ouvert maintenant ». */
  readonly weekdays: readonly number[];
  readonly open: number | null;
  readonly close: number | null;
}

export interface SocialLink {
  readonly label: string;
  readonly url: string;
}

export const SITE = {
  name: 'Centre de santé Elikya',
  shortName: 'Elikya',
  openingYear: 2027,
  description:
    'Laboratoire d’analyses et cabinet d’échographie à Bumbu, Kinshasa. Résultat le jour même pour les examens courants, validé par un biologiste.',

  address: {
    street: 'Avenue à confirmer',
    // À Kinshasa, on trouve une adresse par son repère.
    landmark: 'Réf. : à confirmer',
    district: 'Bumbu, district de la Funa',
    city: 'Kinshasa',
  },

  // Format international, sans espaces, pour les liens tel: et WhatsApp.
  phone: '+243000000000', // à confirmer
  phoneDisplay: '+243 00 000 0000', // à confirmer
  whatsapp: '243000000000', // à confirmer (sans « + »)
  email: 'contact@elikya.example', // à confirmer

  openingHours: [
    { days: 'Lundi à vendredi', hours: '7 h – 18 h', weekdays: [1, 2, 3, 4, 5], open: 7, close: 18 },
    { days: 'Samedi', hours: '8 h – 14 h', weekdays: [6], open: 8, close: 14 },
    { days: 'Dimanche et jours fériés', hours: 'fermé', weekdays: [0], open: null, close: null },
  ] satisfies readonly OpeningHours[],

  // TODO(contenu) : ajouter les comptes réels (Facebook, Instagram, TikTok, YouTube) une fois créés.
  social: [] as readonly SocialLink[],
} as const;
