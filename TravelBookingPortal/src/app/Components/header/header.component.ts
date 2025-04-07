import {
  Component,
  Renderer2,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../../Pages/login/login.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, LoginComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isNavActive = false;
  isSticky = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isSticky = window.pageYOffset >= 200;
  }

  toggleNav() {
    this.isNavActive = !this.isNavActive;
  }

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
