import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth=inject(AuthService);
  const token=auth.getToken();

  const authRequest=token?req.clone({setHeaders:{Authorization:`Bearer ${token}`}}):req;
  return next(authRequest);
};
