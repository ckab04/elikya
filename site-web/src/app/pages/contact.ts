import { NgOptimizedImage } from '@angular/common';
import { Component, DOCUMENT, inject, signal } from '@angular/core';
import { TrPipe } from '../core/i18n';
import { ActivatedRoute } from '@angular/router';
import { form, FormField, FormRoot, maxLength, minLength, required } from '@angular/forms/signals';
import { PHOTOS } from '../core/photos';
import { SITE } from '../core/site.config';
import { Icon } from '../shared/icon';
import { PageTitle } from '../shared/page-title';
import { Reveal } from '../shared/reveal';

type Subject = 'information' | 'rendez-vous' | 'partenariat' | 'autre';
type Channel = 'whatsapp' | 'email';

interface ContactModel {
  name: string;
  phone: string;
  subject: Subject;
  message: string;
  channel: Channel;
}

const SUBJECT_LABELS: Record<Subject, string> = {
  information: 'Une question sur un examen',
  'rendez-vous': 'Un rendez-vous d’échographie',
  partenariat: 'Un partenariat',
  autre: 'Autre chose',
};

// Object.hasOwn: « toString » and other inherited keys are not subjects.
const isSubject = (v: string | null): v is Subject => v !== null && Object.hasOwn(SUBJECT_LABELS, v);

/**
 * Contact. The site has no server: the form writes the message and hands it to WhatsApp or the
 * visitor's mail app. Nothing is stored by the site.
 */
@Component({
  selector: 'app-contact',
  imports: [NgOptimizedImage, FormField, FormRoot, PageTitle, Reveal, Icon, TrPipe],
  templateUrl: './contact.html',
  styles: `
    .field label,
    .field legend {
      display: block;
      margin-bottom: 0.4rem;
      font-weight: 500;
    }
    /* Real form fields keep a line: a 2px underline in the muted ink (4.9:1 on the ground). */
    .input {
      width: 100%;
      padding: 0.65rem 0;
      background: transparent;
      border: 0;
      border-bottom: 2px solid var(--color-muted);
      border-radius: 0;
      color: var(--color-ink);
      font: inherit;
      transition: border-color var(--t-hover) ease;
    }
    .input:focus-visible {
      outline: none;
      border-bottom-color: var(--color-accent);
      border-bottom-width: 4px;
      padding-bottom: calc(0.65rem - 2px);
    }
    .input[aria-invalid='true'] {
      border-bottom-color: var(--color-accent);
    }
    select.input option {
      color: #1b1b1b;
    }
    textarea.input {
      resize: vertical;
    }
    .radio {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      min-height: 2.75rem;
      margin-right: 1.75rem;
    }
    .radio input {
      width: 1.15rem;
      height: 1.15rem;
      accent-color: var(--color-accent);
    }
    .error {
      min-height: 1.5rem;
      margin: 0.35rem 0 0;
      color: var(--color-accent);
      font-size: var(--text-small);
      font-weight: 500;
    }
  `,
})
export class Contact {
  protected readonly site = SITE;
  protected readonly photos = PHOTOS;
  protected readonly subjects = Object.entries(SUBJECT_LABELS) as [Subject, string][];
  protected readonly sent = signal(false);

  private readonly window = inject(DOCUMENT).defaultView;
  private readonly initialSubject = inject(ActivatedRoute).snapshot.queryParamMap.get('objet');

  private readonly model = signal<ContactModel>({
    name: '',
    phone: '',
    subject: isSubject(this.initialSubject) ? this.initialSubject : 'information',
    message: '',
    channel: 'whatsapp',
  });

  protected readonly contactForm = form(
    this.model,
    (p) => {
      required(p.name, { message: 'Indiquez votre nom.' });
      maxLength(p.name, 80, { message: 'Le nom ne doit pas dépasser 80 caractères.' });
      required(p.message, { message: 'Écrivez votre message.' });
      minLength(p.message, 10, { message: 'Le message doit contenir au moins 10 caractères.' });
      maxLength(p.message, 1000, { message: 'Le message ne doit pas dépasser 1 000 caractères.' });
    },
    {
      submission: {
        action: async () => {
          this.openChannel(this.model());
          this.sent.set(true);
          return undefined;
        },
        // Take the visitor to the first field that needs fixing.
        onInvalid: (f) => {
          const first = [f.name, f.message].find((field) => field().invalid());
          first?.().focusBoundControl();
        },
      },
    },
  );

  private openChannel(m: ContactModel): void {
    const subject = `${SUBJECT_LABELS[m.subject]} – ${m.name}`;
    const body = [m.message, '', `${m.name}${m.phone ? ` – ${m.phone}` : ''}`].join('\n');
    const url =
      m.channel === 'whatsapp'
        ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`
        : `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // A navigation, not a pop-up: it is never blocked, and on a phone wa.me opens the WhatsApp app.
    if (this.window) this.window.location.href = url;
  }
}
