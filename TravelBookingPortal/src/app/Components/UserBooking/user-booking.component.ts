import { CommonModule, CurrencyPipe, DatePipe, SlicePipe } from '@angular/common';
import { Component, numberAttribute } from '@angular/core';
import { IBookingAdmin } from '../../core/Interface/AdminDashBoard/IBookingAdmin';
import { ViewBookingService } from '../../core/services/AdminDashBoard/viewbooking.service';
import { environment } from '../../../environments/environment.development';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-user-booking',
  imports: [DatePipe,CurrencyPipe,CommonModule],
  templateUrl: './user-booking.component.html',
  styleUrl: './user-booking.component.css'
})
export class UserBookingComponent {
bookings:IBookingAdmin[]=[]
  constructor(private _profileservice:ProfileService) {
  }

  ngOnInit(): void {
    const userId=localStorage.getItem('userId');
    if (userId) {
      this.GetUserBookings(userId);
    } else {
      console.error('User ID not found in local storage.');
    }
  }
  GetUserBookings(userId: string) {
    this._profileservice.GetbookingsByUserId(userId).subscribe((response)=>{
      this.bookings = response;
      console.log(this.bookings);
    },(error)=>{
      console.log(error);
    })
  }
  DeleteBooking(bookingId:number){
    console.log(bookingId);

    this._profileservice.DeleteBooking(bookingId).subscribe( (response)=>{
      console.log(response);
      const userId=localStorage.getItem('userId');
      if (userId) {
        this.GetUserBookings(userId);
      } else {
        console.error('User ID not found in local storage.');
      }
    },(error)=>{
      console.log(error);
    })
  }
}
