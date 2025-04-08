import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IRegister } from '../Interface/iregister';
import { ILogin } from '../Interface/ilogin';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpClient: HttpClient) {}

  register(registerData: FormData): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}/Auth/register`,
      registerData
    );
  }
  login(loginUser: ILogin): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}/Auth/login`,
      loginUser
    );
  }

  authorized(): boolean {
    return localStorage.getItem('token') != null;
  }

  logout(): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/Auth/login`, {});
  }
}
