import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IProfile } from '../../../core/Interface/Iprofile';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink,CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  isNavActive = false;
  isSticky = false;
  IsLoggedIn=false;
  @Input() profileImage:string|undefined;

constructor(private router:Router){}
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.IsLoggedIn=true;

    }
    else{
      this.IsLoggedIn=false;
    }
  }
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
  GotoProfile(){
this.router.navigate(['/profile']);
  }
}

