import { Component } from '@angular/core';
import { FormBuilder, FormGroup , NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { Usuario } from 'src/app/interfaces/Usuario';
import swal from 'sweetalert2';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent 
{
  public formulario: FormGroup = this.forms.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    edad: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    dni: ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]],
    especialidad: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    clave: ['', [Validators.required, Validators.minLength(6)]],
    obraSocial: ['', [Validators.required]]
  }); 

  public tipoUsuario:string = "";

  //public seleccionEspecialidad : any[] = [];
  public imagenPerfilUno:any = null;
  public imagenPerfilDos:any | null = null;
  public hora: any;
  public mensajeError:string = "";
  public flagRegistro : boolean = false;
  public mensajeConfirmacion ="";
  public especialidadAgregada : any = null;
  token: string|undefined;


  public listaEspecialidades : any[] = 
  [
    {especialidad:"Psicologia"},
    {especialidad:"Cardiología"},
    {especialidad:"Neurología"},
  ]

  public flagCaptcha = true;

  constructor(private spinner:NgxSpinnerService,private autenticador:AutenticacionService, private forms: FormBuilder,private router:Router)
  {
    this.token = undefined;
  }

  resolverCaptcha(respuestaEvento:string|null)
  {
    if(respuestaEvento != null && respuestaEvento.length > 0)
    {
      this.flagCaptcha = false;
    }
  }

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    console.debug(`Token [${this.token}] generated`);
  }

  ngOnInit()
  {
    this.formulario.reset();
  }

  esValidoElCampo(campo: string): boolean | null 
  {
    return this.formulario.controls[campo].errors && this.formulario.controls[campo].touched;
  }

  validarImagenUno()
  {
    return this.imagenPerfilUno == null && this.flagRegistro;
  }

  validarImagenDos()
  {
    return this.imagenPerfilDos == null && this.flagRegistro;
  }

  verificarEspecialidad()
  {
    return this.formulario.value["especialidad"] == "Otro"
  }

  obtenerError(campo: string): string | null {
    if (!this.formulario.controls[campo] && !this.formulario.controls[campo].errors) return null;

    const errores = this.formulario.controls[campo].errors;
    for (const clave of Object.keys(errores!)) 
    {
      switch (clave) 
      {
        case 'required':
          return "Este campo es requerido";
        case 'minlength':
          return `Minimo ${errores!['minlength'].requiredLength} caracteres.`;
        case 'maxlength':
          return `Maximo ${errores!['maxlength'].requiredLength} caracteres.`;
        case 'min':
          return `Como minimo debe ser ${errores!['min'].min}.`;
        case 'max':
          return `Como maximo debe ser ${errores!['max'].max}.`;
        case 'email':
          return "El formato del mail es incorrecto";
      }
    }
    return null;
  }


  async lanzarSpinner(tiempo:number)
  {
    if(this.tipoUsuario != "")
    {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, tiempo);
    }
  }

  public guardarImagenUno(event:any)
  {
    this.imagenPerfilUno = event.target.files[0];
    console.log("Se guardo imagen 1");
  }

  public guardarImagenDos(event:any)
  {
    this.imagenPerfilDos = event.target.files[0];
    console.log("Se guardo imagen 2");
  }

  public validarFormulario()
  {
    if(!this.esValidoElCampo("nombre") && !this.esValidoElCampo("apellido") && !this.esValidoElCampo("dni") && !this.esValidoElCampo("edad") && !this.esValidoElCampo("email") && !this.esValidoElCampo("clave") && !this.validarImagenUno())
    {
      if(this.tipoUsuario == "Paciente" && !this.esValidoElCampo("obraSocial") && !this.validarImagenDos())
      {
        return true;
      }
      else
      {
        if(!this.esValidoElCampo("especialidad"))
        {
          return true;
        }
      }
    }
    return false;
  }

  public registrarse()
  {
    this.flagRegistro = true;

    if(this.validarFormulario())
    {
      console.log("DATOS BIEN INGRESADOS");

      // if(this.formulario.value["especialidad"] != "Otro")
      // {
      //   this.seleccionEspecialidad = this.formulario.value["especialidad"];
      // }

      const usuario: Usuario = 
      {
        tipo:this.tipoUsuario,
        nombre:this.formulario.value["nombre"],
        apellido:this.formulario.value["apellido"],
        edad:this.formulario.value["edad"],
        dni:this.formulario.value["dni"],
        email: this.formulario.value["email"],
        imagenPerfilUno:this.imagenPerfilUno,
        imagenPerfilDos:this.imagenPerfilDos,
        obraSocial:this.formulario.value["obraSocial"],
        especialidad:this.formulario.value["especialidad"],
        estaActiva:false,
        hora: new Date()
      }
      this.spinner.show();
      this.autenticador.registro(usuario,this.formulario.value["clave"]).then(respuesta =>
        {
          setTimeout(() => {
            if(typeof respuesta != "string")
            {
              let mensaje : string = usuario.tipo == "Paciente" ? "Se ha registrado como paciente exitosamente. Se enviado un correo electronico al email: " + usuario.email + " por favor verifiquelo para poder iniciar sesión" : "Se ha registrado como especialista exitosamente. Se enviado un correo electronico al email: " + usuario.email + " por favor verifiquelo para poder iniciar sesión. Recuerde que para poder iniciar sesión su cuenta debe ser validada por un administrador, proceso que puede llevar hasta 48 hs habiles en resolverse. Tenga paciencia.";
              swal.fire(
              {
                icon: 'success',
                title: 'Usuario registrado con exito',
                footer: mensaje,
                showConfirmButton: true
              }).then(() => 
              {
                this.spinner.show();
                setTimeout(async () => 
                {
                  this.spinner.hide();
                  await this.autenticador.cerrarSesion();
                  this.navigate("sesiones/login");
                }, 500);
              });
            }
            else
            {
              this.mostrarError(respuesta)
              swal.fire(
              {
                icon: 'error',
                title: 'Oops...',
                text: 'Error al crear cuenta',
                footer: this.mensajeError
              });
            }
            this.spinner.hide()
          }, 100);
        })
    }
    else
    {
      console.log("REVISE LOS DATOS INGRESADOS");
      this.formulario.markAllAsTouched();
    }
  }

  public elegirTipo(tipo:string)
  {
    this.spinner.show();
    setTimeout(() => {
      this.tipoUsuario = tipo;      
      this.spinner.hide();
    }, 1500);
  }

  public mostrarError(error:string)
  {
    switch(error)
    {
      case "auth/email-already-in-use":
        this.mensajeError = 'El correo ya está registrado, prueba con otro';
        break;
      case "auth/invalid-email":
        this.mensajeError = 'El formato de correo es invalido';
        break;
      case "dni-duplicado":
        this.mensajeError = "El dni " + this.formulario.value["dni"] + " ya se encuentra registrado en el sistema por lo tanto no es válido para registrarse"; 
        break;
      case "auth/operation-not-allowed":
        this.mensajeError = "Operación no permitida";
    }
  }

  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
  }

  public agregarEspecialidad()
  {
    if(this.especialidadAgregada != null)
    {
      if(this.listaEspecialidades.find( (esp) => {
        return esp.especialidad == this.especialidadAgregada;
      }) == undefined)
      {
        const especialidad = {especialidad:this.especialidadAgregada};
        this.listaEspecialidades.push(especialidad);
        this.mensajeConfirmacion = "Especialidad " + this.especialidadAgregada + " agregada con éxito";
        setTimeout(() => {
          this.mensajeConfirmacion = "";
        }, 2000);
      }
      else
      {
        this.mensajeConfirmacion = "La especialidad " + this.especialidadAgregada + " ya existe en la lista";
        setTimeout(() => {
          this.mensajeConfirmacion = "";
        }, 2000);
      }
    }
  }
}
