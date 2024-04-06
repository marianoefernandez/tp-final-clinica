import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { esAdminGuard } from 'src/app/guards/es-admin.guard';

const routes: Routes = 
[
  {
    path:'',
    component:NavbarComponent,
    children:
    [
      {
        path:"",redirectTo:"mi-perfil",pathMatch:"full"
      },
      {
        path:"turnos",
        loadChildren: ()=>import('../turnos/turnos.module').then(modulo => modulo.TurnosModule)
      }
      ,
      {
        path:"mi-perfil",
        loadChildren: ()=>import('../mi-perfil/mi-perfil.module').then(modulo => modulo.MiPerfilModule)
      }
      ,
      {
        path:"usuarios",
        loadChildren: ()=>import('../usuarios/usuarios.module').then(modulo => modulo.UsuariosModule),
        canActivate:[esAdminGuard]
      }
      ,
      {
        path:"pacientes",
        loadChildren: ()=>import('../pacientes/pacientes.module').then(modulo => modulo.PacientesModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienvenidoRoutingModule { }
