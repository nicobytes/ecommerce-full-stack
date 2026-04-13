import { provideZonelessChangeDetection } from '@angular/core';
import {
  bootstrapApplication,
  BootstrapContext,
} from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(
    App,
    {
      ...config,
      providers: [provideZonelessChangeDetection(), ...config.providers],
    },
    context,
  );

export default bootstrap;
