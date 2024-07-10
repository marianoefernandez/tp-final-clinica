import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './paginas/error/error.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import {AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from '../environments/environment';
import { TurnoscolorDirective } from './directivas/turnoscolor.directive';
import { NavbarDirective } from './directivas/navbar.directive';

const firebaseConfig = {
  apiKey: "AIzaSyAQcbxYDaaTa5gQya6GglbXHSrhD_22-ig",
  authDomain: "clinica-online-laboiv.firebaseapp.com",
  projectId: "clinica-online-laboiv",
  storageBucket: "clinica-online-laboiv.appspot.com",
  messagingSenderId: "236997059569",
  appId: "1:236997059569:web:ef51fe1275453ff2155a50"
};

@NgModule({
  declarations: 
  [
    AppComponent,
    ErrorComponent
  ],
  imports: 
  [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],  bootstrap: [AppComponent]
})
export class AppModule { }
