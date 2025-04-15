import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../../core/services/room.service';
import { IBookingRoom } from '../../core/models/ibooking-room';
import { BookingService } from '../../core/services/booking.service';
import { SignalRService } from '../../core/services/signal-r.service';


@Component({
  selector: 'app-packages',
  imports: [CommonModule],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css'
})
export class PackagesComponent implements OnInit   {
  bookingResult={
    "url":"",
    "bookingId":0,
  }
  
  bookingRoom: IBookingRoom = {
    userId: '',
    roomId: 0,
    checkIn: new Date(),
    checkOut: new Date(),
    totalPrice: 0
  };
  results: any;
  formData: any;
 
  constructor(private router: Router,private _roomService:RoomService,private _bookingService:BookingService, private signalRService: SignalRService) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as {
      formData: any,
      // results: any
    };

    if (state) {
     
      // this.results = state.results;
     
      this.formData = state.formData;
      
      console.log('Results:', this.results);
    }
    

  }
  ngOnInit(): void {
    this._roomService.getAvailableRooms(this.formData.city,this.formData.roomType,this.formData.checkIn,this.formData.checkOut).subscribe({
      next:(arr)=>{
        console.log(arr)
        this.results=arr
        
      }
      ,error:()=>{}
    })
    this.signalRService.startConnection();

   
    this.signalRService.onBookingStatusUpdate((roomId: number, status: string) => {
      console.log(`Room ${roomId} status updated to ${status}`);

      const room = this.results?.find((r: any) => r.roomId === roomId);
      if (room) {
        room.bookingStatus = status;
        room.isBookable = (status === 'Available');
      }
    });
  }
  
    
  
      
    
    
    bookRoom(RoomId:number,price:number) {
      this.bookingRoom.userId = localStorage.getItem('userId') ?? '';
      this.bookingRoom.roomId = RoomId;
      this.bookingRoom.checkIn = this.formData.checkIn;
      this.bookingRoom.checkOut = this.formData.checkOut;
      this.bookingRoom.totalPrice = price;
      
      console.log(this.bookingRoom);
      this._bookingService.bookRoom(this.bookingRoom).subscribe({
        next: (response) => {
          this.bookingResult=response
          console.log('Booking successful:', response);
          
          this.router.navigate(['/Payment'], {
            state: { paymentResponse: response} 
          });

          
        },
        error: (error) => {
          console.error('Booking failed:', error);
          
        }
      });
    }
      }
    
  


