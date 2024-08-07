import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { noEstaLogueadoGuard } from './guards/no-esta-logueado.guard';
import { estaLogueadoGuard } from './guards/esta-logueado.guard';
import { ErrorComponent } from './paginas/error/error.component';
import { animation } from '@angular/animations';

export const routes: Routes = 
[
  {
    path:"",redirectTo:"home",pathMatch:"full"
  },
  {
    path:"home",
    loadChildren: ()=>import('./paginas/home/home.module').then(modulo => modulo.HomeModule),
    canActivate:[noEstaLogueadoGuard],
    data: { animation: 'HomePage' }

  },
  {
    path:"sesiones",
    loadChildren: ()=>import('./paginas/sesiones/sesiones.module').then(modulo => modulo.SesionesModule),
    canActivate:[noEstaLogueadoGuard],
    data: { animation: 'SesionesPage' }
  },
  {
    path:"bienvenido",
    loadChildren: ()=>import('./paginas/bienvenido/bienvenido.module').then(modulo => modulo.BienvenidoModule),
    canActivate:[estaLogueadoGuard],
    data: { animation: 'BienvenidoPage' }
  },
  {
    path:"encuesta",
    loadChildren: ()=>import('./paginas/encuesta/encuesta.module').then(modulo => modulo.EncuestaModule),
    canActivate:[estaLogueadoGuard]
  },
  {
    path:"**", component:ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
