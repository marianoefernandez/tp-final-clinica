import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('SesionesPage => HomePage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ top: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('800ms ease-out', style({ top: '100%' }))
        ]),
        query(':enter', [
          animate('800ms ease-out', style({ top: '0%' }))
        ]),
      ]),
    ]),
    transition('SesionesPage => BienvenidoPage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ top: '-100%' })
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('400ms ease-out', style({ top: '100%' }))
          ]),
          query(':enter', [
            animate('400ms ease-out', style({ top: '0%' }))
          ]),
        ]),
      ]),

      transition('BienvenidoPage => HomePage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ top: '100%' })
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('400ms ease-out', style({ top: '100%' }))
          ]),
          query(':enter', [
            animate('400ms ease-out', style({ top: '0%' }))
          ]),
        ]),
      ]),
    transition('HomePage => *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ top: '100%' })
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('800ms ease-out', style({ top: '-100%' }))
          ]),
          query(':enter', [
            animate('800ms ease-out', style({ top: '0%' }))
          ]),
        ]),
      ]),
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ top: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('400ms ease-out', style({ top: '100%', opacity: 0 }))
        ]),
        query(':enter', [
          animate('400ms ease-out', style({ top: '0%' }))
        ]),
        query('@*', animateChild())
      ]),
    ])
  ]);