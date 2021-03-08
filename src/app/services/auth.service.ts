import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:4000/api'
  constructor(private http: HttpClient, private router: Router) { }

  signUpUser(user){
    return this.http.post<any>(this.url + '/register', user);
  }

  signInUser(user){
    return this.http.post<any>(this.url + '/login', user);
  }

  loggedIn(): Boolean {
    return !!localStorage.getItem('token');

  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin'])
  }
}