import { Component } from '@angular/core';
import { IHotelAdmin } from '../../../core/Interface/AdminDashBoard/IHotelAdmin';
import {  ViewHotelService } from '../../../core/services/AdminDashBoard/viewhotel.service';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-view-hotels',
  imports: [],
  templateUrl: './view-hotels.component.html',
  styleUrl: './view-hotels.component.css'
})
export class ViewHotelsComponent {
hotels!:IHotelAdmin[]
root:string=""
  constructor(private _hotelservice:ViewHotelService) {
    this.root=`${environment.baseUrl}`;

  }
  ngOnInit(): void {
    this.GetAllHotels();
  }

GetAllHotels(){
  this._hotelservice.GetAllHotels().subscribe((response)=>{
    this.hotels = response;

console.log(this.hotels);
  },(error)=>{
    console.log(error);
  })
}
DeleteHotel(hotelId:number){
  console.log(hotelId);
  this._hotelservice.DeleteHotel(hotelId).subscribe( (response)=>{
    console.log(response);
this.GetAllHotels();
  },(error)=>{
    console.log(error);
  })
}
  }

