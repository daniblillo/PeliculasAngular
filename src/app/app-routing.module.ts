import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { TablaPeliculasComponent } from '../app/components/tabla-peliculas/tabla-peliculas.component';
import { TablaPeliculaComponent } from '../app/components/tabla-pelicula/tabla-pelicula.component';
import { PeliculasComponent } from '../app/components/peliculas/peliculas.component';
import { PeliculaTarjetaComponent } from '../app/components/pelicula-tarjeta/pelicula-tarjeta.component';
import { PeliculaComponent } from '../app/components/pelicula/pelicula.component'
import { from } from 'rxjs';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
const routes: Routes = [
  { path: 'peliculasTabla', component: TablaPeliculasComponent },
  { path: 'peliculaTabla/:id', component: TablaPeliculaComponent },
  { path: 'peliculas', component: PeliculasComponent },
  { path: 'pelicula/:id', component: PeliculaComponent },
  { path: 'peliculaTarjeta', component: PeliculaTarjetaComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegistrationComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
