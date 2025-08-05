import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import {App} from './app/app';
import {appConfig} from './app/app.config';

bootstrapApplication(App, {
  providers: [
    provideProtractorTestingSupport(),
    ...appConfig.providers
  ]
}).catch((err) =>
  console.error(err),
);
