import { Component, OnInit } from '@angular/core';
import { ICity } from '../../core/models/ICity';
import { CityService } from '../../core/services/city.service';


@Component({
  selector: 'app-popular-destinations',
  imports: [],
  templateUrl: './popular-destinations.component.html',
  styleUrl: './popular-destinations.component.css'
})
export class PopularDestinationsComponent implements OnInit {
  cities:ICity[] = []
  filterCities:ICity[] = []
  constructor(private _cityService:CityService){

  }
  ngOnInit(): void {
    this._cityService.getAllCities().subscribe({
      next:(arr)=>{
        this.cities=arr
        this.filterCities = arr.slice(0, 3);
        console.log(this.cities)
        console.log(this.filterCities)
       
      },
      error:()=>{}
    })
  }

}
