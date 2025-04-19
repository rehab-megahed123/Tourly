import {
  provideRouter,
  RouterModule,
  Routes,
  withRouterConfig,
} from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { HomeComponent } from './Pages/home/home.component';
import { ItineraryComponent } from './Pages/itinerary/itinerary.component';
import { AllDestinationsPageComponent } from './Pages/all-destinations-page/all-destinations-page.component';
import { SearchResultComponent } from './Pages/search-result/search-result.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { adminGuard } from './core/Guards/admin.guard';
import { PaymentSuccessComponent } from './Components/payment-success/payment-success.component';
import { PaymentFailureComponent } from './Components/payment-failure/payment-failure.component';
import { ContuctUsComponent } from './Pages/contuct-us/contuct-us.component';
import { authGuard } from './core/Guards/auth.guard';
import { nonAdminGuard } from './core/Guards/non-admin.guard';
import { ReviewPageComponent } from './Pages/review-page/review-page.component';

export const routes: Routes = [
  {
    path: 'Admin',
    loadComponent: () =>
      import('./Layouts/admin/admin.component').then((m) => m.AdminComponent),
    children: [
      {
        path: 'viewrooms',
        loadComponent: () =>
          import('./Components/AdminDashboard/view-rooms/view-rooms.component').then(
            (v) => v.ViewRoomsComponent
          ),
      },
      {
        path: 'addroom',
        loadComponent: () =>
          import('./Components/AdminDashboard/add-room/add-room.component').then(
            (r) => r.AddRoomComponent
          ),
      },
      {
        path: 'viewcities',
        loadComponent: () =>
          import('./Components/AdminDashboard/view-cities/view-cities.component').then(
            (r) => r.ViewCitiesComponent
          ),
      },
      {
        path: 'addcity',
        loadComponent: () =>
          import('./Components/AdminDashboard/add-city/add-city.component').then(
            (r) => r.AddCityComponent
          ),
      },
      {
        path: 'viewhotels',
        loadComponent: () =>
          import('./Components/AdminDashboard/view-hotels/view-hotels.component').then(
            (r) => r.ViewHotelsComponent
          ),
      },
      {
        path: 'addhotel',
        loadComponent: () =>
          import('./Components/AdminDashboard/add-hotel/add-hotel.component').then(
            (r) => r.AddHotelComponent
          ),
      },
      {
        path: 'viewusers',
        loadComponent: () =>
          import('./Components/AdminDashboard/view-users/view-users.component').then(
            (r) => r.ViewUsersComponent
          ),
      },
      {
        path: 'viewbookings',
        loadComponent: () =>
          import('./Components/AdminDashboard/view-bookings/view-bookings.component').then(
            (r) => r.ViewBookingsComponent
          ),
      },
    ],
    canActivate: [adminGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./Layouts/main/main.component').then((m) => m.MainComponent),
    children: [
      { path: '', redirectTo: 'Home', pathMatch: 'full' },
      { path: 'Home', component: HomeComponent },
      { path: 'AllDestinations', component: AllDestinationsPageComponent },
      { path: 'SearchResult', component: SearchResultComponent },
      { path: 'Payment', component: PaymentComponent },
      {
        path: 'Itinerary',
        component: ItineraryComponent,
        canActivate: [authGuard],
      },
      
      {
        path: 'profile',
        loadComponent: () =>
          import('./Pages/user-profile/user-profile.component').then(
            (u) => u.UserProfileComponent
          ),
        children: [
          {
            path: 'editprofile',
            loadComponent: () =>
              import('./Components/edit-profile/edit-profile.component').then(
                (u) => u.EditProfileComponent
              ),
          },
          {
            path: 'userbooking',
            loadComponent: () =>
              import('./Components/UserBooking/user-booking.component').then(
                (u) => u.UserBookingComponent
              ),
          },
          {
            path: 'userinfo',
            loadComponent: () =>
              import('./Components/user-info/user-info.component').then(
                (u) => u.UserInfoComponent
              ),
          },
        ],
      },
      { path: 'Login', component: LoginComponent },
      { path: 'Register', component: RegisterComponent },
      {
        path: 'aboutus',
        loadComponent: () =>
          import('./Pages/About Us/about-us.component').then(
            (u) => u.AboutUsComponent
          ),
      },
      { path: 'HotelReviews', component: ReviewPageComponent },
      { path: 'payment-success', component: PaymentSuccessComponent },
      { path: 'payment-failure', component: PaymentFailureComponent },
      { path: 'ContuctUs', component: ContuctUsComponent },
    ],
    // canActivate: [nonAdminGuard],
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
