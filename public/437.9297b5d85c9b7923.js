"use strict";(self.webpackChunktp_final_clinica=self.webpackChunktp_final_clinica||[]).push([[437],{9437:(k,g,l)=>{l.r(g),l.d(g,{SolicitarTurnoModule:()=>B});var p=l(6814),h=l(7045),d=l(5861),_=l(8645),m=l(4036),b=l(3519),f=l.n(b),i=l(5879),x=l(7411),T=l(4067),v=l(8672),c=l(95);function C(a,r){1&a&&i.GkF(0)}function E(a,r){if(1&a){const e=i.EpF();i.TgZ(0,"ul",21)(1,"li",22),i.NdJ("click",function(){const s=i.CHM(e).$implicit,n=i.oxw(2);return i.KtG(n.elegirPaciente(s.uid))}),i._uU(2),i.qZA()()}if(2&a){const e=r.$implicit;i.xp6(2),i.hij(" ",e.nombreCompleto," ")}}function S(a,r){if(1&a){const e=i.EpF();i.TgZ(0,"div",14)(1,"div",15),i.NdJ("mouseleave",function(o){i.CHM(e);const s=i.oxw();return i.KtG(s.desactivarBuscador(o))}),i.TgZ(2,"h3",16),i._uU(3,"Por favor busque al paciente que desea agregar"),i.qZA(),i.TgZ(4,"div",17),i.NdJ("click",function(){i.CHM(e);const o=i.oxw();return i.KtG(o.activarBuscador())}),i.TgZ(5,"input",18),i.NdJ("keyup",function(o){i.CHM(e);const s=i.oxw();return i.KtG(s.cambioBusqueda(o))}),i.qZA()(),i.TgZ(6,"div",19),i.YNc(7,E,3,1,"ul",20),i.qZA()()()}if(2&a){const e=i.oxw();i.xp6(6),i.Q6J("hidden",e.flagBuscador),i.xp6(1),i.Q6J("ngForOf",e.listaFiltrada)}}function D(a,r){if(1&a&&(i.TgZ(0,"h3"),i._uU(1),i.qZA()),2&a){const e=i.oxw(2);i.xp6(1),i.AsE("Usted eligio al paciente: ",e.pacienteTurno.nombre," ",e.pacienteTurno.apellido,"")}}function Z(a,r){if(1&a&&(i.TgZ(0,"option",28),i._uU(1),i.qZA()),2&a){const e=r.$implicit;i.s9C("value",e),i.xp6(1),i.Oqu(e)}}function A(a,r){if(1&a){const e=i.EpF();i.TgZ(0,"div",23),i.YNc(1,D,2,2,"h3",6),i.TgZ(2,"label",24),i._uU(3,"Elije especialidad:"),i.qZA(),i.TgZ(4,"select",25),i.NdJ("change",function(){i.CHM(e);const o=i.oxw();return i.KtG(o.lanzarSpinner(500))})("ngModelChange",function(o){i.CHM(e);const s=i.oxw();return i.KtG(s.especialidadSeleccionada=o)}),i.TgZ(5,"option",26),i._uU(6,"Elegir especialidad..."),i.qZA(),i.YNc(7,Z,2,2,"option",27),i.qZA()()}if(2&a){const e=i.oxw();i.xp6(1),i.Q6J("ngIf","Administrador"==e.firestore.datosUsuarioActual.tipoUsuario),i.xp6(3),i.Q6J("ngModel",e.especialidadSeleccionada),i.xp6(1),i.Q6J("disabled",!0),i.xp6(2),i.Q6J("ngForOf",e.especialidadesRegistradas)}}function P(a,r){if(1&a&&(i.TgZ(0,"h3",5),i._uU(1),i.qZA()),2&a){const e=i.oxw();i.xp6(1),i.hij("Especialistas encontrados para la especialidad: ",e.especialidadSeleccionada,"")}}function N(a,r){1&a&&(i.TgZ(0,"p",5),i._uU(1,"Seleccione el especialista al que quiere solicitar un turno"),i.qZA())}function M(a,r){if(1&a){const e=i.EpF();i.TgZ(0,"div",29)(1,"div",30),i.NdJ("click",function(){const s=i.CHM(e).$implicit,n=i.oxw();return i.KtG(n.elegirEspecialista(s))}),i.TgZ(2,"h3"),i._uU(3),i.qZA(),i._UZ(4,"img",31),i.qZA()()}if(2&a){const e=r.$implicit;i.xp6(3),i.AsE("",e.nombre," ",e.apellido,""),i.xp6(1),i.s9C("src",e.imagenUno,i.LSH)}}function O(a,r){if(1&a){const e=i.EpF();i.TgZ(0,"input",36),i.NdJ("click",function(){const s=i.CHM(e).$implicit,n=i.oxw(3);return i.KtG(n.elegirDia(s))}),i.qZA()}if(2&a){const e=r.$implicit;i.cQ8("value","",e.dia,"/",e.mes,"/",e.anio,"")}}function w(a,r){if(1&a){const e=i.EpF();i.TgZ(0,"input",39),i.NdJ("click",function(){i.CHM(e);const o=i.oxw().$implicit,s=i.oxw(5);return i.KtG(s.elegirTurno(o.hora))}),i.qZA()}if(2&a){const e=i.oxw().$implicit,t=i.oxw(5);i.hYB("value","",e.hora," (",t.CANTIDADCONSULTORIOS-t.contarConsultorios(e.hora),")"),i.Q6J("disabled",!t.verificarDisponibilidad(e.hora))}}function y(a,r){if(1&a&&(i.ynx(0),i.YNc(1,w,1,3,"input",38),i.BQk()),2&a){const e=r.$implicit;i.xp6(1),i.Q6J("ngIf",e.estaActivo)}}function q(a,r){if(1&a&&(i.TgZ(0,"div")(1,"h3"),i._uU(2),i.qZA(),i.YNc(3,y,2,1,"ng-container",37),i.qZA()),2&a){const e=i.oxw(4);i.xp6(2),i.gL8("Horarios disponibles del d\xeda ",e.obtenerDiaPorNumero(e.diaElegido.diaSemana)," ",e.diaElegido.dia,"/",e.diaElegido.mes,"/",e.diaElegido.anio," para el especialista ",e.especialistaSeleccionado.nombre," ",e.especialistaSeleccionado.apellido," (Tener en cuenta que si el especialista ya tiene disponibilidad horaria o se supero la cantidad de consultorios disponibles no se podra elegir el horario)"),i.xp6(1),i.Q6J("ngForOf",e.horarioDiaElegido)}}function U(a,r){if(1&a&&(i.TgZ(0,"div")(1,"h3",16),i._uU(2,"Seleccione el horario que desea elegir:"),i.qZA(),i.YNc(3,q,4,7,"div",6),i.qZA()),2&a){const e=i.oxw(3);i.xp6(3),i.Q6J("ngIf",null!=e.horarioDiaElegido)}}function F(a,r){if(1&a&&(i.TgZ(0,"div")(1,"h2",16),i._uU(2),i.qZA(),i.TgZ(3,"h3",16),i._uU(4,"Seleccione un d\xeda: (Se muestran los pr\xf3ximos 15 d\xedas del mes, no se tienen en cuenta los d\xedas en el que el especialista no tiene disponibilidad horaria)"),i.qZA(),i.YNc(5,O,1,3,"input",35),i.YNc(6,U,4,1,"div",6),i.qZA()),2&a){const e=i.oxw(2);i.xp6(2),i.lnq("El especialista ",e.especialistaSeleccionado.nombre," ",e.especialistaSeleccionado.apellido," est\xe1 disponible los siguientes d\xedas: ",e.formatearDiasEnTexto(e.diasEspecialista),""),i.xp6(3),i.Q6J("ngForOf",e.diasDisponibles),i.xp6(1),i.Q6J("ngIf",null!=e.diaElegido)}}function J(a,r){if(1&a&&(i.TgZ(0,"h1",16),i._uU(1),i.qZA()),2&a){const e=i.oxw(2);i.xp6(1),i.AsE("El especialista ",e.especialistaSeleccionado.nombre," ",e.especialistaSeleccionado.apellido," no tiene horarios cargados por ende no est\xe1 disponible para su turno")}}function I(a,r){if(1&a&&(i.TgZ(0,"div",32),i.YNc(1,F,7,5,"div",33),i.YNc(2,J,2,2,"ng-template",null,34,i.W1O),i.qZA()),2&a){const e=i.MAs(3),t=i.oxw();i.xp6(1),i.Q6J("ngIf",0!=t.diasEspecialista.length)("ngIfElse",e)}}const H=[{path:"",component:(()=>{class a{constructor(e,t,o){this.autenticacion=e,this.firestore=t,this.spinner=o,this.especialidadesRegistradas=[],this.especialidadSeleccionada="",this.especialistasDisponibles=[],this.especialistaSeleccionado=null,this.horariosEspecialista=null,this.diasEspecialista=[],this.diasDisponibles=[],this.diaElegido=null,this.horarioDiaElegido=null,this.flagDiasCargados=!1,this.horariosNoDisponibles=[],this.flagAgregado=!0,this.flagInicio=!0,this.CANTIDADCONSULTORIOS=6,this.pacienteTurno=null,this.listaPacientes=[],this.listaNombresPacientes=[],this.listaFiltrada=[],this.terminoBusqueda$=new _.x,this.flagBuscador=!0}ngOnInit(){var e=this;return(0,d.Z)(function*(){e.especialistasDisponibles=yield e.firestore.obtenerUsuariosEspecificos("tipoUsuario","Especialista"),e.especialidadesRegistradas=e.obtenerEspecialidades(),e.suscripcionTurnos=e.firestore.obtenerTurnos().subscribe(function(){var t=(0,d.Z)(function*(o){if(e.flagAgregado)e.obtenerHorariosNoDisponibles(o),e.flagAgregado=!1;else{e.horariosNoDisponibles=[];const s=yield(0,m.z)(e.firestore.obtenerTurnos());e.obtenerHorariosNoDisponibles(s)}console.log(e.horariosNoDisponibles)});return function(o){return t.apply(this,arguments)}}()),"Paciente"==e.firestore.datosUsuarioActual.tipoUsuario&&(e.pacienteTurno=e.firestore.datosUsuarioActual),e.suscripcionPacientes=e.firestore.obtenerUsuariosPorTipo("Paciente").subscribe(t=>{e.listaPacientes=e.listaPacientes.concat(t),e.obtenerNombresPacientes(),e.listaFiltrada=e.listaNombresPacientes,e.filtrarListaBuscador()})})()}ngOnDestroy(){this.suscripcionTurnos.unsubscribe(),this.suscripcionPacientes.unsubscribe()}activarBuscador(){this.flagBuscador=!1}desactivarBuscador(e){this.flagBuscador=!0}cambioBusqueda(e){this.terminoBusqueda$.next(e.target.value)}filtrarListaBuscador(){this.terminoBusqueda$.subscribe(e=>{this.listaFiltrada=this.listaNombresPacientes.filter(t=>t.nombreCompleto.toLowerCase().indexOf(e.toLowerCase())>=0)})}obtenerNombresPacientes(){let e,t,o,s;for(let n=0;n<this.listaPacientes.length;n++)e=this.listaPacientes[n].nombre,t=this.listaPacientes[n].apellido,s=this.listaPacientes[n].uid,o=e+" "+t,this.listaNombresPacientes.push({nombreCompleto:o,uid:s})}elegirPaciente(e){var t=this;let o;this.spinner.show(),setTimeout((0,d.Z)(function*(){o=yield t.firestore.obtenerUsuariosEspecificos("uid",e),t.pacienteTurno=o[0],t.flagBuscador=!0,t.spinner.hide()}),200)}obtenerHorariosNoDisponibles(e){let t,s,o="";for(let n=0;n<e.length;n++)("Pendiente"==e[n].estadoTurno||"Realizado"==e[n].estadoTurno||"Aceptado"==e[n].estadoTurno)&&(t=e[n].horarioTurno.toDate(),o=t.getHours().toString()+":"+t.getMinutes().toString(),0==t.getMinutes()&&(o+=0),s={dia:t.getDate(),mes:t.getMonth()+1,anio:t.getFullYear(),hora:o,uidEspecialista:e[n].uidEspecialista},this.horariosNoDisponibles.push(s),this.flagAgregado=!1)}verificarDisponibilidad(e){if(this.contarConsultorios(e)==this.CANTIDADCONSULTORIOS)return!1;for(let o=0;o<this.horariosNoDisponibles.length;o++)if(this.horariosNoDisponibles[o].dia==this.diaElegido.dia&&this.horariosNoDisponibles[o].hora==e&&this.horariosNoDisponibles[o].uidEspecialista==this.especialistaSeleccionado.uid)return!1;return!0}contarConsultorios(e){let t=0;for(let o=0;o<this.horariosNoDisponibles.length;o++)this.horariosNoDisponibles[o].dia==this.diaElegido.dia&&this.horariosNoDisponibles[o].hora==e&&t++;return t}obtenerEspecialidades(){let e=[];for(let o=0;o<this.especialistasDisponibles.length;o++)if(this.especialistasDisponibles[o].estaActivo){let s=[];for(let n=0;n<this.especialistasDisponibles[o].especialidad.length;n++)s.push(this.especialistasDisponibles[o].especialidad[n].especialidad);e=e.concat(s)}return e=[...new Set(e)],e}obtenerEspecialistasPorEspecialidad(e){let t=[];for(let o=0;o<this.especialistasDisponibles.length;o++)if(this.especialistasDisponibles[o].estaActivo)for(let s=0;s<this.especialistasDisponibles[o].especialidad.length;s++)this.especialistasDisponibles[o].especialidad[s].especialidad==e&&t.push(this.especialistasDisponibles[o]);return t}obtenerHorariosDiaSeleccionado(e){let t=this.obtenerDiaPorNumero(this.diaElegido.diaSemana);for(let o=0;o<this.horariosEspecialista.diasHorarios.length;o++)if(this.horariosEspecialista.diasHorarios[o].dia==t)return this.horariosEspecialista.diasHorarios[o].horarios;return null}inicializarPagina(){0==this.horariosNoDisponibles.length&&this.flagInicio?(this.spinner.show(),this.flagInicio=!1):0==this.flagInicio&&this.horariosNoDisponibles.length>0&&(this.spinner.hide(),this.flagInicio=null)}lanzarSpinner(e){var t=this;return(0,d.Z)(function*(){""!=t.especialidadSeleccionada&&(t.spinner.show(),setTimeout(()=>{t.spinner.hide()},e))})()}obtenerDias(){let e=[];if(null!=this.horariosEspecialista)for(let t=0;t<this.horariosEspecialista.diasHorarios.length;t++)e.push(this.horariosEspecialista.diasHorarios[t].dia);return e}formatearDiasEnTexto(e){let t="";for(let o=0;o<e.length;o++)t+=e[o],o!=e.length-1&&(t+="-");return t}obtenerProximosDias(e){let t=new Date,o=[];for(let s=0;s<e;s++){t.setDate(t.getDate()+1);for(let n=0;n<this.diasEspecialista.length;n++)if(this.obtenerNumeroDia(this.diasEspecialista[n])==t.getDay()){let u={dia:t.getDate(),mes:t.getMonth()+1,anio:t.getFullYear(),diaSemana:t.getDay()};o.push(u)}}return o}elegirTurno(e){var t=this;this.spinner.show();const o=e.split(":"),s=new Date(this.diaElegido.anio,this.diaElegido.mes-1,this.diaElegido.dia,parseInt(o[0]),parseInt(o[1]));console.log(s),setTimeout((0,d.Z)(function*(){const u={idTurno:yield t.firestore.obtenerId("idTurnos"),uidPaciente:t.pacienteTurno.uid,uidEspecialista:t.especialistaSeleccionado.uid,consultorio:0,horarioTurno:s,estadoTurno:"Pendiente",rese\u00f1a:"",calificacion:0,rese\u00f1aPaciente:"",especialidad:t.especialidadSeleccionada,encuesta:[]};t.flagAgregado=!0,t.firestore.agregarTurno(u).then(Q=>{t.spinner.hide(),null!=Q?f().fire({title:"Turno agregado con \xe9xito",text:"El turno fue agregado con \xe9xito para el d\xefa "+t.diaElegido.dia+"/"+t.diaElegido.mes+"/"+t.diaElegido.anio+" y ya fue recibido por el Especialista. Aguarde un tiempo para ver si el mismo es aceptado o rechazado por el mismo. Revise la secci\xf3n mis turnos para ver el estado del mismo",icon:"success"}).then(()=>{t.spinner.show(),setTimeout(()=>{t.reiniciarAtributos(),t.spinner.hide()},500)}):(f().fire({title:"Error inesperado",text:"Hubo un error inesperado al cargar el turno, recargue la p\xe1gina y vuelva a intentarlo",icon:"error"}),t.flagAgregado=!1)})}),100)}reiniciarAtributos(){this.especialidadSeleccionada="",this.especialistaSeleccionado=null,this.horariosEspecialista=null,this.diasEspecialista=[],this.diasDisponibles=[],this.diaElegido=null,this.horarioDiaElegido=null,this.flagDiasCargados=!1}obtenerNumeroDia(e){switch(e){case"Lunes":return 1;case"Martes":return 2;case"Miercoles":return 3;case"Jueves":return 4;case"Viernes":return 5;case"S\xe1bado":return 6}return 6}obtenerDiaPorNumero(e){switch(e){case 1:return"Lunes";case 2:return"Martes";case 3:return"Miercoles";case 4:return"Jueves";case 5:return"Viernes";case 6:return"S\xe1bado"}return 6}elegirEspecialista(e){var t=this;this.flagDiasCargados=!1,this.spinner.show(),setTimeout((0,d.Z)(function*(){t.especialistaSeleccionado=e,t.horariosEspecialista=yield t.firestore.obtenerHorarioUsuario(t.especialistaSeleccionado.uid),t.diasEspecialista=t.obtenerDias(),t.diasDisponibles=t.obtenerProximosDias(15),t.diaElegido=null,t.horarioDiaElegido=null,t.spinner.hide(),t.flagDiasCargados=!0}),200)}elegirDia(e){this.spinner.show(),setTimeout(()=>{this.diaElegido=e,this.horarioDiaElegido=this.obtenerHorariosDiaSeleccionado(this.diaElegido),this.spinner.hide()},300)}static#i=this.\u0275fac=function(t){return new(t||a)(i.Y36(x.T),i.Y36(T.C),i.Y36(v.t2))};static#e=this.\u0275cmp=i.Xpm({type:a,selectors:[["app-solicitar-turno"]],decls:22,vars:9,consts:[["lang","es"],["charset","UTF-8"],["name","viewport","content","width=device-width, initial-scale=1.0"],[1,"bg-dark"],[1,"py-5","text-center"],[1,"lead","text-light"],[4,"ngIf"],[1,"alta-turno","card","bg-secondary"],["id","paciente",4,"ngIf"],["id","especialidad",4,"ngIf"],["id","especialistas"],["class","lead text-light",4,"ngIf"],["class","seleccion",4,"ngFor","ngForOf"],["id","carga-horaria",4,"ngIf"],["id","paciente"],[1,"card","bg-primary","contenido-busqueda",3,"mouseleave"],[1,"text-light"],[1,"barra-busqueda",3,"click"],["type","text","placeholder","Buscar paciente",1,"search",3,"keyup"],[1,"elemento-busqueda",3,"hidden"],["class","lista-busqueda",4,"ngFor","ngForOf"],[1,"lista-busqueda"],[3,"click"],["id","especialidad"],["for",""],["name","especialidadSeleccionada","required","",1,"form-select","bg-primary",3,"ngModel","change","ngModelChange"],["value","",3,"disabled"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],[1,"seleccion"],[1,"card-body","bg-primary","text-light","especialista",3,"click"],["alt","","width","64","height","64",3,"src"],["id","carga-horaria"],[4,"ngIf","ngIfElse"],["elseblock",""],["class","btn btn-lg text-light bg-primary dia","type","button",3,"value","click",4,"ngFor","ngForOf"],["type","button",1,"btn","btn-lg","text-light","bg-primary","dia",3,"value","click"],[4,"ngFor","ngForOf"],["class","btn btn-lg text-light bg-danger hora","type","button",3,"disabled","value","click",4,"ngIf"],["type","button",1,"btn","btn-lg","text-light","bg-danger","hora",3,"disabled","value","click"]],template:function(t,o){1&t&&(i.TgZ(0,"html",0)(1,"head"),i._UZ(2,"meta",1)(3,"meta",2),i.TgZ(4,"title"),i._uU(5,"Solicitar Turno"),i.qZA()(),i.TgZ(6,"body",3)(7,"div",4)(8,"h2"),i._uU(9,"Solicitar turno"),i.qZA(),i.TgZ(10,"p",5),i._uU(11),i.qZA()(),i.YNc(12,C,1,0,"ng-container",6),i.TgZ(13,"form",7)(14,"div"),i.YNc(15,S,8,2,"div",8),i.YNc(16,A,8,4,"div",9),i.TgZ(17,"div",10),i.YNc(18,P,2,1,"h3",11),i.YNc(19,N,2,0,"p",11),i.YNc(20,M,5,3,"div",12),i.qZA(),i.YNc(21,I,4,2,"div",13),i.qZA()()()()),2&t&&(i.xp6(11),i.AsE("Por medio del siguiente formulario se puede solicitar un nuevo turno para el paciente: ",o.firestore.datosUsuarioActual.nombre," ",o.firestore.datosUsuarioActual.apellido,""),i.xp6(1),i.Q6J("ngIf",o.inicializarPagina()),i.xp6(3),i.Q6J("ngIf","Administrador"==o.firestore.datosUsuarioActual.tipoUsuario),i.xp6(1),i.Q6J("ngIf",null!=o.pacienteTurno),i.xp6(2),i.Q6J("ngIf",""!=o.especialidadSeleccionada),i.xp6(1),i.Q6J("ngIf",""!=o.especialidadSeleccionada),i.xp6(1),i.Q6J("ngForOf",o.obtenerEspecialistasPorEspecialidad(o.especialidadSeleccionada)),i.xp6(1),i.Q6J("ngIf",o.flagDiasCargados))},dependencies:[p.sg,p.O5,c._Y,c.YN,c.Kr,c.EJ,c.JJ,c.JL,c.Q7,c.On,c.F],styles:["body[_ngcontent-%COMP%]{flex-wrap:wrap;min-height:90vh;overflow:hidden;transition:.5s}.contenido[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.lista-horarios[_ngcontent-%COMP%]{height:800px;overflow-y:scroll;flex-wrap:wrap}.contenido-busqueda[_ngcontent-%COMP%]{overflow-y:scroll;flex-wrap:wrap;max-height:400px;min-height:200px}img[_ngcontent-%COMP%]{border-radius:40px;border:2px solid;border-color:#fff}h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%]{color:#fff}select[_ngcontent-%COMP%]{height:40px;width:300px;color:#fff}label[_ngcontent-%COMP%]{font-size:18px;color:#fff}.especialista[_ngcontent-%COMP%]{border-radius:40px;overflow:hidden;width:256px;transition:.5s;text-align:center}div[_ngcontent-%COMP%]{margin-bottom:10px;margin-top:10px;margin-left:20px}span[_ngcontent-%COMP%]{color:#fff}button[_ngcontent-%COMP%]{margin-left:10px}.seleccion[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:hover:not(h3, img)[_ngcontent-%COMP%]{border:5px solid;border-color:#c300ff;cursor:pointer}.dia[_ngcontent-%COMP%]{width:128px;height:64px;margin:4px;border-color:#fff}.lista-busqueda[_ngcontent-%COMP%]{background-color:#fff}.barra-busqueda[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:256px}.barra-busqueda[_ngcontent-%COMP%]{margin-top:-10px;margin-bottom:-9px}.elemento-busqueda[_ngcontent-%COMP%]{width:256px;border:1.5px solid;border-color:#000;color:#000;background-color:#ffffffcd;opacity:.7}ul[_ngcontent-%COMP%]{border:.5px solid;border-color:#000;margin-top:0;margin-bottom:0;list-style-type:none}ul[_ngcontent-%COMP%]:hover{border:2px solid;background-color:#b4b411ab;cursor:pointer}.hora[_ngcontent-%COMP%]{width:100px;height:50px;margin:4px;border-color:#fff}.dia[_ngcontent-%COMP%]:hover{border:5px solid;border-color:#c300ff}.hora[_ngcontent-%COMP%]:hover{border:5px solid;border-color:#000}input[_ngcontent-%COMP%]:disabled{opacity:.2}"]})}return a})()}];let Y=(()=>{class a{static#i=this.\u0275fac=function(t){return new(t||a)};static#e=this.\u0275mod=i.oAB({type:a});static#t=this.\u0275inj=i.cJS({imports:[h.Bz.forChild(H),h.Bz]})}return a})(),B=(()=>{class a{static#i=this.\u0275fac=function(t){return new(t||a)};static#e=this.\u0275mod=i.oAB({type:a});static#t=this.\u0275inj=i.cJS({imports:[p.ez,Y,c.u5]})}return a})()}}]);