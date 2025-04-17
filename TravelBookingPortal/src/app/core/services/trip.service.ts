import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ITrip } from '../models/itrip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private _httpClientService: HttpClient) { }

  // Get all trips
  getAllTrips(): Observable<ITrip[]> {
    return this._httpClientService.get<ITrip[]>(`${environment.baseUrl}/api/Itinerary/get-all`);
  }

  getUserTrips(): Observable<ITrip[]> {
    return this._httpClientService.get<ITrip[]>(`${environment.baseUrl}/api/Itinerary/user`);
  }

  // Add a new trip
  addTrip(newTrip: ITrip): Observable<ITrip> {
    console.log('Sending new trip to API:', newTrip);
    return this._httpClientService.post<ITrip>(`${environment.baseUrl}/api/Itinerary/add`, newTrip);
  }

  // Edit a trip
  editTrip(updatedTrip: ITrip): Observable<any> {
    return this._httpClientService.put(`${environment.baseUrl}/api/Itinerary/edit`, updatedTrip);
  }

  // Delete a trip
  deleteTrip(userId: string, itineraryId: number): Observable<void> {
    return this._httpClientService.delete<void>(`${environment.baseUrl}/api/Itinerary/delete/${userId}/${itineraryId}`);
  }
}
