import { Component, OnInit } from '@angular/core';
import { ICityAdmin } from '../../../core/Interface/AdminDashBoard/ICityAdmin';
import { environment } from '../../../../environments/environment.development';
import {  ViewCityService } from '../../../core/services/AdminDashBoard/viewcity.service';

@Component({
  selector: 'app-view-cities',
  imports: [],
  templateUrl: './view-cities.component.html',
  styleUrl: './view-cities.component.css'
})
export class ViewCitiesComponent implements OnInit {
cities!:ICityAdmin[]
  root:string=""
  constructor(private _cityservice:ViewCityService) {
    this.root=`${environment.baseUrl}`;

  }
  ngOnInit(): void {
    this.GetAllCities();
  }

GetAllCities(){
  this._cityservice.GetAllCities().subscribe((response)=>{
    this.cities = response;

console.log(this.cities);
  },(error)=>{
    console.log(error);
  })
}
}
