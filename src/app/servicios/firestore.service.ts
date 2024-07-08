import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where,getDocs, onSnapshot, updateDoc, doc} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { Usuario } from '../interfaces/Usuario';
import { AngularFireStorage, createUploadTask } from "@angular/fire/compat/storage"
import { Turno } from '../interfaces/Turnos';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  constructor(private firestore: Firestore,private firestorage:AngularFireStorage) { }

  private usuarios = collection(this.firestore,"usuarios");
  private horarios = collection(this.firestore,"horarios");
  private turnos = collection(this.firestore,"turnos");
  private idAutoIncremental = collection(this.firestore,"idAutoIncremental");
  private logs = collection(this.firestore,"logs");

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

  agregarInformacionLogs(log:any)
  {
    try
    {
      return addDoc(this.logs,log);
    }
    catch(error:any)
    {
      console.log(error.code);
      return null;
    }
  }

  agregarHorarios(horario:any)
  {
    try
    {
      return addDoc(this.horarios,horario);
    }
    catch(error:any)
    {
      console.log(error.code);
      return null;
    }
  }

  async incrementarId(campo:string)
  {
    try
    {
      const consulta = query(this.idAutoIncremental, where(campo,">=",0));
      const consultaEjecuto = await getDocs(consulta);
      consultaEjecuto.forEach(async (datos) => 
      {
        // doc.data() is never undefined for query doc snapshots
        const id = datos.id;
        const nuevoId = datos.data();
        nuevoId[campo] = nuevoId[campo] + 1;

        await updateDoc(doc(this.firestore,"idAutoIncremental",id),nuevoId);
      });   
      return true;
     }
    catch(error:any)
    {
      console.log(error.code);
      return null;
    }
  }

  async obtenerId(campo:string)
  {
    try
    {
      const consulta = query(this.idAutoIncremental, where(campo,">=",0));
      const consultaEjecuto = await getDocs(consulta);
      let id:any = null;
      consultaEjecuto.forEach((datos) => 
      {
        // doc.data() is never undefined for query doc snapshots
        id = datos.data()[campo];
      });   
      return id;
     }
    catch(error:any)
    {
      console.log(error.code);
      return null;
    }
  }

  async agregarTurno(turno:any)
  {
    try
    {
      await this.incrementarId('idTurnos');
      return addDoc(this.turnos,turno);
    }
    catch(error:any)
    {
      console.log(error.code);
      return null;
    }
  }

  

  async editarHorarios(uid:string,dato:any)
  {
    try
    {
      const consulta = query(this.horarios, where("uid", "==", uid));
      const consultaEjecuto = await getDocs(consulta);
      consultaEjecuto.forEach(async (datos) => 
      {
        // doc.data() is never undefined for query doc snapshots
        const id = datos.id;
        await updateDoc(doc(this.firestore,"horarios",id),
        {
          diasHorarios:dato
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

  async obtenerHorarioUsuario(uid:string)
  {
    try
    {
      const consulta = query(this.horarios, where("uid", "==", uid));
      const consultaEjecuto = await getDocs(consulta);
      let horarios:any = null;
      consultaEjecuto.forEach((datos) => 
      {
        // doc.data() is never undefined for query doc snapshots
        horarios = datos.data();
      });   
      return horarios;
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

  async obtenerUsuariosEspecificos(clave:string,valor:string)
  {
    try
    {
      const consulta = query(this.usuarios, where(clave, "==", valor));
      const consultaEjecuto = await getDocs(consulta);
      let datosInfo : any = [];
      consultaEjecuto.forEach((datos) => 
      {
        // doc.data() is never undefined for query doc snapshots
        datosInfo.push(datos.data());
      });   

      if(datosInfo.length == 0)
      {
        return null;
      }

      return datosInfo;
     }
    catch(error:any)
    {
      console.log(error.code);
      return null;
    }
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

  async actualizarInfoUsuario(uid:string,dato:any)
  {
    try
    {
      const consulta = query(this.usuarios, where("uid", "==", uid));
      const consultaEjecuto = await getDocs(consulta);
      consultaEjecuto.forEach(async (datos) => 
      {
        // doc.data() is never undefined for query doc snapshots
        const id = datos.id;
        await updateDoc(doc(this.firestore,"usuarios",id),dato)
      });   
      return true;
     }
    catch(error:any)
    {
      console.log(error.code);
      return null;
    }
  }

  async actualizarTurno(idTurno:number,dato:any)
  {
    try
    {
      const consulta = query(this.turnos, where("idTurno", "==", idTurno));
      const consultaEjecuto = await getDocs(consulta);
      consultaEjecuto.forEach(async (datos) => 
      {
        // doc.data() is never undefined for query doc snapshots
        const id = datos.id;
        await updateDoc(doc(this.firestore,"turnos",id),dato)
      });   
      return true;
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

  async editarTurnos(idTurno:number,dato:any)
  {
    try
    {
      const consulta = query(this.turnos, where("idTurno", "==", idTurno));
      const consultaEjecuto = await getDocs(consulta);
      consultaEjecuto.forEach(async (datos) => 
      {
        // doc.data() is never undefined for query doc snapshots
        const id = datos.id;
        await updateDoc(doc(this.firestore,"turnos",id),dato)
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
        const usuarios: any[] = [];
        snap.docChanges().forEach(x => {
          const user = x.doc.data() as any;
          usuarios.push(user);
        });
        observable.next(usuarios);
      });
    });
  }

  obtenerUsuariosPorTipo(tipo:string): Observable<any[]> 
  {
    return new Observable<any[]>((observable) => {
      onSnapshot(this.usuarios, (snap) => {
        const usuarios: any[] = [];
        snap.docChanges().forEach(x => {
          const user = x.doc.data() as any;

          if(user.tipoUsuario == tipo)
          {
            usuarios.push(user);
          }
        });
        observable.next(usuarios);
      });
    });
  }

  obtenerTurnosPorUid(uid:string,tipoUsuario:string): Observable<Turno[]> 
  {
    return new Observable<Turno[]>((observable) => {
      onSnapshot(this.turnos, (snap) => {
        const turnos: any[] = [];
        snap.docChanges().forEach(x => {
          const turno = x.doc.data() as Turno;

          if((tipoUsuario == "Especialista" && turno.uidEspecialista == uid) || (tipoUsuario == "Paciente" && turno.uidPaciente == uid))
          {
            turnos.push(turno);
          }
        });
        observable.next(turnos);
      });
    });
  }
  
  obtenerTurnos(): Observable<any[]> 
  {
    return new Observable<any[]>((observable) => {
      onSnapshot(this.turnos, (snap) => {
        const turnos: any[] = [];
        snap.docChanges().forEach(x => {
          const turno = x.doc.data() as any;
          turnos.push(turno);
        });
        observable.next(turnos);
      });
    });
  }

  obtenerLogs(): Observable<any[]> 
  {
    return new Observable<any[]>((observable) => {
      onSnapshot(this.logs, (snap) => {
        const logs: any[] = [];
        snap.docChanges().forEach(x => {
          const log = x.doc.data() as any;
          logs.push(log);
        });
        observable.next(logs);
      });
    });
  }
}