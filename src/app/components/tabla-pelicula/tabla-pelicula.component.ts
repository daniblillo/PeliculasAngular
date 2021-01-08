import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PeliculaModel } from '../../models/pelicula.model';
import { PeliculasService } from '../../services/peliculas.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-pelicula',
  templateUrl: './tabla-pelicula.component.html',
  styleUrls: ['./tabla-pelicula.component.css']
})
export class TablaPeliculaComponent implements OnInit {

  pelicula: PeliculaModel = new PeliculaModel();
  imageSrc: string = "";
  


  constructor( private peliculasService: PeliculasService,
               private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.peliculasService.getPelicula( id )
        .subscribe( (resp: PeliculaModel) => {
          this.pelicula = resp;
          this.pelicula.id = id;
          this.imageSrc = this.pelicula.imagen;
        });

    }

  }



  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;

  //Evento que se gatilla cuando el input de tipo archivo cambia
  public cambioArchivo(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
  
          const reader = new FileReader();
          reader.onload = e => this.imageSrc = reader.result as string;
  
          reader.readAsDataURL(file);
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  //Sube el archivo a Cloud Storage
  public subirArchivo() {
    let archivo = this.datosFormulario.get('archivo');
    let referencia = this.peliculasService.referenciaCloudStorage(this.nombreArchivo);
    let tarea = this.peliculasService.tareaCloudStorage(this.nombreArchivo, archivo);

    //Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;
      }
    });

    referencia.getDownloadURL().subscribe((URL) => {
      this.URLPublica = URL;
      
    });
  }

  guardar( form: NgForm ) {

    if ( form.invalid && this.pelicula.imagen == "" ) {
      console.log('Formulario no válido');
      return;
    }
    console.log(form)
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',

      allowOutsideClick: false
    });
    Swal.showLoading();


    let peticion: Observable<any>;

    if ( this.pelicula.id ) {
      peticion = this.peliculasService.actualizarPeliculaTabla( this.pelicula );
      this.imageSrc = this.pelicula.imagen;
      console.log(this.pelicula.imagen)
    } else {
      peticion = this.peliculasService.crearPelicula( this.pelicula );
    }
    

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.pelicula.Titulo,
        text: 'Se actualizó correctamente',

      });

    });



  }

}
