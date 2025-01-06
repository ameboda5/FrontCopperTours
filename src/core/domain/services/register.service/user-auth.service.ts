import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // URL de tu backend en NestJS

  constructor(private http: HttpClient) {}

  // Ejemplo de método para registrar un usuario
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, userData);
  }

  // Ejemplo de método para iniciar sesión
 // loginUser(credentials: any): Observable<any> {
  //  return this.http.post(`${this.apiUrl}/auth/login`, credentials);
 // }
}
