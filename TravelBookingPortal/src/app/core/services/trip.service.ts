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

  // Get a specific trip
  getTripById(itineraryId: number): Observable<ITrip> {
    return this._httpClientService.get<ITrip>(`${environment.baseUrl}/api/Itinerary/get/${itineraryId}`);
  }

  // Add a new trip
  addTrip(newTrip: ITrip): Observable<ITrip> {
    console.log('Sending new trip to API:', newTrip); 
    return this._httpClientService.post<ITrip>(`${environment.baseUrl}/api/Itinerary/add`, newTrip);
  }

  // Edit a trip
  editTrip(userId: string, itineraryId: number, updatedTrip: ITrip): Observable<ITrip> {
    return this._httpClientService.put<ITrip>(`${environment.baseUrl}/api/Itinerary/edit/${userId}/${itineraryId}`, updatedTrip);
  }

  // Delete a trip
  deleteTrip(userId: string, itineraryId: number): Observable<void> {
    return this._httpClientService.delete<void>(`${environment.baseUrl}/api/Itinerary/delete/${userId}/${itineraryId}`);
  }
}
