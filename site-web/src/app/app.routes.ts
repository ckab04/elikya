import { inject } from '@angular/core';
import { ResolveFn, Routes } from '@angular/router';
import { I18n, Lang } from './core/i18n';

const suffix = ' | Centre de santé Elikya';
const notFound = () => import('./pages/not-found').then((m) => m.NotFound);

/** Sets the page language before the page renders (also during prerendering). */
const setLang =
  (lang: Lang): ResolveFn<Lang> =>
  () => {
    inject(I18n).set(lang);
    return lang;
  };

/** The same pages for each language; titles and descriptions are French and translated by I18nTitleStrategy / Seo. */
const pages: Routes = [
  {
    path: '',
    title: 'Centre de santé Elikya – Analyses médicales et échographie à Bumbu',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'services',
    title: 'Les examens' + suffix,
    data: {
      description:
        'Prise de sang, urines, selles et échographie à Bumbu, Kinshasa : pour chaque examen, le tube, s’il faut venir à jeun et quand le résultat est prêt.',
    },
    loadComponent: () => import('./pages/services').then((m) => m.Services),
  },
  {
    path: 'tarifs',
    title: 'Tarifs' + suffix,
    data: { description: 'Le prix de chaque examen en francs congolais, avec l’équivalent en dollars et le délai du résultat.' },
    loadComponent: () => import('./pages/tarifs').then((m) => m.Tarifs),
  },
  {
    path: 'le-centre',
    title: 'Le centre' + suffix,
    data: { description: 'Elikya veut dire espoir en lingala : un laboratoire et un cabinet d’échographie de quartier à Bumbu.' },
    loadComponent: () => import('./pages/le-centre').then((m) => m.LeCentre),
  },
  {
    path: 'partenaires',
    title: 'Partenaires' + suffix,
    data: { description: 'Médecins, hôpitaux, centres de santé et donateurs : travailler avec le Centre de santé Elikya.' },
    loadComponent: () => import('./pages/partenaires').then((m) => m.Partenaires),
  },
  {
    path: 'contact',
    title: 'Contact' + suffix,
    data: { description: 'Adresse, repère, horaires, téléphone et WhatsApp du Centre de santé Elikya à Bumbu.' },
    loadComponent: () => import('./pages/contact').then((m) => m.Contact),
  },
  // Prerendered once and copied to /404.html by scripts/postbuild.mjs.
  { path: 'introuvable', title: 'Page introuvable' + suffix, loadComponent: notFound },
  { path: '**', title: 'Page introuvable' + suffix, loadComponent: notFound },
];

export const routes: Routes = [
  { path: 'ln', resolve: { lang: setLang('ln') }, children: pages },
  { path: '', resolve: { lang: setLang('fr') }, children: pages },
];
