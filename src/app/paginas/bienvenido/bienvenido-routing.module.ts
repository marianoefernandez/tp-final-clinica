import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { esAdminGuard } from 'src/app/guards/es-admin.guard';
import { esEspecialistaGuard } from 'src/app/guards/es-especialista.guard';

const routes: Routes = 
[
  {
    path:'',
    component:NavbarComponent,
    children:
    [
      {
        path:"",
        loadChildren: ()=>import('../inicio/inicio.module').then(modulo => modulo.InicioModule)
      },
      {
        path:"turnos",
        loadChildren: ()=>import('../turnos/turnos.module').then(modulo => modulo.TurnosModule),
        data: { animation: 'TurnosPage' }
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
        loadChildren: ()=>import('../pacientes/pacientes.module').then(modulo => modulo.PacientesModule),
        canActivate:[esEspecialistaGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienvenidoRoutingModule { }
