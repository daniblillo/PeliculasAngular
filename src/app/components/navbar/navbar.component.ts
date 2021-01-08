import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
user: firebase.User;
  constructor( private router:Router, private auth: PeliculasService, private holahd: PeliculasService ) { }

  ngOnInit() {
    this.auth.getUserState().subscribe(user => {
      this.user = user;
    })
    console.log(this.user)
  }

  buscarHeroe( termino:string ){
    this.router.navigate( ['/buscar',termino] );
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login'] );
  }
  hola(){
    console.log(this.user.uid)
  }
}
