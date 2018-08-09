/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NotLoginHttpInterceptor } from './not-login-http-interceptor';

/** Http interceptor providers in outside-in order */
const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: NotLoginHttpInterceptor, multi: true },
];
export default httpInterceptorProviders;