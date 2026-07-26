import {
  ApplicationConfig,
  provideZonelessChangeDetection,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHashbrown } from '@hashbrownai/angular';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { API_URL } from '@store/data-access';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
    ),
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideZonelessChangeDetection(),
    { provide: API_URL, useValue: environment.apiUrl },
    provideHashbrown({
      baseUrl: environment.chatApiUrl,
    }),
  ],
};
