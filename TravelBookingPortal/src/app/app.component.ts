import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { HeroComponent } from './Components/hero/hero.component';
import { PopularDestinationsComponent } from './Components/popular-destinations/popular-destinations.component';
import { PackagesComponent } from './Components/packages/packages.component';
import { GalleryComponent } from './Components/gallery/gallery.component';

import { GoTopComponent } from './Components/go-top/go-top.component';
import { ContactComponent } from './Components/contact/contact.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ToursearchComponent } from './Components/toursearch/toursearch.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'TravelBookingPortal';
}
