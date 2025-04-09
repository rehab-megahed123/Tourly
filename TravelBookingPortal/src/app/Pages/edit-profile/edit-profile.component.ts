import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';
import { IProfile } from '../../core/Interface/Iprofile';
import { NavBarComponent } from "../../Components/Shared/navbar/nav-bar.component";
import { FooterComponent } from "../../Components/footer/footer.component";

@Component({
  selector: 'app-edit-profile',
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  constructor(private router:Router,private profileservice:ProfileService) { }
  ngOnInit(): void {
    const userId = "a8d6064b-a3f7-48d7-8b5b-a9796276e898"
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
  UpdateProfile(profile: IProfile) {

    this.profileservice.UpdateProfile(profile).subscribe({
      next: (response) => {
        console.log('Profile updated successfully:', response);
      },
      error: (err) => {
        console.error('Error updating profile:', err);
      }
    });
  }
}
