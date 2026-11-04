import { Component } from '@angular/core';
import { PartnersClose } from '../../shared/partners-close';
import { Hero } from './hero';
import { ServicesOverview } from './services-overview';
import { Steps } from './steps';
import { Why } from './why';

/**
 * A short welcome page; the details live on their own pages (Examens, Tarifs, Le centre, Contact),
 * reached from the navigation bar.
 */
@Component({
  selector: 'app-home',
  imports: [Hero, ServicesOverview, Why, Steps, PartnersClose],
  template: `
    <app-hero />
    <app-services-overview />
    <app-why />
    <app-steps />
    <app-partners-close />
  `,
})
export class Home {}
