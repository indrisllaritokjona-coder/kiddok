import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import itLocale from '@angular/common/locales/it';

import { routes } from './app.routes';

// Register Italian locale — same DD/MM/YYYY and Monday-first week as Albania
registerLocaleData(itLocale);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'it' },
  ]
};
