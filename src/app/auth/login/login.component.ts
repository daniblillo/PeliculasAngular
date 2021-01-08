import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
authError: any;
user: firebase.User;
  constructor(private auth: PeliculasService) { }

  ngOnInit() {
    this.auth.eventAuthError$.subscribe(data =>{
      this.authError = data;
    });

  }

  login(frm){
      this.auth.login(frm.value.email, frm.value.password);
  
  }

}
