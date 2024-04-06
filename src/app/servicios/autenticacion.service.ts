import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, map, retry } from 'rxjs';
import { Firestore, collection, addDoc, onSnapshot } from '@angular/fire/firestore';

import  firebase  from 'firebase/compat/app';
import { FirestoreService } from './firestore.service';
import { Usuario } from '../usuario';
import { DniDuplicadoError } from '../DniDuplicadoException';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private autenticador: AngularFireAuth, private firestore: FirestoreService) { }

  public usuarioActual:any|null =null;

  async registro(usuarioIngresado:Usuario,contraseña:string)
  {
    try
    {
      let retorno = await this.firestore.verificarDNI(usuarioIngresado.dni);

      if(retorno)
      {
        throw new DniDuplicadoError("dni-duplicado")
      }

      const usuario = await this.autenticador.createUserWithEmailAndPassword(usuarioIngresado.email,contraseña);
      usuario.user?.sendEmailVerification();
      const usuarioInfo = await this.obtenerInfoUsuario(usuario,usuarioIngresado);
      this.firestore.agregarInformacionUsuario(usuarioInfo);

      return false;
    }
    catch(error:any)
    {      
      return error.code;
    }
  }

  public async obtenerInfoUsuario(usuario:any,usuarioIngresado:Usuario)
  {
    switch(usuarioIngresado.tipo)
    {
      case "Administrador":
        const admin = 
        {
          uid: usuario.user?.uid,
          email: usuario.user?.email,
          fechaRegistro: new Date().toLocaleString(),
          nombre:usuarioIngresado.nombre,
          apellido:usuarioIngresado.apellido,
          dni:usuarioIngresado.dni,
          tipoUsuario:usuarioIngresado.tipo,
          edad:usuarioIngresado.edad,
          imagenUno : await this.firestore.agregarImagenUsuario("1",usuarioIngresado)
        };
        return admin;

      case "Paciente":
        const paciente = 
        {
          uid: usuario.user?.uid,
          email: usuario.user?.email,
          fechaRegistro: new Date().toLocaleString(),
          nombre:usuarioIngresado.nombre,
          apellido:usuarioIngresado.apellido,
          dni:usuarioIngresado.dni,
          tipoUsuario:usuarioIngresado.tipo,
          edad:usuarioIngresado.edad,
          obraSocial:usuarioIngresado.obraSocial,
          imagenUno : await this.firestore.agregarImagenUsuario("1",usuarioIngresado),
          imagenDos : await this.firestore.agregarImagenUsuario("2",usuarioIngresado)
        };
        return paciente;      
      
      default:
        const especialista = 
        {
          uid: usuario.user?.uid,
          email: usuario.user?.email,
          fechaRegistro: new Date().toLocaleString(),
          nombre:usuarioIngresado.nombre,
          apellido:usuarioIngresado.apellido,
          dni:usuarioIngresado.dni,
          tipoUsuario:usuarioIngresado.tipo,
          edad:usuarioIngresado.edad,
          especialidad:usuarioIngresado.especialidad,
          estaActivo:usuarioIngresado.estaActiva,
          imagenUno : await this.firestore.agregarImagenUsuario("1",usuarioIngresado)
        };
        return especialista;
    }
  }

  async login(email:string,contraseña:string)
  {
    try
    {
      return await this.autenticador.signInWithEmailAndPassword(email,contraseña);
    }
    catch(error:any)
    {
      return error.code;
    }
  }

  async loginConGoogle(email:string,contraseña:string)
  {
    try
    {
      return await this.autenticador.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    catch(error)
    {
      console.log("Error en google con google", error);
      return false;
    }
  }

  obtenerUsuarioLogueado()
  {
    return this.autenticador.authState;
  }

  cerrarSesion()
  {
    return this.autenticador.signOut();
  }

  reeviarEmail()
  {
    if(this.usuarioActual != null)
    {
      this.usuarioActual?.sendEmailVerification();
    }
  }

}
