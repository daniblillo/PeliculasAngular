import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '..//../services/peliculas.service';
import { PeliculaModel } from '../../models/pelicula.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  peliculas:PeliculaModel[] = [];


  constructor( private _peliculasService:PeliculasService,
               private router:Router
                ) {
    
  }

  ngOnInit() {
    this._peliculasService.getPeliculas().subscribe(res => {this.peliculas = res});
    console.log(this.peliculas);
  }





  verPelicula( hola: PeliculaModel ){
    this.router.navigate( ['/pelicula', hola] );
  }

}