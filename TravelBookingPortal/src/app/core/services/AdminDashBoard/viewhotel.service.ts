import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHotelAdmin } from '../../Interface/AdminDashBoard/IHotelAdmin';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ViewHotelService {

  constructor(private _httpClientService:HttpClient) {

  }
GetAllHotels():Observable<IHotelAdmin[]>{
return this._httpClientService.get<IHotelAdmin[]>(`${environment.baseUrl}/Admin/GetAllHotels`); // Adjust the endpoint as needed
}
AddNewHotel(hotelData:FormData):Observable<IHotelAdmin>{

return this._httpClientService.post<IHotelAdmin>(`${environment.baseUrl}/Admin/CreateHotel`, hotelData);
}
}
