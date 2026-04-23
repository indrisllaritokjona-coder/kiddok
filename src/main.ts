import { provideZoneChangeDetection } from "@angular/core";
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideZoneChangeDetection(),
    ...appConfig.providers,
  ],
})
  .then(appRef => {
    // Expose injector globally so lazy service lookups can resolve circular deps
    (window as any).__angularInjector__ = appRef.injector;
  })
  .catch((err) => console.error(err));