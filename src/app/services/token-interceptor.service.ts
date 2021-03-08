import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }
  intercept(req, next){
  let tokenizeReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${this.authService.getToken()}`
    }
  });
  return next.handle(tokenizeReq);
}

}