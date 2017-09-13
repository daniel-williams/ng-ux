import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core'

import { AppModule } from './app';

if (process.env.ENV === 'production') {
  enableProdMode();
}

const bootstrapPromise =  platformBrowserDynamic().bootstrapModule(AppModule);

bootstrapPromise
  .then(success => console.log(`App mode: ${process.env.ENV}`))
  .catch(err => console.error(`Bootstrap failed: ${err}`));