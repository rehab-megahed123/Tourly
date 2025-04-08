import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
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
