import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from '../../../environments/environment';

@NgModule({
  declarations: [RegistroComponent],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MultiSelectModule,
    RecaptchaFormsModule,
    RecaptchaModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ]
})
export class RegistroModule { }
