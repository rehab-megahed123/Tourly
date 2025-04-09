import { Component, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from "../../Components/header/header.component";
import { FooterComponent } from "../../Components/footer/footer.component";
import { HeroComponent } from "../../Components/hero/hero.component";
import { NavBarComponent } from "../../Components/Shared/navBar/nav-bar/nav-bar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [HeaderComponent, FooterComponent, HeroComponent, NavBarComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
constructor(private router:Router) { }
  backtohome(){
this.router.navigate(['/Home']);
  }
}
