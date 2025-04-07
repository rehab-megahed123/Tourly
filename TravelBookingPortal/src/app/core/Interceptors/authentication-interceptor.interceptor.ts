import { HttpInterceptorFn } from '@angular/common/http';

export const authenticationInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
