import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where,getDocs, onSnapshot, updateDoc, doc} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { Usuario } from '../usuario';
import { AngularFireStorage, createUploadTask } from "@angular/fire/compat/storage"

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  constructor(private firestore: Firestore,private firestorage:AngularFireStorage) { }

  private usuarios = collection(this.firestore,"usuarios");
  public datosUsuarioActual : any;

  agregarInformacionUsuario(usuario:any)
  {
    try
    {
      return addDoc(this.usuarios,usuario);
    }
    catch(error:any)
    {
      console.log(error.code);
      return null;
    }
  }

  async verificarDNI(dni:number)
  {
    let retorno = false;
    const consulta = query(this.usuarios, where("dni", "==", dni));
    const consultaEjecuto = await getDocs(consulta);
    consultaEjecuto.forEach((datos) => 
    {
      retorno = true;
    });   

    return retorno;
  }

  async obtenerInfoUsuario(uid:string)
  {
    try
    {
      const consulta = query(this.usuarios, where("uid", "==", uid));
      const consultaEjecuto = await getDocs(consulta);
      let datos = false;
      consultaEjecuto.forEach((datos) => 
      {
        // doc.data() is never undefined for query doc snapshots
        this.datosUsuarioActual = datos.data();
        return true;
      });   
      return false;
     }
    catch(error:any)
    {
      console.log(error.code);
      return null;
    }
  }

  async actualizarEstadoEspecialista(uid:string,dato:any)
  {
    try
    {
      const consulta = query(this.usuarios, where("uid", "==", uid));
      const consultaEjecuto = await getDocs(consulta);
      consultaEjecuto.forEach(async (datos) => 
      {
        // doc.data() is never undefined for query doc snapshots
        const id = datos.id;
        await updateDoc(doc(this.firestore,"usuarios",id),
        {
          estaActivo:dato
        })
      });   
      return true;
     }
    catch(error:any)
    {
      console.log(error.code);
      return null;
    }
  }

  async agregarImagenUsuario(numeroImagen:string,usuario:Usuario)
  {
    const imagen = (numeroImagen == "1" ? usuario.imagenPerfilUno : usuario.imagenPerfilDos);
    const path = `imagenes-usuarios/foto-perfil-${numeroImagen}-${usuario.dni}`;
    const subidaImagen = await this.firestorage.upload(path,imagen);
    const url = subidaImagen.ref.getDownloadURL();
    return url;
  }

  obtenerUsuarios(): Observable<any[]> 
  {
    return new Observable<any[]>((observable) => {
      onSnapshot(this.usuarios, (snap) => {
        const repartidores: any[] = [];
        snap.docChanges().forEach(x => {
          const rep = x.doc.data() as any;
          repartidores.push(rep);
        });
        observable.next(repartidores);
      });
    });
  }
}