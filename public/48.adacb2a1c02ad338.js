"use strict";(self.webpackChunktp_final_clinica=self.webpackChunktp_final_clinica||[]).push([[48],{2048:(L,d,r)=>{r.r(d),r.d(d,{MiPerfilModule:()=>K});var l=r(6814),g=r(7045),t=r(5879),p=r(7411),u=r(4067),_=r(5861),h=r(3519),m=r.n(h),C=r(8672),s=r(95),f=r(4774);function x(o,a){if(1&o&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA()()),2&o){const n=t.oxw().$implicit;t.xp6(2),t.Oqu(n.hora)}}function M(o,a){if(1&o&&(t.ynx(0),t.YNc(1,x,3,1,"tr",12),t.BQk()),2&o){const n=a.$implicit;t.xp6(1),t.Q6J("ngIf",n.estaActivo)}}function b(o,a){if(1&o){const n=t.EpF();t.TgZ(0,"div")(1,"h3"),t._uU(2),t.qZA(),t.TgZ(3,"table",10),t.NdJ("click",function(){const c=t.CHM(n).$implicit,B=t.oxw(3);return t.KtG(B.cambiarAccion("editar-eliminar",c))}),t.TgZ(4,"tr")(5,"th"),t._uU(6,"Hora"),t.qZA()(),t.YNc(7,M,2,1,"ng-container",9),t.qZA(),t._UZ(8,"hr",11),t.qZA()}if(2&o){const n=a.$implicit;t.xp6(2),t.Oqu(n.dia),t.xp6(5),t.Q6J("ngForOf",n.horarios)}}function v(o,a){if(1&o&&(t.TgZ(0,"div")(1,"h2"),t._uU(2,"Horarios disponibles del especialista (Haz click en los horarios para editar/eliminar el d\xeda) "),t.qZA(),t.YNc(3,b,9,2,"div",9),t.qZA()),2&o){const n=t.oxw(2);t.xp6(3),t.Q6J("ngForOf",n.horarioUsuario.diasHorarios)}}function O(o,a){1&o&&(t.TgZ(0,"div")(1,"h2"),t._uU(2,"No hay ningun horario cargado en el especialista"),t.qZA()())}function P(o,a){if(1&o){const n=t.EpF();t.TgZ(0,"div",5),t.YNc(1,v,4,1,"div",6),t.YNc(2,O,3,0,"ng-template",null,7,t.W1O),t.TgZ(4,"div")(5,"button",8),t.NdJ("click",function(){t.CHM(n);const e=t.oxw();return t.KtG(e.cambiarAccion("alta",""))}),t._uU(6,"Agregar horario"),t.qZA()()()}if(2&o){const n=t.MAs(3),i=t.oxw();t.xp6(1),t.Q6J("ngIf",null!=i.horarioUsuario)("ngIfElse",n)}}function A(o,a){if(1&o&&(t.TgZ(0,"option",21),t._uU(1),t.qZA()),2&o){const n=a.$implicit,i=t.oxw(3);t.s9C("value",n),t.Q6J("disabled",!i.diasRestantes.includes(n)),t.xp6(1),t.Oqu(n)}}function H(o,a){if(1&o){const n=t.EpF();t.TgZ(0,"div")(1,"label",17),t._uU(2,"D\xeda del turno"),t.qZA(),t.TgZ(3,"select",18),t.NdJ("change",function(){t.CHM(n);const e=t.oxw(2);return t.KtG(e.lanzarSpinner(500))})("ngModelChange",function(e){t.CHM(n);const c=t.oxw(2);return t.KtG(c.diaSemana=e)}),t.TgZ(4,"option",19),t._uU(5,"Elegir d\xeda de la semana..."),t.qZA(),t.YNc(6,A,2,3,"option",20),t.qZA()()}if(2&o){const n=t.oxw(2);t.xp6(3),t.Q6J("ngModel",n.diaSemana),t.xp6(1),t.Q6J("disabled",!0),t.xp6(2),t.Q6J("ngForOf",n.diasSemana)}}function y(o,a){if(1&o&&(t.TgZ(0,"h3"),t._uU(1),t.qZA()),2&o){const n=t.oxw(2);t.xp6(1),t.hij("Edito/Elimino horarios del especialista para el dia ",n.diaSemana,"")}}function Z(o,a){if(1&o){const n=t.EpF();t.TgZ(0,"p-multiSelect",24),t.NdJ("ngModelChange",function(e){t.CHM(n);const c=t.oxw(3);return t.KtG(c.horarios=e)})("onChange",function(){t.CHM(n);const e=t.oxw(3);return t.KtG(e.mostrarHorarioSeleccionado())}),t.qZA()}if(2&o){const n=t.oxw(3);t.Q6J("ngModel",n.horarios)("options",n.horariosDiaSemana)}}function w(o,a){if(1&o){const n=t.EpF();t.TgZ(0,"p-multiSelect",24),t.NdJ("ngModelChange",function(e){t.CHM(n);const c=t.oxw(3);return t.KtG(c.horarios=e)})("onChange",function(){t.CHM(n);const e=t.oxw(3);return t.KtG(e.mostrarHorarioSeleccionado())}),t.qZA()}if(2&o){const n=t.oxw(3);t.Q6J("ngModel",n.horarios)("options",n.horariosSabados)}}function T(o,a){if(1&o&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&o){const n=t.oxw(3);t.xp6(1),t.hij("Horarios seleccionados: (",n.mensajeHorarios,")")}}function k(o,a){if(1&o&&(t.TgZ(0,"div"),t.YNc(1,Z,1,2,"p-multiSelect",22),t.YNc(2,w,1,2,"ng-template",null,23,t.W1O),t.YNc(4,T,2,1,"span",12),t.qZA()),2&o){const n=t.MAs(3),i=t.oxw(2);t.xp6(1),t.Q6J("ngIf","S\xe1bado"!=i.diaSemana)("ngIfElse",n),t.xp6(3),t.Q6J("ngIf",""!=i.mensajeHorarios)}}function U(o,a){if(1&o){const n=t.EpF();t.TgZ(0,"button",8),t.NdJ("click",function(){t.CHM(n);const e=t.oxw(2);return t.KtG(e.darDeAltaHorario())}),t._uU(1,"Agregar"),t.qZA()}}function S(o,a){if(1&o){const n=t.EpF();t.TgZ(0,"button",8),t.NdJ("click",function(){t.CHM(n);const e=t.oxw(2);return t.KtG(e.editarHorario())}),t._uU(1,"Editar"),t.qZA()}}function I(o,a){if(1&o){const n=t.EpF();t.TgZ(0,"button",25),t.NdJ("click",function(){t.CHM(n);const e=t.oxw(2);return t.KtG(e.borrarHorario())}),t._uU(1,"Eliminar"),t.qZA()}}function J(o,a){if(1&o){const n=t.EpF();t.TgZ(0,"div",13),t.YNc(1,H,7,3,"div",12),t.YNc(2,y,2,1,"h3",12),t.YNc(3,k,5,3,"div",12),t.TgZ(4,"div"),t.YNc(5,U,2,0,"button",14),t.YNc(6,S,2,0,"button",14),t.YNc(7,I,2,0,"button",15),t.TgZ(8,"button",16),t.NdJ("click",function(){t.CHM(n);const e=t.oxw();return t.KtG(e.cambiarAccion("ver",""))}),t._uU(9,"Cancelar"),t.qZA()()()}if(2&o){const n=t.oxw();t.xp6(1),t.Q6J("ngIf","alta"==n.accion),t.xp6(1),t.Q6J("ngIf","editar-eliminar"==n.accion),t.xp6(1),t.Q6J("ngIf",""!=n.diaSemana),t.xp6(2),t.Q6J("ngIf","alta"==n.accion&&""!=n.mensajeHorarios),t.xp6(1),t.Q6J("ngIf","editar-eliminar"==n.accion&&""!=n.mensajeHorarios),t.xp6(1),t.Q6J("ngIf","editar-eliminar"==n.accion)}}let N=(()=>{class o{constructor(n,i,e){this.spinner=n,this.autenticacion=i,this.firestore=e,this.horariosSabados=this.inicializarHorario("S\xe1bado"),this.horariosDiaSemana=this.inicializarHorario("Lunes"),this.diasSemana=["Lunes","Martes","Miercoles","Jueves","Viernes","S\xe1bado"],this.diasRestantes=["Lunes","Martes","Miercoles","Jueves","Viernes","S\xe1bado"],this.diaSemana="",this.horarios=[],this.mensajeHorarios="",this.horarioUsuario=null,this.accion="ver"}ngOnInit(){var n=this;return(0,_.Z)(function*(){n.horarioUsuario=yield n.firestore.obtenerHorarioUsuario(n.autenticacion.usuarioActual.uid),console.log(n.horarioUsuario),null!=n.horarioUsuario&&0!=n.horarioUsuario?.diasHorarios.length?n.eliminarDiasRestantes():n.horarioUsuario=null})()}eliminarDiasRestantes(){if(null!=this.horarioUsuario)for(let n=0;n<this.horarioUsuario.diasHorarios.length;n++)this.diasRestantes.splice(this.diasRestantes.indexOf(this.horarioUsuario.diasHorarios[n].dia),1)}lanzarSpinner(n){var i=this;return(0,_.Z)(function*(){i.spinner.show(),setTimeout(()=>{i.spinner.hide()},n)})()}darDeAltaHorario(){var n=this;this.spinner.show(),setTimeout((0,_.Z)(function*(){let i,e;null!=n.horarioUsuario?(e=n.horarioUsuario.diasHorarios,i=n.asignarDisponibilidad(n.inicializarHorario(n.diaSemana)),e.push({dia:n.diaSemana,horarios:i}),n.horarioUsuario={uid:n.autenticacion.usuarioActual.uid,diasHorarios:e},yield n.firestore.editarHorarios(n.horarioUsuario.uid,n.horarioUsuario.diasHorarios)):(i=n.asignarDisponibilidad(n.inicializarHorario(n.diaSemana)),e=[{dia:n.diaSemana,horarios:i}],n.horarioUsuario={uid:n.autenticacion.usuarioActual.uid,diasHorarios:e},yield n.firestore.agregarHorarios(n.horarioUsuario)),n.diasRestantes.splice(n.diasRestantes.indexOf(n.diaSemana),1),n.cambiarAccion("ver",""),n.spinner.hide()}),500)}editarHorario(){let n=this.asignarDisponibilidad(this.inicializarHorario(this.diaSemana)),i=this.buscarHorario(this.diaSemana);null!=i&&null!=this.horarioUsuario&&(this.horarioUsuario.diasHorarios[i].horarios=n,this.firestore.editarHorarios(this.autenticacion.usuarioActual.uid,this.horarioUsuario.diasHorarios)),this.cambiarAccion("ver","")}buscarHorario(n){if(null!=this.horarioUsuario)for(let i=0;i<this.horarioUsuario.diasHorarios.length;i++)if(n==this.horarioUsuario.diasHorarios[i].dia)return i;return null}borrarHorario(){let n=this.buscarHorario(this.diaSemana);m().fire({title:"\xbfEst\xe1s seguro qu\xe9 quieres borrar los horarios del d\xeda "+this.diaSemana+"?",showCancelButton:!0,confirmButtonText:"Eliminar"}).then(i=>{i.isConfirmed&&null!=n&&null!=this.horarioUsuario&&(this.horarioUsuario.diasHorarios.splice(n,1),this.firestore.editarHorarios(this.autenticacion.usuarioActual.uid,this.horarioUsuario.diasHorarios),0==this.horarioUsuario.diasHorarios.length&&(this.horarioUsuario=null),this.diasRestantes.push(this.diaSemana)),this.cambiarAccion("ver","")})}asignarDisponibilidad(n){for(let i=0;i<this.horarios.length;i++)for(let e=0;e<n.length;e++)if(this.horarios[i].hora==n[e].hora){n[e].estaActivo=!0;break}return n}cambiarAccion(n,i){this.spinner.show(),setTimeout(()=>{this.accion=n,"alta"==this.accion?this.reiniciarInputs():"editar-eliminar"==this.accion&&(this.diaSemana=i.dia),this.spinner.hide()},500)}reiniciarInputs(){this.horarios=[],this.mensajeHorarios="",this.diaSemana=""}mostrarHorarioSeleccionado(){this.mensajeHorarios=this.obtenerHorario()}obtenerHorario(){let n="";for(let i=0;i<this.horarios.length;i++)n+=this.horarios[i].hora,i!=this.horarios.length-1&&(n+="-");return n}inicializarHorario(n){return"S\xe1bado"==n?[{hora:"8:00",estaActivo:!1},{hora:"8:30",estaActivo:!1},{hora:"9:00",estaActivo:!1},{hora:"9:30",estaActivo:!1},{hora:"10:00",estaActivo:!1},{hora:"10:30",estaActivo:!1},{hora:"11:00",estaActivo:!1},{hora:"11:30",estaActivo:!1},{hora:"12:00",estaActivo:!1},{hora:"12:30",estaActivo:!1},{hora:"13:00",estaActivo:!1},{hora:"13:30",estaActivo:!1},{hora:"14:00",estaActivo:!1}]:[{hora:"8:00",estaActivo:!1},{hora:"8:30",estaActivo:!1},{hora:"9:00",estaActivo:!1},{hora:"9:30",estaActivo:!1},{hora:"10:00",estaActivo:!1},{hora:"10:30",estaActivo:!1},{hora:"11:00",estaActivo:!1},{hora:"11:30",estaActivo:!1},{hora:"12:00",estaActivo:!1},{hora:"12:30",estaActivo:!1},{hora:"13:00",estaActivo:!1},{hora:"13:30",estaActivo:!1},{hora:"14:00",estaActivo:!1},{hora:"14:30",estaActivo:!1},{hora:"15:00",estaActivo:!1},{hora:"15:30",estaActivo:!1},{hora:"16:00",estaActivo:!1},{hora:"16:30",estaActivo:!1},{hora:"17:00",estaActivo:!1},{hora:"17:30",estaActivo:!1},{hora:"18:00",estaActivo:!1}]}static#t=this.\u0275fac=function(i){return new(i||o)(t.Y36(C.t2),t.Y36(p.T),t.Y36(u.C))};static#n=this.\u0275cmp=t.Xpm({type:o,selectors:[["app-registrar-horarios"]],decls:9,vars:2,consts:[["lang","es"],["charset","UTF-8"],["name","viewport","content","width=device-width, initial-scale=1.0"],["class","lista-horarios",4,"ngIf"],["class","alta-horarios",4,"ngIf"],[1,"lista-horarios"],[4,"ngIf","ngIfElse"],["elseblock",""],[1,"btn","btn-lg","text-light","bg-primary",3,"click"],[4,"ngFor","ngForOf"],[3,"click"],[1,"mb-4",2,"color","white"],[4,"ngIf"],[1,"alta-horarios"],["class","btn btn-lg text-light bg-primary",3,"click",4,"ngIf"],["class","btn btn-lg text-light bg-secondary",3,"click",4,"ngIf"],[1,"btn","btn-lg","text-light","bg-danger",3,"click"],["for",""],["name","diaSemana","required","",1,"form-select","bg-primary",3,"ngModel","change","ngModelChange"],["value","",3,"disabled"],[3,"disabled","value",4,"ngFor","ngForOf"],[3,"disabled","value"],["name","hora","optionLabel","hora","placeholder","Elige una hora",3,"ngModel","options","ngModelChange","onChange",4,"ngIf","ngIfElse"],["elseblock2",""],["name","hora","optionLabel","hora","placeholder","Elige una hora",3,"ngModel","options","ngModelChange","onChange"],[1,"btn","btn-lg","text-light","bg-secondary",3,"click"]],template:function(i,e){1&i&&(t.TgZ(0,"html",0)(1,"head"),t._UZ(2,"meta",1)(3,"meta",2),t.TgZ(4,"title"),t._uU(5,"Registrar Horarios Especialista"),t.qZA()(),t.TgZ(6,"body"),t.YNc(7,P,7,2,"div",3),t.YNc(8,J,10,6,"div",4),t.qZA()()),2&i&&(t.xp6(7),t.Q6J("ngIf","ver"==e.accion),t.xp6(1),t.Q6J("ngIf","ver"!=e.accion))},dependencies:[l.sg,l.O5,s.YN,s.Kr,s.EJ,s.JJ,s.Q7,s.On,f.NU],styles:["body[_ngcontent-%COMP%]{background-color:#523c59af;border-radius:40px;overflow:hidden;margin:10px 100px;transition:.5s}.lista-horarios[_ngcontent-%COMP%]{height:800px;overflow-y:scroll;flex-wrap:wrap}table[_ngcontent-%COMP%]:hover{border:5px solid;border-color:#c300ff;cursor:pointer}.alta-horarios[_ngcontent-%COMP%]{height:400px}tr[_ngcontent-%COMP%]:first-child{background-color:#1c87c9;color:#fff}th[_ngcontent-%COMP%], td[_ngcontent-%COMP%]{padding:10px;border:1px solid #666}td[_ngcontent-%COMP%]{background-color:#fff}h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%]{color:#fff}table[_ngcontent-%COMP%]{width:50%;margin:30px auto;border-collapse:collapse;text-align:center}select[_ngcontent-%COMP%]{height:40px;width:300px;color:#fff}label[_ngcontent-%COMP%]{font-size:18px;color:#fff}div[_ngcontent-%COMP%]{margin-bottom:10px;margin-top:10px;margin-left:20px}span[_ngcontent-%COMP%]{color:#fff}button[_ngcontent-%COMP%]{margin-left:10px}"]})}return o})();function R(o,a){if(1&o&&(t.TgZ(0,"a",17),t._UZ(1,"img",18),t.qZA()),2&o){const n=t.oxw(2);t.s9C("href",n.firestore.datosUsuarioActual.imagenUno,t.LSH),t.xp6(1),t.s9C("src",n.firestore.datosUsuarioActual.imagenUno,t.LSH)}}function q(o,a){if(1&o&&(t.TgZ(0,"a",17),t._UZ(1,"img",18),t.qZA()),2&o){const n=t.oxw(3);t.s9C("href",n.firestore.datosUsuarioActual.imagenUno,t.LSH),t.xp6(1),t.s9C("src",n.firestore.datosUsuarioActual.imagenUno,t.LSH)}}function E(o,a){if(1&o){const n=t.EpF();t.TgZ(0,"i",21),t.NdJ("click",function(){t.CHM(n);const e=t.oxw(3);return t.KtG(e.cambiarValorBanderaImagen())}),t.qZA(),t.TgZ(1,"a",17),t._UZ(2,"img",18),t.qZA()}if(2&o){const n=t.oxw(3);t.xp6(1),t.s9C("href",n.firestore.datosUsuarioActual.imagenDos,t.LSH),t.xp6(1),t.s9C("src",n.firestore.datosUsuarioActual.imagenDos,t.LSH)}}function F(o,a){if(1&o){const n=t.EpF();t.YNc(0,q,2,2,"a",10),t.TgZ(1,"i",19),t.NdJ("click",function(){t.CHM(n);const e=t.oxw(2);return t.KtG(e.cambiarValorBanderaImagen())}),t.qZA(),t.YNc(2,E,3,2,"ng-template",null,20,t.W1O)}if(2&o){const n=t.MAs(3),i=t.oxw(2);t.Q6J("ngIf",i.flagImagen)("ngIfElse",n),t.xp6(1),t.Q6J("hidden",!i.flagImagen)}}function Q(o,a){if(1&o&&(t.TgZ(0,"div",23)(1,"p")(2,"span"),t._uU(3),t.qZA(),t._uU(4),t.qZA()()),2&o){const n=t.oxw().$implicit,i=t.oxw(2);t.xp6(3),t.hij("",i.formatearString(n.key)," "),t.xp6(1),t.hij(": ",i.obtenerValor(n.value),"")}}function Y(o,a){if(1&o&&(t.ynx(0),t.YNc(1,Q,5,2,"div",22),t.BQk()),2&o){const n=a.$implicit;t.xp6(1),t.Q6J("ngIf","imagenUno"!=n.key&&"imagenDos"!=n.key&&"uid"!=n.key)}}function z(o,a){if(1&o){const n=t.EpF();t.ynx(0),t.TgZ(1,"div",24)(2,"button",25),t.NdJ("click",function(){t.CHM(n);const e=t.oxw(2);return t.KtG(e.cambiarValorBanderaHorarios())}),t._uU(3,"Editar horarios"),t.qZA()(),t._UZ(4,"app-registrar-horarios",26),t.BQk()}if(2&o){const n=t.oxw(2);t.xp6(4),t.Q6J("hidden",n.flagHorarios)}}function D(o,a){if(1&o&&(t.TgZ(0,"div",6)(1,"div",7)(2,"div",8)(3,"div",9),t.YNc(4,R,2,2,"a",10),t.YNc(5,F,4,3,"ng-template",null,11,t.W1O),t.TgZ(7,"h1"),t._uU(8),t.qZA(),t.TgZ(9,"p"),t._uU(10),t.qZA()()()(),t.TgZ(11,"div",12),t._UZ(12,"div",8),t.TgZ(13,"div",8)(14,"div",13),t._uU(15),t.qZA(),t.TgZ(16,"div",14)(17,"h1"),t._uU(18,"Informaci\xf3n del usuario"),t.qZA(),t.TgZ(19,"div",6),t.YNc(20,Y,2,1,"ng-container",15),t.ALo(21,"keyvalue"),t.qZA()()()(),t.YNc(22,z,5,1,"ng-container",16),t.qZA()),2&o){const n=t.MAs(6),i=t.oxw();t.xp6(4),t.Q6J("ngIf","Paciente"!=i.firestore.datosUsuarioActual.tipoUsuario)("ngIfElse",n),t.xp6(4),t.AsE("",i.firestore.datosUsuarioActual.nombre," ",i.firestore.datosUsuarioActual.apellido,""),t.xp6(2),t.Oqu(i.autenticacion.usuarioActual.email),t.xp6(5),t.lnq(" Bienvenido a la clinica ",i.firestore.datosUsuarioActual.nombre," ",i.firestore.datosUsuarioActual.apellido," usuario de tipo ",i.firestore.datosUsuarioActual.tipoUsuario," "),t.xp6(5),t.Q6J("ngForOf",t.lcZ(21,10,i.firestore.datosUsuarioActual)),t.xp6(2),t.Q6J("ngIf","Especialista"==i.firestore.datosUsuarioActual.tipoUsuario)}}const j=[{path:"",component:(()=>{class o{constructor(n,i){this.autenticacion=n,this.firestore=i,this.flagImagen=!0,this.flagHorarios=!0}ngOnInit(){}cambiarValorBanderaImagen(){this.flagImagen=!this.flagImagen}cambiarValorBanderaHorarios(){this.flagHorarios=!this.flagHorarios}formatearString(n){return n}obtenerValor(n){return"boolean"==typeof n?n=n?"Si":"No":Array.isArray(n)&&(n=this.obtenerEspecialidad(n)),n}obtenerEspecialidad(n){let i="";for(let e=0;e<n.length;e++)i+=n[e].especialidad,e!=n.length-1&&(i+=",");return i}static#t=this.\u0275fac=function(i){return new(i||o)(t.Y36(p.T),t.Y36(u.C))};static#n=this.\u0275cmp=t.Xpm({type:o,selectors:[["app-mi-perfil"]],decls:10,vars:1,consts:[["lang","es"],["charset","UTF-8"],["name","viewport","content","width=device-width, initial-scale=1.0"],[1,"bg-dark"],[1,"container","bootstrap","snippets","bootdey"],["class","row",4,"ngIf"],[1,"row"],[1,"profile-nav","col-md-3"],[1,"panel"],[1,"user-heading","round",2,"background-color","#1023ca"],[3,"href",4,"ngIf","ngIfElse"],["elseblock",""],[1,"profile-info","col-md-9"],[1,"bio-graph-heading",2,"background-color","#1023ca"],[1,"card","panel-body","bio-graph-info",2,"background-color","#dddbb1","margin-top","10px"],[4,"ngFor","ngForOf"],[4,"ngIf"],[3,"href"],["alt","",3,"src"],[1,"arrow","right",3,"hidden","click"],["elseblock2",""],[1,"arrow","left",3,"click"],["class","bio-row",4,"ngIf"],[1,"bio-row"],["id","btnHorario"],[1,"btn","btn-lg","text-light",2,"background-color","#7a1299",3,"click"],[3,"hidden"]],template:function(i,e){1&i&&(t.TgZ(0,"html",0)(1,"head"),t._UZ(2,"meta",1)(3,"meta",2),t.TgZ(4,"title"),t._uU(5,"Document"),t.qZA()(),t.TgZ(6,"body",3)(7,"div",4),t.YNc(8,D,23,12,"div",5),t.qZA()()(),t._UZ(9,"router-outlet")),2&i&&(t.xp6(8),t.Q6J("ngIf",null!=e.firestore.datosUsuarioActual))},dependencies:[l.sg,l.O5,g.lC,N,l.Nd],styles:["body[_ngcontent-%COMP%]{color:#797979;padding:0!important;margin:0!important;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-font-smoothing:antialiased;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;min-height:90vh}.profile-nav[_ngcontent-%COMP%], .profile-info[_ngcontent-%COMP%]{margin-top:30px}.arrow[_ngcontent-%COMP%]{border:solid black;border-width:0 3px 3px 0;display:inline-block;padding:3px}.right[_ngcontent-%COMP%]{transform:rotate(-45deg);-webkit-transform:rotate(-45deg)}.left[_ngcontent-%COMP%]{transform:rotate(135deg);-webkit-transform:rotate(135deg)}i[_ngcontent-%COMP%]{cursor:pointer}#btnHorario[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex:auto}button[_ngcontent-%COMP%]{margin-top:10px;width:256px}.profile-nav[_ngcontent-%COMP%]   .user-heading[_ngcontent-%COMP%]{color:#fff;border-radius:4px 4px 0 0;-webkit-border-radius:4px 4px 0 0;padding:30px;text-align:center}.profile-nav[_ngcontent-%COMP%]   .user-heading.round[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{border-radius:50%;-webkit-border-radius:50%;border:10px solid rgba(255,255,255,.3);display:inline-block}.profile-nav[_ngcontent-%COMP%]   .user-heading[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:112px;height:112px;border-radius:50%;-webkit-border-radius:50%}.profile-nav[_ngcontent-%COMP%]   .user-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:22px;font-weight:300;margin-bottom:5px}.profile-nav[_ngcontent-%COMP%]   .user-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:12px}.profile-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin-top:1px}.profile-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{border-bottom:1px solid #ebeae6;margin-top:0;line-height:30px}.profile-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]:last-child{border-bottom:none}.profile-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]{border-radius:0;-webkit-border-radius:0;color:#89817f;border-left:5px solid #fff}.profile-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]:hover, .profile-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]:focus, .profile-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{background:#f8f7f5!important;border-left:5px solid #fbc02d;color:#89817f!important}.profile-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]:last-child > a[_ngcontent-%COMP%]:last-child{border-radius:0 0 4px 4px;-webkit-border-radius:0 0 4px 4px}.profile-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%] > i[_ngcontent-%COMP%]{font-size:16px;padding-right:10px;color:#bcb3aa}.r-activity[_ngcontent-%COMP%]{margin:6px 0 0;font-size:12px}.p-text-area[_ngcontent-%COMP%], .p-text-area[_ngcontent-%COMP%]:focus{border:none;font-weight:300;box-shadow:none;color:#c3c3c3;font-size:16px}.profile-info[_ngcontent-%COMP%]   .panel-footer[_ngcontent-%COMP%]{background-color:#f8f7f5;border-top:1px solid #e7ebee}.profile-info[_ngcontent-%COMP%]   .panel-footer[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#7a7a7a}.bio-graph-heading[_ngcontent-%COMP%]{color:#fff;text-align:center;font-style:italic;padding:40px 110px;border-radius:4px 4px 0 0;-webkit-border-radius:4px 4px 0 0;font-size:16px;font-weight:300}.bio-graph-info[_ngcontent-%COMP%]{color:#89817e}.bio-graph-info[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:22px;font-weight:300;margin:0 0 20px;font-weight:700;color:#000}.bio-row[_ngcontent-%COMP%]{width:50%;float:left;margin-bottom:10px;padding:0 15px}.bio-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{width:100px;color:#000;margin:3px;display:inline-block}.bio-chart[_ngcontent-%COMP%], .bio-desk[_ngcontent-%COMP%]{float:left}.bio-chart[_ngcontent-%COMP%]{width:40%}.bio-desk[_ngcontent-%COMP%]{width:60%}.bio-desk[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:15px;font-weight:400}.bio-desk[_ngcontent-%COMP%]   h4.terques[_ngcontent-%COMP%]{color:#4cc5cd}.bio-desk[_ngcontent-%COMP%]   h4.red[_ngcontent-%COMP%]{color:#e26b7f}.bio-desk[_ngcontent-%COMP%]   h4.green[_ngcontent-%COMP%]{color:#97be4b}.bio-desk[_ngcontent-%COMP%]   h4.purple[_ngcontent-%COMP%]{color:#caa3da}.file-pos[_ngcontent-%COMP%]{margin:6px 0 10px}.profile-activity[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-weight:300;margin-top:0;color:#c3c3c3}.summary-head[_ngcontent-%COMP%]{background:#ee7272;color:#fff;text-align:center;border-bottom:1px solid #ee7272}.summary-head[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-weight:300;text-transform:uppercase;margin-bottom:5px}.summary-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff9}ul.summary-list[_ngcontent-%COMP%]{display:inline-block;padding-left:0;width:100%;margin-bottom:0}ul.summary-list[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{display:inline-block;width:19.5%;text-align:center}ul.summary-list[_ngcontent-%COMP%] > li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%] > i[_ngcontent-%COMP%]{display:block;font-size:18px;padding-bottom:5px}ul.summary-list[_ngcontent-%COMP%] > li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]{padding:10px 0;display:inline-block;color:#818181}ul.summary-list[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{border-right:1px solid #eaeaea}ul.summary-list[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]:last-child{border-right:none}.activity[_ngcontent-%COMP%]{width:100%;float:left;margin-bottom:10px}.activity.alt[_ngcontent-%COMP%]{width:100%;float:right;margin-bottom:10px}.activity[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{float:left}.activity.alt[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{float:right}.activity[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .activity.alt[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{width:45px;height:45px;line-height:45px;border-radius:50%;-webkit-border-radius:50%;background:#eee;text-align:center;color:#fff;font-size:16px}.activity.terques[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{background:#8dd7d6}.activity.terques[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#8dd7d6}.activity.purple[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{background:#b984dc}.activity.purple[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#b984dc}.activity.blue[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{background:#90b4e6}.activity.blue[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#90b4e6}.activity.green[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{background:#aec785}.activity.green[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#aec785}.activity[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-top:0;font-size:16px}.activity[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:0;font-size:13px}.activity[_ngcontent-%COMP%]   .activity-desk[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .activity.alt[_ngcontent-%COMP%]   .activity-desk[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{float:left;font-size:18px;margin-right:10px;color:#bebebe}.activity[_ngcontent-%COMP%]   .activity-desk[_ngcontent-%COMP%]{margin-left:70px;position:relative}.activity.alt[_ngcontent-%COMP%]   .activity-desk[_ngcontent-%COMP%]{margin-right:70px;position:relative}.activity.alt[_ngcontent-%COMP%]   .activity-desk[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]{float:right;position:relative}.activity-desk[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%]{background:#F4F4F4;display:inline-block}.activity[_ngcontent-%COMP%]   .activity-desk[_ngcontent-%COMP%]   .arrow[_ngcontent-%COMP%]{border-right:8px solid #F4F4F4!important}.activity[_ngcontent-%COMP%]   .activity-desk[_ngcontent-%COMP%]   .arrow[_ngcontent-%COMP%]{border-bottom:8px solid transparent;border-top:8px solid transparent;display:block;height:0;left:-7px;position:absolute;top:13px;width:0}.activity-desk[_ngcontent-%COMP%]   .arrow-alt[_ngcontent-%COMP%]{border-left:8px solid #F4F4F4!important}.activity-desk[_ngcontent-%COMP%]   .arrow-alt[_ngcontent-%COMP%]{border-bottom:8px solid transparent;border-top:8px solid transparent;display:block;height:0;right:-7px;position:absolute;top:13px;width:0}.activity-desk[_ngcontent-%COMP%]   .album[_ngcontent-%COMP%]{display:inline-block;margin-top:10px}.activity-desk[_ngcontent-%COMP%]   .album[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{margin-right:10px}.activity-desk[_ngcontent-%COMP%]   .album[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:last-child{margin-right:0}"]})}return o})()}];let G=(()=>{class o{static#t=this.\u0275fac=function(i){return new(i||o)};static#n=this.\u0275mod=t.oAB({type:o});static#o=this.\u0275inj=t.cJS({imports:[g.Bz.forChild(j),g.Bz]})}return o})(),K=(()=>{class o{static#t=this.\u0275fac=function(i){return new(i||o)};static#n=this.\u0275mod=t.oAB({type:o});static#o=this.\u0275inj=t.cJS({imports:[l.ez,G,s.u5,f.q4]})}return o})()}}]);