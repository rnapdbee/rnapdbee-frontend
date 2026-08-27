import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { animateClose, animateOpen } from '../../animations/open-close';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class NavbarComponent {
  protected readonly animateOpen = animateOpen;
  protected readonly animateClose = animateClose;

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
