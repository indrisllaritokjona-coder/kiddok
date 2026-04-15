import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Në një projekt real tokenin zakonisht e marrim nga LocalStorage ose nga një AuthService
  const token = localStorage.getItem('kiddok_access_token');

  // Nëse nuk po bëjmë fjalë për Login/Register dhe kemi një token të vlefshëm
  if (token && !req.url.includes('/auth/')) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  // Përndryshe lejo kërkesën origjinale të kalojë
  return next(req);
};
