import { Component, input } from '@angular/core';

/** Inner-page header: a tinted band with the page title and one sentence about it. */
@Component({
  selector: 'app-page-title',
  template: `
    <header class="band">
      <div class="container-site py-12 md:py-16">
        <h1 class="display">{{ title() }}</h1>
        <p class="mt-4 max-w-[56ch] text-lead text-muted"><ng-content /></p>
      </div>
    </header>
  `,
})
export class PageTitle {
  readonly title = input.required<string>();
}
