import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnosComponent } from './turnos.component';
import { esAdminGuard } from 'src/app/guards/es-admin.guard';
import { noEsEspecialistaGuard } from 'src/app/guards/no-es-especialista.guard';

const routes: Routes = 
[
  {
    path:"",
    component:TurnosComponent,
    children:
    [
      {
        path:"ver-turnos",
        loadChildren: ()=>import('../ver-turnos/ver-turnos.module').then(modulo => modulo.VerTurnosModule),
        canActivate:[esAdminGuard]
      }
      ,
      {
        path:"mis-turnos",
        loadChildren: ()=>import('../mis-turnos/mis-turnos.module').then(modulo => modulo.MisTurnosModule)
      }
      ,
      {
        path:"solicitar-turno",
        loadChildren: ()=>import('../solicitar-turno/solicitar-turno.module').then(modulo => modulo.SolicitarTurnoModule),
        canActivate:[noEsEspecialistaGuard]
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
