import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from "../../Components/header/header.component";
import { FooterComponent } from "../../Components/footer/footer.component";
import { HeroComponent } from "../../Components/hero/hero.component";
import { Router } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';
import { IProfile } from '../../core/Interface/Iprofile';
import { DatePipe } from '@angular/common';
import { NavBarComponent } from '../../Components/Shared/navbar/nav-bar.component';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-user-profile',
  imports: [FooterComponent, DatePipe, NavBarComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit{
 root:string=""
constructor(private router:Router,private profileservice:ProfileService) {
this.root=`${environment.baseUrl}`;
}
  ngOnInit(): void {
    const userId ="a8d6064b-a3f7-48d7-8b5b-a9796276e898"
    if (userId) {
      this.GetProfileByUserId(userId);
    } else {
      console.error('User ID not found in local storage.');
    }
  }
profile:IProfile|undefined;
  backtohome(){
this.router.navigate(['/Home']);
  }
  GetProfileByUserId(userid: string) {
    this.profileservice.GetProfileByUserId(userid).subscribe({
      next: (response) => {
        this.profile = response; // Assuming the API returns an array, take the first element
        console.log('Profile loaded:', response);
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });
}

GoToEditForm(){
  this.router.navigate(['/EditProfile']);
}
}
