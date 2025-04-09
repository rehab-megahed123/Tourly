import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfile } from '../Interface/Iprofile';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
 GetProfileByUserId(userid:string):Observable<IProfile>{
    return this._httpClientService.get<IProfile>(`${environment.baseUrl}/user/${userid}`);
  }
  constructor(private _httpClientService:HttpClient) { }
UpdateProfile(profile:IProfile):Observable<IProfile>{ {
  return this._httpClientService.put<IProfile>(`${environment.baseUrl}/user`,profile);
}}}
