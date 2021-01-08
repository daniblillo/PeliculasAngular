import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pelicula-tarjeta',
  templateUrl: './pelicula-tarjeta.component.html',
  styleUrls: ['./pelicula-tarjeta.component.css']
})
export class PeliculaTarjetaComponent implements OnInit {

  @Input() pelicula: any = {};
  @Input() index: number;

  @Output() peliculaSeleccionada: EventEmitter<number>;

  constructor(private router: Router) {
    this.peliculaSeleccionada = new EventEmitter();
  }

  ngOnInit() {
  }

  verPelicula() {
    // console.log(  this.index );
    this.router.navigate( ['/pelicula', this.pelicula.id] );
    // this.heroeSeleccionado.emit( this.index );
  }

}