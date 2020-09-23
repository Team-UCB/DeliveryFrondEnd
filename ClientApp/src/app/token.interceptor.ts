import { Inject, Injectable, Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import { UsuarioService } from './servicios/usuario.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(req, next){
    let authService = this.injector.get(UsuarioService);
    let tokenizedReq = req.clone({
      setHeaders:{
      Authorization: `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
