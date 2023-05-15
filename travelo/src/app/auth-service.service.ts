import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = 'http://localhost:8888/';

  constructor(private http: HttpClient) { }

  signup(email: string, password: string, username: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl + 'signup.php', { email: email, password: password, Name: username }, { headers: headers });
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl + 'login.php', { email: email, password: password }, { headers: headers });
  }

  logout(): void {
    // clear local storage or any other logout related tasks
  }
}
