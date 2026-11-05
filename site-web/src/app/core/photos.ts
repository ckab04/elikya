/**
 * Photographies du site. Aucune ne montre le centre Elikya : ce sont des images libres de droits du monde
 * du laboratoire et de Kinshasa, créditées en pied de page. À remplacer par les photos du centre
 * (voir docs/liste-de-prises-de-vue.md) dès qu'elles existent.
 *
 * Fichiers : public/images/<id>-<480|960|1600>.webp, générés depuis assets-src/ (originaux + credits.json).
 */
export interface Photo {
  readonly id: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export interface Credit {
  readonly title: string;
  readonly author: string;
  readonly licence: string;
  readonly licenceUrl: string;
  readonly page: string;
}

export const PHOTOS = {
  tube: { id: 'tube', width: 1600, height: 1200, alt: 'Tube de prélèvement à bouchon violet, rempli de sang, tenu dans une main gantée' },
  microscope: { id: 'microscope', width: 1600, height: 2398, alt: 'Microscope de laboratoire, objectifs tournés vers la platine' },
  echo: { id: 'echo', width: 1600, height: 1200, alt: 'Sonde d’échographie tenue dans une main gantée' },
  quartier: { id: 'quartier', width: 1600, height: 778, alt: 'Un quartier de Kinshasa vu d’un balcon, avec un taxi-bus jaune dans la rue' },
  prelevement: { id: 'prelevement', width: 1600, height: 2133, alt: 'Matériel de prise de sang : aiguille à ailettes, tubulure et porte-tube' },
} as const satisfies Record<string, Photo>;

export const VIDEO_AUBE = {
  src: '/images/aube.mp4',
  poster: '/images/aube-poster.webp',
  width: 640,
  height: 360,
  label: 'Un quartier de Kinshasa, du jour à la nuit, en accéléré',
};


