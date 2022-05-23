import { animate, style, transition, trigger } from "@angular/animations";


export const OpenCloseAnimation = trigger('openClose', [
  transition(':enter', [style({ height: 0 }), animate(50)]),
  transition(':leave', [animate(50, style({ height: 0 }))]),
])
