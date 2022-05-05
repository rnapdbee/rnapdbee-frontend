import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('slideDownUp', [
      transition(':enter', [style({ height: 0 }), animate(100)]),
      transition(':leave', [animate(100, style({ height: 0 }))]),
    ]),
  ]
})
export class NavbarComponent {
  menuExpanded = false;

  constructor(private readonly router: Router) { }

  toggleMenu() {
    this.menuExpanded = !this.menuExpanded;
  }

  isActive(path: string): boolean {
    if (this.router.url === `/${path}`) return true;
    return false;
  }
}
