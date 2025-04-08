import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../../core/services/room.service';

@Component({
  selector: 'app-packages',
  imports: [CommonModule],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css'
})
export class PackagesComponent implements OnInit {
  results: any;
  formData: any;
  constructor(private router: Router,private _roomService:RoomService) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as {
      formData: any,
      results: any
    };

    if (state) {
     
      this.results = state.results;
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
    }
    }
  


