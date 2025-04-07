import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ITrip } from '../models/itrip';


@Injectable({
  providedIn: 'root'
})
export class TripService {
   getAllTrips():Observable<ITrip[]>{
      return this._httpClientService.get<ITrip[]>(`${environment.baseUrl}/api/Itinerary/get-all`)
    }

  constructor(private _httpClientService:HttpClient) { }
}
