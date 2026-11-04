import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('crée l’application', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('affiche la navigation principale et le lien d’évitement', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.skip-link')?.getAttribute('href')).toBe('#contenu');
    const links = Array.from(el.querySelectorAll('#main-nav a')).map((a) => a.textContent?.trim());
    expect(links).toContain('Examens');
    expect(links).toContain('Contact');
  });
});
