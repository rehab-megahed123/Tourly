import { CommonModule } from '@angular/common';
import {
  Component,
  Renderer2,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { IProfile } from '../../core/Interface/Iprofile';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isNavActive = false;
  isSticky = false;
  IsLoggedIn!: boolean;
  root: string = '';
  @Input() profile: IProfile | undefined;
  constructor(private router: Router, private _authServices: AuthService) {
    this.root = `${environment.baseUrl}`;
  }
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.IsLoggedIn = true;
    } else {
      this.IsLoggedIn = false;
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isSticky = window.pageYOffset >= 200;
  }

  logout() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this._authServices.logout(userId).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          this.router.navigate(['/Login']);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
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

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.isDropdownOpen = false;
    }
  }
}
