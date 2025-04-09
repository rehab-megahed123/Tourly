import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../Components/header/header.component";
import { HeroComponent } from "../../Components/hero/hero.component";
import { ToursearchComponent } from "../../Components/toursearch/toursearch.component";
import { PopularDestinationsComponent } from "../../Components/popular-destinations/popular-destinations.component";
import { PackagesComponent } from "../../Components/packages/packages.component";
import { GalleryComponent } from "../../Components/gallery/gallery.component";
import { GoTopComponent } from "../../Components/go-top/go-top.component";
import { ContactComponent } from "../../Components/contact/contact.component";
import { FooterComponent } from "../../Components/footer/footer.component";
import { WebSiteReviewComponent } from "../../Components/web-site-review/web-site-review.component";
import { ProfileService } from '../../core/services/profile.service';
import { IProfile } from '../../core/Interface/Iprofile';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HeroComponent, ToursearchComponent, PopularDestinationsComponent, GalleryComponent, GoTopComponent, ContactComponent, FooterComponent, WebSiteReviewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
const userId ="a8d6064b-a3f7-48d7-8b5b-a9796276e898"
    if (userId) {
      this.GetProfileByUserId(userId);
    } else {
      console.error('User ID not found in local storage.');
    }

  }
profile:IProfile|undefined;
constructor(private profileservice:ProfileService) {

}
GetProfileByUserId(userid: string) {
  this.profileservice.GetProfileByUserId(userid).subscribe({
    next: (response) => {
      this.profile = response;
      console.log('Profile loaded:', response);
    },
    error: (err) => {
      console.error('Error fetching profile:', err);
    }
  });
}
}