import { Component, OnInit } from '@angular/core';
import { PeliculaModel } from '../../models/pelicula.model';
import { PeliculasService } from '../../services/peliculas.service';
import { from } from 'rxjs';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  pelicula: PeliculaModel = new PeliculaModel();
  termino:string;

  constructor(private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService) { 

      this.activatedRoute.params.subscribe( params =>{
       // this.peliculasService.buscarPeliculas( params['termino'] ).subscribe(res => {this.pelicula = res})
            // console.log(this.heroe);
        });
    }

  ngOnInit() {

    this.activatedRoute.params.subscribe( params =>{
      this.termino =params['termino'];
      //this.pelicula = this.peliculasService.buscarPeliculas( params['termino'] );
      console.log( this.pelicula );
    });
  }

}
