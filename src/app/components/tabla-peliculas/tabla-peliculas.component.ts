import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { PeliculaModel } from '../../models/pelicula.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-peliculas',
  templateUrl: './tabla-peliculas.component.html',
  styleUrls: ['./tabla-peliculas.component.css']
})
export class TablaPeliculasComponent implements OnInit {

  peliculas: PeliculaModel[] = [];
  peliculasFav: PeliculaModel[] = [];
  cargando = false;


  constructor( private peliculasService: PeliculasService ) { }

  ngOnInit() {

    this.cargando = true;
    this.peliculasService.getPeliculas()
      .subscribe( resp => {
        this.peliculas = resp;
        this.cargando = false;
      });

      
      console.log(this.peliculas)
      for (let fav of this.peliculas){
        console.log(fav);
      }

  }


  borrarPelicula( pelicula: PeliculaModel, i: number ) {
    
    console.log(pelicula);
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Está seguro que desea borrar este registro?',
      showConfirmButton: true,
      showCancelButton: true,
    }).then( resp => {

      if ( resp.value ) {
        this.peliculas.splice(i, 1);
        this.peliculasService.borrarPelicula( pelicula.id ).subscribe();
      }

    });

  



  }



alerta(pelicula: PeliculaModel){

  Swal.fire({
    showConfirmButton: false,
    text: pelicula.Descripcion,

  });


}

alerta2(pelicula: PeliculaModel){

  Swal.fire({
    showConfirmButton: false,
    imageUrl: pelicula.imagen,
  imageHeight: 500,
  });
}
}
