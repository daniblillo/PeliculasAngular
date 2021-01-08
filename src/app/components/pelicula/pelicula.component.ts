import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { PeliculasService } from '../../services/peliculas.service';
import { PeliculaModel } from '../../models/pelicula.model';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent{

fav: Boolean;

pelicula: PeliculaModel = new PeliculaModel();


  constructor( private activatedRoute: ActivatedRoute,
              private _peliculasService: PeliculasService){

    this.activatedRoute.params.subscribe( params =>{
    this._peliculasService.getPelicula( params['id'] ).subscribe(res => {this.pelicula = res})
        // console.log(this.heroe);
    });
  }


 
  guardar(fav: Boolean ) {


    this.pelicula.id = this.activatedRoute.snapshot.params.id;
    console.log(this.pelicula.id);
    console.log(this.pelicula);
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',

      allowOutsideClick: false
    });
    Swal.showLoading();


    let peticion: Observable<any>;
    console.log(fav)

      peticion = this._peliculasService.actualizarPelicula( this.pelicula, fav);
     


    

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.pelicula.Director,
        text: 'Se actualizó correctamente',

      });

    });



  }

}




