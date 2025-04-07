import { Component } from '@angular/core';
import { HeaderComponent } from "../../Components/header/header.component";
import { HeroComponent } from "../../Components/hero/hero.component";
import { ToursearchComponent } from "../../Components/toursearch/toursearch.component";
import { PopularDestinationsComponent } from "../../Components/popular-destinations/popular-destinations.component";
import { PackagesComponent } from "../../Components/packages/packages.component";
import { GalleryComponent } from "../../Components/gallery/gallery.component";
import { GoTopComponent } from "../../Components/go-top/go-top.component";
import { ContactComponent } from "../../Components/contact/contact.component";
import { FooterComponent } from "../../Components/footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HeroComponent, ToursearchComponent, PopularDestinationsComponent, PackagesComponent, GalleryComponent, GoTopComponent, ContactComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
