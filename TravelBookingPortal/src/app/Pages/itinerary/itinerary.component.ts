import { Component } from '@angular/core';
import { TripPlannerComponent } from '../../Components/trip/trip-planner/trip-planner/trip-planner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-itinerary',
  imports: [TripPlannerComponent ,CommonModule],
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.css'
})
export class ItineraryComponent {

}
