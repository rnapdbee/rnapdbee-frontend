import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OpenCloseAnimation } from '../../animations/open-close';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [OpenCloseAnimation],
})
export class NavbarComponent {
  menuExpanded = false;

  constructor(private readonly router: Router) { }

  toggleMenu(): void {
    this.menuExpanded = !this.menuExpanded;
  }

  isActive(path: string): boolean {
    if (this.router.url === `/${path}`) {
      return true;
    }
    return false;
  }
}
