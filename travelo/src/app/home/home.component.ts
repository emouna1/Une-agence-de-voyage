import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Hotel } from '../hotel.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hotels: Hotel[];
  
  
  searchTerm: string = '';
  constructor(private hotelService: HotelService) {
    this.hotels = [];
  }

  ngOnInit(): void {
    this.hotelService.getHotels().subscribe(
      (hotels) => {
        this.hotels = hotels;
        console.log(this.hotels);
      }
    );}
    search(): void {
      this.hotelService.searchHotels(this.searchTerm).subscribe(hotels => {
        this.hotels = hotels;
      });
  }
}