import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeliculaModel } from '../models/Pelicula.model';
import { map, delay } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private eventAuthError = new BehaviorSubject<string>("");
  idUser: String;
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;
  peliculas: PeliculaModel;
  peliculasFav: Observable<PeliculaModel[]>;
  private pelisFavCollection: AngularFirestoreCollection<PeliculaModel>;
  
  url = 'http://localhost:4000/api/photos';
  fav: Boolean;
  
  constructor(
    private afAuth: AngularFireAuth,
    private  db: AngularFirestore,
    private router: Router,
    private http: HttpClient, 
    private storage: AngularFireStorage) {

    }
    
    ngOnInit(){
      console.log(this.idUser)
    }

    //Subir un archivo
    tareaCloudStorage(nombreArchivo: string, datos: any) {
      return this.storage.upload(nombreArchivo, datos);
    }
    
    //referencia
    referenciaCloudStorage(nombreArchivo: string) {
      return this.storage.ref(nombreArchivo);
    }

  //Usuario//
  getUserState(){
    return this.afAuth.authState;
  }

  login(email: string, password: string){
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .catch(error => {
      this.eventAuthError.next(error)
    })
    .then(userCredential => {
      if(userCredential){
        this.router.navigate(['/peliculasTabla'])
        this.idUser = userCredential.user.uid;
      }
        })
    }

  createUser(user) {
    console.log(user);
    this.afAuth.auth.createUserWithEmailAndPassword( user.email, user.password)
      .then( userCredential => {
        this.newUser = user;
        console.log(userCredential);
        userCredential.user.updateProfile( {
          displayName: user.email
        });
        
        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['/peliculasTabla']);
          });
        })
        
        .catch( error => {
          this.eventAuthError.next(error);
        });
      }
      
  insertUserData(userCredential: firebase.auth.UserCredential){
    this.idUser = userCredential.user.uid;
    
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email:   this.newUser.email,
      peliculasfav: [],
      role: 'usuario'
    })
  };
  
  logout() {
    console.log(this.idUser);
    return this.afAuth.auth.signOut();
  }
  
  //Películas//
  crearPelicula( pelicula: PeliculaModel ) {
    pelicula.imagen =(<HTMLInputElement>document.getElementById("text_id")).value;
    
    return this.http.post(`${ this.url }/peliculas.json`, pelicula)
    .pipe(
      map( (resp: any) => {
        pelicula.id = resp.name;
        pelicula.imagen = (<HTMLInputElement>document.getElementById("text_id")).value;
        return pelicula;
      })
      );
    }

  actualizarPeliculaTabla( pelicula: PeliculaModel ) {
    pelicula.imagen =(<HTMLInputElement>document.getElementById("text_id")).value;
    const peliTemp = {
      ...pelicula
    };
    delete peliTemp.id;

    return this.http.put(`${ this.url }/peliculas/${ pelicula.id }.json`, peliTemp);
  }

  actualizarPelicula( pelicula: PeliculaModel, fav: Boolean) {
     
    pelicula.fav = fav;
    const peliTemp = {
      ...pelicula
    };

    delete peliTemp.id;
    return this.http.put(`${ this.url }/peliculas/${ pelicula.id }.json`, peliTemp);
  }

  borrarPelicula( id: string ) {
    return this.http.delete(`${ this.url }/peliculas/${ id }.json`);
    console.log(this.idUser);
  }
  
  getPelicula( id: string ) {
    return this.http.get(`${ this.url }/peliculas/${ id }.json`);
  }

  getPelicula2( id: string ) {
    return this.http.get(`${ this.url }/peliculas/${ id }.json`).pipe(map( this.Arreglo ),delay(0));
  }


  getPeliculas() {
    return this.http.get(`${ this.url }/peliculas.json`).pipe(map( this.Arreglo ),delay(0));
    console.log(this.idUser);
  }

  buscarPeliculas( termino: string):PeliculaModel[]{

    const peliArr: PeliculaModel[] = [];
    termino = termino.toLowerCase();

    for( let i = 0; i < this.getPeliculas.length; i ++ ){

      let heroe = this.getPeliculas[i];

      let nombre = heroe.nombre.toLowerCase();
      let director = heroe.director.toLowerCase();
      let sinopsis = heroe.sinopsis.toLowerCase();
      let clasificacion = heroe.clasificacion.toLowerCase();

      if( nombre.indexOf( termino ) >= 0 || director.indexOf(termino) >= 0 || sinopsis.indexOf( termino ) >= 0 || clasificacion.indexOf( termino ) >= 0 ){
        heroe.idx = i;
        peliArr.push( heroe )
      }
      
    } return peliArr;
  }

  buscarPeliculas2(pelicula: PeliculaModel){
    
  }

  private Arreglo( peliculasObj: object ) {

    const peliculas: PeliculaModel[] = [];

    Object.keys( peliculasObj ).forEach( key => {

      const pelicula: PeliculaModel = peliculasObj[key];
      pelicula.id = key;

      peliculas.push( pelicula );
    });
    return peliculas;
  }
}