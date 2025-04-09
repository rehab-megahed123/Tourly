import {
  provideRouter,
  RouterModule,
  Routes,
  withRouterConfig,
} from '@angular/router';
import { HeroComponent } from './Components/hero/hero.component';
import { PopularDestinationsComponent } from './Components/popular-destinations/popular-destinations.component';
import { PackagesComponent } from './Components/packages/packages.component';
import { GalleryComponent } from './Components/gallery/gallery.component';
import { ContactComponent } from './Components/contact/contact.component';
import { ApplicationConfig } from '@angular/core';
import { HomeComponent } from './Pages/home/home.component';
import { TripPlannerComponent } from './Components/trip/trip-planner/trip-planner/trip-planner.component';
import { UserProfileComponent } from './Pages/user-profile/user-profile.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';

export const routes: Routes = [
  {path:'',redirectTo:'Home',pathMatch:'full'} ,
    {path:'Home',component:HomeComponent} ,
    {path:'Trip',component:TripPlannerComponent} ,
    {path:'profile',loadComponent:()=>import('./Pages/user-profile/user-profile.component').then(u=>u.UserProfileComponent)},
    { path: 'Login', component: LoginComponent },
    { path: 'Register', component: RegisterComponent },


  ];
  export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(
        routes,
        withRouterConfig({
          onSameUrlNavigation: 'reload',
        })
      ),
    ],
  };
