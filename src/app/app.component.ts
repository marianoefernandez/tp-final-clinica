import { Component } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, Router, provideRouter } from '@angular/router';
import { cambioRuta } from './animaciones/cambio-ruta';
import { animacion } from './animaciones/prueba';
import { bootstrapApplication } from '@angular/platform-browser';
import {routes} from './app-routing.module'
import { provideAnimations } from '@angular/platform-browser/animations';
import { slideInAnimation } from './animaciones/slideInAnimation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:
  [
    cambioRuta,
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'tp-final-clinica';

  constructor(private router:Router,protected ruta:ActivatedRoute,private contexts: ChildrenOutletContexts)
  {
    
  }

  // intervalo = setInterval(() => {
  //   console.log(this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation']);
  // }, 1000);

  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}

bootstrapApplication(AppComponent,
  {
    providers:
    [
      provideRouter(routes),
      provideAnimations()
    ]
  }
)
