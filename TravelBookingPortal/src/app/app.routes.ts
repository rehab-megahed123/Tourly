import {
  provideRouter,
  RouterModule,
  Routes,
  withRouterConfig,
} from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { HomeComponent } from './Pages/home/home.component';
import { TripPlannerComponent } from './Components/trip/trip-planner/trip-planner/trip-planner.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { adminGuard } from './core/Guards/admin.guard';
export const routes: Routes = [
  {
    path: 'Admin',
    loadComponent: () =>
      import('./Layouts/admin/admin.component').then((m) => m.AdminComponent),
    canActivate: [adminGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./Layouts/main/main.component').then((m) => m.MainComponent),
    children: [
      { path: '', redirectTo: 'Home', pathMatch: 'full' },
      { path: 'Home', component: HomeComponent },
      { path: 'Trip', component: TripPlannerComponent },
      {
        path: 'profile',
        loadComponent: () =>
          import('./Pages/user-profile/user-profile.component').then(
            (u) => u.UserProfileComponent
          ),
      },
      { path: 'Login', component: LoginComponent },
      { path: 'Register', component: RegisterComponent },
      {
        path: 'editprofile',
        loadComponent: () =>
          import('./Pages/edit-profile/edit-profile.component').then(
            (u) => u.EditProfileComponent
          ),
      },
      {
        path: 'aboutus',
        loadComponent: () =>
          import('./Pages/About Us/about-us.component').then(
            (u) => u.AboutUsComponent
          ),
      },
    ],
  },
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
