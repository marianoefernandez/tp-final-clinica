"use strict";(self.webpackChunktp_final_clinica=self.webpackChunktp_final_clinica||[]).push([[635],{6635:(F,f,l)=>{l.r(f),l.d(f,{PacientesModule:()=>k});var m=l(6814),u=l(7045),d=l(5861),r=l(95),g=l(4036),h=l(3519),p=l.n(h),i=l(5879),_=l(4067),v=l(8672);function b(e,s){if(1&e){const t=i.EpF();i.TgZ(0,"div",7)(1,"button",8),i.NdJ("click",function(){i.CHM(t);const a=i.oxw();return i.KtG(a.cambiarFlagCrear(""))}),i._uU(2,"Volver Atras"),i.qZA()()}}function C(e,s){1&e&&(i.TgZ(0,"h1",7),i._uU(1," No hay ningun paciente para este especialista "),i.qZA())}function x(e,s){if(1&e){const t=i.EpF();i.TgZ(0,"button",27),i.NdJ("click",function(){i.CHM(t);const a=i.oxw().$implicit,n=i.oxw(3);return i.KtG(n.mostrarHistoriaClinica(a[0]))}),i._uU(1,"Ver Historia Clinica"),i.qZA()}}function Z(e,s){if(1&e){const t=i.EpF();i.TgZ(0,"button",28),i.NdJ("click",function(){i.CHM(t);const a=i.oxw().$implicit,n=i.oxw(3);return i.KtG(n.cambiarFlagCrear(a[0]))}),i._uU(1,"Modificar Historia Clinica"),i.qZA()}}function U(e,s){if(1&e){const t=i.EpF();i.TgZ(0,"button",29),i.NdJ("click",function(){i.CHM(t);const a=i.oxw().$implicit,n=i.oxw(3);return i.KtG(n.cambiarFlagCrear(a[0]))}),i._uU(1,"Crear Historia Clinica"),i.qZA()}}function T(e,s){if(1&e&&(i.TgZ(0,"div",16)(1,"div",17)(2,"h3"),i._uU(3),i.qZA(),i.TgZ(4,"h5",18),i._uU(5),i.qZA(),i.TgZ(6,"h5",18),i._uU(7),i.qZA(),i.TgZ(8,"h5",18),i._uU(9),i.qZA()(),i.TgZ(10,"div",19),i._UZ(11,"div",20),i.TgZ(12,"div",21),i._UZ(13,"img",22),i.qZA()(),i.TgZ(14,"div",23),i.YNc(15,x,2,0,"button",24),i.YNc(16,Z,2,0,"button",25),i.YNc(17,U,2,0,"button",26),i.qZA()()),2&e){const t=s.$implicit,o=i.oxw(3);i.xp6(3),i.AsE("",t[0].nombre," ",t[0].apellido,""),i.xp6(2),i.Oqu(t[0].dni),i.xp6(2),i.hij("",t[0].edad," a\xf1os"),i.xp6(2),i.Oqu(t[0].obraSocial),i.xp6(4),i.s9C("src",t[0].imagenUno,i.LSH),i.xp6(2),i.Q6J("ngIf",o.verificarHistoriaClinica(t[0])),i.xp6(1),i.Q6J("ngIf",o.verificarHistoriaClinica(t[0])),i.xp6(1),i.Q6J("ngIf",!o.verificarHistoriaClinica(t[0]))}}function q(e,s){if(1&e&&(i.TgZ(0,"div",14),i.YNc(1,T,18,9,"div",15),i.qZA()),2&e){const t=i.oxw(2);i.xp6(1),i.Q6J("ngForOf",t.pacientesEspecialista)}}function P(e,s){if(1&e){const t=i.EpF();i.TgZ(0,"div",9),i._UZ(1,"br"),i.TgZ(2,"h3",7),i._uU(3,"Puede buscar el paciente que desee"),i.qZA(),i._UZ(4,"br"),i.TgZ(5,"div",10)(6,"input",11),i.NdJ("ngModelChange",function(a){i.CHM(t);const n=i.oxw();return i.KtG(n.palabraBusqueda=a)}),i.qZA()(),i._UZ(7,"br"),i.TgZ(8,"h3",12),i._uU(9),i.qZA(),i._UZ(10,"br"),i.YNc(11,C,2,0,"h1",3),i.YNc(12,q,2,1,"div",13),i.qZA()}if(2&e){const t=i.oxw();i.xp6(6),i.Q6J("ngModel",t.palabraBusqueda),i.xp6(3),i.lnq("Pacientes en la clinica del ",t.firestore.datosUsuarioActual.tipoUsuario," ",t.firestore.datosUsuarioActual.nombre," ",t.firestore.datosUsuarioActual.apellido,""),i.xp6(2),i.Q6J("ngIf",0==t.pacientesEspecialista.length),i.xp6(1),i.Q6J("ngIf",!t.flagCrear)}}function A(e,s){if(1&e&&(i.TgZ(0,"span",37),i._uU(1),i.qZA()),2&e){const t=i.oxw(2);i.xp6(1),i.hij(" ",t.obtenerError("altura")," ")}}function D(e,s){if(1&e&&(i.TgZ(0,"span",37),i._uU(1),i.qZA()),2&e){const t=i.oxw(2);i.xp6(1),i.hij(" ",t.obtenerError("peso")," ")}}function I(e,s){if(1&e&&(i.TgZ(0,"span",37),i._uU(1),i.qZA()),2&e){const t=i.oxw(2);i.xp6(1),i.hij(" ",t.obtenerError("temperatura")," ")}}function w(e,s){if(1&e&&(i.TgZ(0,"span",37),i._uU(1),i.qZA()),2&e){const t=i.oxw(2);i.xp6(1),i.hij(" ",t.obtenerError("presion")," ")}}function y(e,s){1&e&&(i.TgZ(0,"button",61),i._uU(1,"Guardar Cambios"),i.qZA())}function M(e,s){if(1&e){const t=i.EpF();i.TgZ(0,"form",30,31),i.NdJ("ngSubmit",function(){i.CHM(t);const a=i.oxw();return i.KtG(a.crearModificarHistoriaClinica())}),i.TgZ(2,"h3"),i._uU(3,"Ingrese los datos fijos: "),i.qZA(),i._UZ(4,"hr",32),i.TgZ(5,"div",33)(6,"div",34)(7,"div",35)(8,"label",36),i._uU(9,"Altura (cm)"),i.qZA(),i.TgZ(10,"span",37),i._uU(11," *"),i.qZA(),i._UZ(12,"input",38),i.YNc(13,A,2,1,"span",39),i.qZA(),i.TgZ(14,"div",35)(15,"label",40),i._uU(16,"Peso (kg)"),i.qZA(),i.TgZ(17,"span",37),i._uU(18," *"),i.qZA(),i._UZ(19,"input",41),i.YNc(20,D,2,1,"span",39),i.qZA(),i.TgZ(21,"div",35)(22,"label",42),i._uU(23,"Temperatura (\xb0C)"),i.qZA(),i.TgZ(24,"span",37),i._uU(25," *"),i.qZA(),i._UZ(26,"input",43),i.YNc(27,I,2,1,"span",39),i.qZA(),i.TgZ(28,"div",35)(29,"label",44),i._uU(30,"Presion (mmHg)"),i.qZA(),i.TgZ(31,"span",37),i._uU(32," *"),i.qZA(),i._UZ(33,"input",45),i.YNc(34,w,2,1,"span",39),i.qZA()(),i.TgZ(35,"h3"),i._uU(36,"Ingrese los datos din\xe1micos (Opcional m\xe1ximo 3): "),i.qZA(),i._UZ(37,"hr",46),i.TgZ(38,"div",35)(39,"label",47),i._uU(40,"Dato 1 (Clave)"),i.qZA(),i._UZ(41,"input",48),i.qZA(),i.TgZ(42,"div",35)(43,"label",49),i._uU(44,"Dato 1 (Valor)"),i.qZA(),i._UZ(45,"input",50),i.qZA(),i.TgZ(46,"div",35)(47,"label",51),i._uU(48,"Dato 2 (Clave)"),i.qZA(),i._UZ(49,"input",52),i.qZA(),i.TgZ(50,"div",35)(51,"label",53),i._uU(52,"Dato 2 (Valor)"),i.qZA(),i._UZ(53,"input",54),i.qZA(),i.TgZ(54,"div",35)(55,"label",55),i._uU(56,"Dato 3 (Clave)"),i.qZA(),i._UZ(57,"input",56),i.qZA(),i.TgZ(58,"div",35)(59,"label",57),i._uU(60,"Dato 3 (Valor)"),i.qZA(),i._UZ(61,"input",58),i.qZA(),i._UZ(62,"hr",46),i.TgZ(63,"div",59),i.YNc(64,y,2,0,"button",60),i.qZA()()()}if(2&e){const t=i.oxw();i.Q6J("formGroup",t.formulario),i.xp6(13),i.Q6J("ngIf",t.esValidoElCampo("altura")),i.xp6(7),i.Q6J("ngIf",t.esValidoElCampo("peso")),i.xp6(7),i.Q6J("ngIf",t.esValidoElCampo("temperatura")),i.xp6(7),i.Q6J("ngIf",t.esValidoElCampo("presion")),i.xp6(30),i.Q6J("ngIf",!t.flagHistoriaClinica)}}const E=[{path:"",component:(()=>{class e{constructor(t,o,a,n){this.firestore=t,this.spinner=o,this.forms=a,this.router=n,this.turnosDisponibles=[],this.tipoFiltrado="Paciente",this.consultoriosRestantes=[],this.palabraBusqueda="",this.todosUsuarios=[],this.pacientesEspecialista=[],this.uidPacientes=[],this.flagHistoriaClinica=!1,this.flagCrear=!1,this.pacienteElegidoUid="",this.formulario=this.forms.group({altura:["",[r.kI.required,r.kI.min(70),r.kI.max(250)]],peso:["",[r.kI.required,r.kI.min(0),r.kI.max(500)]],temperatura:["",[r.kI.required,r.kI.min(25),r.kI.max(50)]],presion:["",[r.kI.required,r.kI.min(1),r.kI.max(300)]],claveUno:[""],datoUno:[""],claveDos:[""],datoDos:[""],claveTres:[""],datoTres:[""]})}ngOnInit(){var t=this;return(0,d.Z)(function*(){t.inicializarPagina(),t.spinner.show(),setTimeout((0,d.Z)(function*(){const o=yield(0,g.z)(t.firestore.obtenerTurnosPorUid(t.firestore.datosUsuarioActual.uid,t.firestore.datosUsuarioActual.tipoUsuario));for(let a=0;a<o.length;a++){const n=o[a];"Realizado"==n.estadoTurno&&(t.turnosDisponibles.push(n),t.uidPacientes.push(n.uidPaciente))}yield t.obtenerPacientes(),t.spinner.hide()}),500)})()}ngOnDestroy(){}verificarHistoriaClinica(t){return!!t.historiaClinica}crearModificarHistoriaClinica(){var t=this;this.spinner.show(),setTimeout((0,d.Z)(function*(){if(t.esValidoElCampo("altura")||t.esValidoElCampo("peso")||t.esValidoElCampo("temperatura")||t.esValidoElCampo("presion"))p().fire({title:"Error",text:"Hubo un error en alguno de los datos fijos. Fijese por favor",icon:"error"}),t.formulario.markAllAsTouched();else{const o=[];""!=t.formulario.value.claveUno&&""!=t.formulario.value.datoUno&&o.push({clave:t.formulario.value.claveUno,valor:t.formulario.value.datoUno}),""!=t.formulario.value.claveDos&&""!=t.formulario.value.datoDos&&o.push({clave:t.formulario.value.claveDos,valor:t.formulario.value.datoDos}),""!=t.formulario.value.claveTres&&""!=t.formulario.value.datoTres&&o.push({clave:t.formulario.value.claveTres,valor:t.formulario.value.datoTres});const n={historiaClinica:{altura:t.formulario.value.altura,peso:t.formulario.value.peso,temperatura:t.formulario.value.temperatura,presion:t.formulario.value.presion,datosDinamicos:o}};yield t.firestore.actualizarInfoUsuario(t.pacienteElegidoUid,n),t.pacientesEspecialista=[],yield t.obtenerPacientes(),p().fire({title:"\xc9xito",text:"Historia cl\xednica cargada con \xe9xito!",icon:"success"}).then(c=>{t.cambiarFlagCrear("")})}t.spinner.hide()}),1100)}mostrarHistoriaClinica(t){if(t.historiaClinica){let o="";switch(t.historiaClinica.datosDinamicos.length){case 0:o+="<h3>No hay ningun dato din\xe1mico cargado</h3>";break;case 1:o+=`<h3>${t.historiaClinica.datosDinamicos[0].clave}: ${t.historiaClinica.datosDinamicos[0].valor}</h3>`;break;case 2:o+=`<h3>${t.historiaClinica.datosDinamicos[0].clave}: ${t.historiaClinica.datosDinamicos[0].valor}</h3>\n           <h3>${t.historiaClinica.datosDinamicos[1].clave}: ${t.historiaClinica.datosDinamicos[1].valor}</h3>`;break;case 3:o+=`<h3>${t.historiaClinica.datosDinamicos[0].clave}: ${t.historiaClinica.datosDinamicos[0].valor}</h3>\n           <h3>${t.historiaClinica.datosDinamicos[1].clave}: ${t.historiaClinica.datosDinamicos[1].valor}</h3>\n           <h3>${t.historiaClinica.datosDinamicos[2].clave}: ${t.historiaClinica.datosDinamicos[2].valor}</h3>\n           `}p().fire({title:`Historia clinica del paciente ${t.nombre} ${t.apellido}.`,html:`\n          <h1>Datos Fijos</h1>\n          <br>\n          <h3>Altura: ${t.historiaClinica.altura} cm </h3>\n          <h3>Peso: ${t.historiaClinica.peso} kg </h3>\n          <h3>Temperatura: ${t.historiaClinica.temperatura} \xb0C </h3>\n          <h3>Presi\xf3n: ${t.historiaClinica.presion} mmHg </h3>\n\n          <br><br>\n          <h1>Datos Din\xe1micos</h1>\n          ${o}\n          `})}}obtenerPacientes(){var t=this;return(0,d.Z)(function*(){let a=[...new Set(t.uidPacientes)];for(let n=0;n<a.length;n++){const c=a[n],N=yield t.firestore.obtenerUsuariosEspecificos("uid",c);t.pacientesEspecialista.push(N)}console.log(t.pacientesEspecialista)})()}esValidoElCampo(t){return this.formulario.controls[t].errors&&this.formulario.controls[t].touched}obtenerError(t){if(!this.formulario.controls[t]&&!this.formulario.controls[t].errors)return null;const o=this.formulario.controls[t].errors;for(const a of Object.keys(o))switch(a){case"required":return"Este campo es requerido";case"minlength":return`Minimo ${o.minlength.requiredLength} caracteres.`;case"maxlength":return`Maximo ${o.maxlength.requiredLength} caracteres.`;case"min":return`Como minimo debe ser ${o.min.min}.`;case"max":return`Como maximo debe ser ${o.max.max}.`;case"email":return"El formato del mail es incorrecto"}return null}cambiarFlagCrear(t){this.spinner.show(),setTimeout(()=>{this.flagCrear=!this.flagCrear,this.flagCrear&&t.historiaClinica&&this.formulario.setValue({altura:t.historiaClinica.altura,peso:t.historiaClinica.peso,temperatura:t.historiaClinica.temperatura,presion:t.historiaClinica.presion,claveUno:t.historiaClinica.datosDinamicos.length>0?t.historiaClinica.datosDinamicos[0].clave:"",datoUno:t.historiaClinica.datosDinamicos.length>0?t.historiaClinica.datosDinamicos[0].valor:"",claveDos:t.historiaClinica.datosDinamicos.length>1?t.historiaClinica.datosDinamicos[1].clave:"",datoDos:t.historiaClinica.datosDinamicos.length>1?t.historiaClinica.datosDinamicos[1].valor:"",claveTres:t.historiaClinica.datosDinamicos.length>2?t.historiaClinica.datosDinamicos[2].clave:"",datoTres:t.historiaClinica.datosDinamicos.length>2?t.historiaClinica.datosDinamicos[2].valor:""}),this.pacienteElegidoUid=""==t?"":t.uid,this.spinner.hide()},850)}inicializarPagina(){return"Administrador"==this.firestore.datosUsuarioActual.tipoUsuario&&this.navigate("bienvenido/turnos/ver-turnos"),!0}verificarBusqueda(t){return"Especialidad"==this.tipoFiltrado?t.especialidad.toLowerCase().indexOf(this.palabraBusqueda.toLowerCase())>=0:"Paciente"==this.tipoFiltrado?this.obtenerApellidoNombre(t.uidPaciente).toLowerCase().indexOf(this.palabraBusqueda.toLowerCase())>=0:this.obtenerApellidoNombre(t.uidEspecialista).toLowerCase().indexOf(this.palabraBusqueda.toLowerCase())>=0}verificarId(t){for(let o=0;o<this.turnosDisponibles.length;o++)if(this.turnosDisponibles[o].idTurno==t)return!1;return!0}obtenerApellidoNombre(t){for(let o=0;o<this.todosUsuarios.length;o++)if(this.todosUsuarios[o].uid==t)return this.todosUsuarios[o].nombre+" "+this.todosUsuarios[o].apellido;return"Usuario no encontrado"}obtenerFechaYHora(t){return t.toDate().toLocaleString().slice(0,-3).replace(",","")}navigate(t){this.router.navigateByUrl(t)}static#i=this.\u0275fac=function(o){return new(o||e)(i.Y36(_.C),i.Y36(v.t2),i.Y36(r.qu),i.Y36(u.F0))};static#t=this.\u0275cmp=i.Xpm({type:e,selectors:[["app-pacientes"]],decls:11,vars:3,consts:[[1,"bg-dark"],[1,"text-light",2,"text-align","center","margin","auto"],[1,"card","contenido",2,"background-color","rgb(182, 182, 175)"],["style","text-align: center;",4,"ngIf"],["class","contenido-busqueda",4,"ngIf"],[1,"container","text-center"],["class","needs-validation","novalidate","",3,"formGroup","ngSubmit",4,"ngIf"],[2,"text-align","center"],[1,"boton","grande",3,"click"],[1,"contenido-busqueda"],[1,"barra-busqueda"],["type","text","placeholder","Buscar paciente...",1,"busqueda",2,"margin-top","10px",3,"ngModel","ngModelChange"],[1,"text-dark",2,"text-align","center","margin","auto"],["class","eleccion",4,"ngIf"],[1,"eleccion"],["class","carta",4,"ngFor","ngForOf"],[1,"carta"],[1,"description"],[2,"color","white"],[1,"head"],[1,"circle"],[1,"img"],[3,"src"],[1,"text-center"],["class","btn btn-outline-light bg-secondary","style","margin-right: 10px;",3,"click",4,"ngIf"],["class","btn btn-outline-light bg-danger",3,"click",4,"ngIf"],["class","btn btn-outline-light bg-success",3,"click",4,"ngIf"],[1,"btn","btn-outline-light","bg-secondary",2,"margin-right","10px",3,"click"],[1,"btn","btn-outline-light","bg-danger",3,"click"],[1,"btn","btn-outline-light","bg-success",3,"click"],["novalidate","",1,"needs-validation",3,"formGroup","ngSubmit"],["form","ngForm"],["cl","","ass","mb-4"],[1,"row","g-3"],[2,"margin-left","25%"],[1,"col-sm-6"],["for","altura",1,"form-label"],[1,"form-text","text-danger"],["type","number","id","altura","placeholder","Ingrese una altura (cm)","required","","formControlName","altura",1,"form-control"],["class","form-text text-danger",4,"ngIf"],["for","peso",1,"form-label"],["type","number","id","peso","placeholder","Ingrese peso (kg)","required","","formControlName","peso",1,"form-control"],["for","temperatura",1,"form-label"],["type","number","id","temperatura","placeholder","Ingrese temperatura (\xb0C)","required","","formControlName","temperatura",1,"form-control"],["for","presion",1,"form-label"],["type","number","id","presion","placeholder","Ingrese presi\xf3n (mmHg)","required","","formControlName","presion",1,"form-control"],[1,"mb-4"],["for","claveUno",1,"form-label"],["type","text","id","claveUno","placeholder","Ingrese clave 1","required","","formControlName","claveUno",1,"form-control"],["for","datoUno",1,"form-label"],["type","text","id","datoUno","placeholder","Ingrese valor 1","required","","formControlName","datoUno",1,"form-control"],["for","claveDos",1,"form-label"],["type","text","id","claveDos","placeholder","Ingrese clave 2","required","","formControlName","claveDos",1,"form-control"],["for","datoDos",1,"form-label"],["type","text","id","datoDos","placeholder","Ingrese valor 2","required","","formControlName","datoDos",1,"form-control"],["for","claveTres",1,"form-label"],["type","text","id","claveTres","placeholder","Ingrese clave 3","required","","formControlName","claveTres",1,"form-control"],["for","datoTres",1,"form-label"],["type","text","id","datoTres","placeholder","Ingrese valor 3","required","","formControlName","datoTres",1,"form-control"],[2,"text-align","center","margin-bottom","25px"],["class","w-50 btn btn-danger btn-lg","style","margin-top: 10px;","type","submit",4,"ngIf"],["type","submit",1,"w-50","btn","btn-danger","btn-lg",2,"margin-top","10px"]],template:function(o,a){1&o&&(i.TgZ(0,"body",0),i._UZ(1,"br"),i.TgZ(2,"h2",1),i._uU(3,"Mis Pacientes"),i.qZA(),i._UZ(4,"br"),i.TgZ(5,"div",2),i.YNc(6,b,3,0,"div",3),i.YNc(7,P,13,6,"div",4),i.TgZ(8,"div",5),i.YNc(9,M,65,6,"form",6),i.qZA()()(),i._UZ(10,"router-outlet")),2&o&&(i.xp6(6),i.Q6J("ngIf",a.flagCrear),i.xp6(1),i.Q6J("ngIf",!a.flagCrear),i.xp6(2),i.Q6J("ngIf",a.flagCrear))},dependencies:[m.sg,m.O5,u.lC,r._Y,r.Fj,r.wV,r.JJ,r.JL,r.Q7,r.On,r.sg,r.u],styles:[".contenido[_ngcontent-%COMP%]{overflow-y:scroll;flex-wrap:wrap;min-height:90vh;border-radius:40px;margin-left:2%;margin-right:2%}.barra-busqueda[_ngcontent-%COMP%]{text-align:center}.busqueda[_ngcontent-%COMP%]{width:512px}.turno[_ngcontent-%COMP%]{border-radius:40px;overflow:hidden;height:380px;width:440px;transition:.5s;text-align:center;border:5px solid;border-color:#000;margin:10px}.texto-turnos[_ngcontent-%COMP%]{text-align:center}.eleccion[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.carta[_ngcontent-%COMP%]{position:relative;width:400px;height:400px;background:rgb(5,125,255);background:radial-gradient(circle,rgba(5,125,255,1) 15%,rgba(0,0,0,1) 100%);overflow:hidden;transition:.5s;margin:10px 15px;border:2.5px solid black}.carta[_ngcontent-%COMP%]   .head[_ngcontent-%COMP%]{height:200px;width:100%;position:relative}.imagen[_ngcontent-%COMP%]{border:rgb(0,0,0) 3px solid;background-color:#ffffffa4;opacity:.8}.imagen[_ngcontent-%COMP%]:hover{opacity:1;transform:scale(1.1)}.carta[_ngcontent-%COMP%]   .head[_ngcontent-%COMP%]   .img[_ngcontent-%COMP%]{width:170px;height:170px;position:absolute;background:#fff;padding:2px;border-radius:50%;left:50%;transform:translate(-50%)}.carta[_ngcontent-%COMP%]   .head[_ngcontent-%COMP%]   .img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;border-radius:50%;object-fit:cover}.carta[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{border-bottom:solid 1px rgba(6,74,76,.18);text-align:center}.carta[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#fff;font-size:x-large;font-family:Impact,Haettenschweiler,Arial Narrow Bold,sans-serif}.lista-pacientes[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;float:left;flex-wrap:wrap;min-height:60vh}.boton[_ngcontent-%COMP%]{margin:10px;border-radius:20px;border:1px solid #ffffff;background-color:#1023ca;color:#fff;font-size:12px;font-weight:700;padding:8px 30px;letter-spacing:1px;text-transform:uppercase;transition:transform 80ms ease-in;opacity:.8}.grande[_ngcontent-%COMP%]{padding:15px 45px;font-size:15px}"]})}return e})()}];let O=(()=>{class e{static#i=this.\u0275fac=function(o){return new(o||e)};static#t=this.\u0275mod=i.oAB({type:e});static#o=this.\u0275inj=i.cJS({imports:[u.Bz.forChild(E),u.Bz]})}return e})(),k=(()=>{class e{static#i=this.\u0275fac=function(o){return new(o||e)};static#t=this.\u0275mod=i.oAB({type:e});static#o=this.\u0275inj=i.cJS({imports:[m.ez,O,r.u5,r.UX]})}return e})()}}]);