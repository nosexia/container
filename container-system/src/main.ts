import { enableProdMode } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import zh from '@angular/common/locales/zh';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { hmrBootstrap } from './hmr';
registerLocaleData(en);
registerLocaleData(zh);
if (environment.production) {
  enableProdMode();
}
const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.log(err));
if (environment.hmr) {
  if (module[ 'hot' ]) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap().catch(err => console.log(err));
}