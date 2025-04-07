import { Component, OnInit } from '@angular/core';
import { TripService } from '../../../../core/services/trip.service';
import { ITrip } from '../../../../core/models/itrip';


@Component({
  selector: 'app-trip-planner',
  imports: [],
  templateUrl: './trip-planner.component.html',
  styleUrl: './trip-planner.component.css'
})
export class TripPlannerComponent implements OnInit{
  trips:ITrip[]=[]
constructor(private _tripService:TripService){
  

}
ngOnInit(): void {
  this._tripService.getAllTrips().subscribe({
    next:(arr)=>{
      this.trips=arr
     
      console.log(this.trips)
      
     
    },
    error:()=>{}
  })
}

}


