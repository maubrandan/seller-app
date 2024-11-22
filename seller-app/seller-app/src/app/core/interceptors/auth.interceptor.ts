// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtén el token de autenticación desde el almacenamiento local o de una fuente adecuada
    const authToken = localStorage.getItem('authToken');

    // Clona la solicitud y añade el encabezado de autorización si el token existe
    let authReq = req;
    if (authToken) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
    }

    // Pasa la solicitud modificada al siguiente manejador
    return next.handle(authReq);
  }
}
