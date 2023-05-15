
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from './hotel.model';

@Injectable({
   providedIn: 'root'})
   export class HotelService {
      private hotelsUrl = 'http://localhost:8888/app.php'; // Replace with your backend URL
   
      constructor(private http: HttpClient) { }
   
      getHotels(): Observable<Hotel[]> {
         return this.http.get<Hotel[]>(this.hotelsUrl);
      }
      private searchUrl = 'http://localhost:8888/searchHotels.php';
      searchHotels(searchTerm: string): Observable<Hotel[]> {
         return this.http.get<Hotel[]>(`${this.searchUrl}?description_like=${searchTerm}`);
       }
   }

   

   
   