import { HttpInterceptorFn } from '@angular/common/http';

export const loadingSpinnerInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
