import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TripService } from '../../../../core/services/trip.service';
import { ITrip } from '../../../../core/models/itrip';
import { HeaderComponent } from '../../../header/header.component';
import { FooterComponent } from '../../../footer/footer.component';

@Component({
  selector: 'app-trip-planner',
  templateUrl: './trip-planner.component.html',
  styleUrls: ['./trip-planner.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,HeaderComponent,FooterComponent],
})
export class TripPlannerComponent implements OnInit {
  showForm = false;

  newTrip: ITrip = {
    itineraryId: 0,
    userId: '879f9552-01a1-468f-a57a-996819565976',
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    notes: '',
    done: false
  };

  tripList: ITrip[] = [];

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.loadTrips();
  }

  loadTrips() {
    this.tripService.getAllTrips().subscribe(
      (data) => {
        this.tripList = data.map(trip => ({
          ...trip,
          startDate: new Date(trip.startDate),
          endDate: new Date(trip.endDate)
        }));
      },
      (error) => {
        console.error('Error loading trips:', error);
      }
    );
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addTrip() {
    if (this.isFormValid()) {
      console.log('Adding new trip:', this.newTrip);
      this.tripService.addTrip(this.newTrip).subscribe(
        (data) => {
          console.log('Trip added successfully:', data);
          this.tripList.push(data);
          this.newTrip = { title: '', startDate: new Date(), endDate: new Date(), notes: '', itineraryId: 0, userId: 'your-user-id', done: false };  // إعادة تعيين النموذج
          this.showForm = false;
        },
        (error) => {
          console.error('Error adding trip:', error);
        }
      );
    } else {
      alert('Please fill out all fields correctly!');
    }
  }

  isFormValid(): boolean {
    return this.newTrip.title !== '' && this.newTrip.startDate && this.newTrip.endDate && this.newTrip.notes !== '';
  }

  deleteTrip(trip: ITrip) {
    this.tripService.deleteTrip(trip.userId, trip.itineraryId).subscribe(
      () => {
        this.tripList = this.tripList.filter(t => t.itineraryId !== trip.itineraryId);  // إزالة الرحلة المحذوفة من القائمة
      },
      (error) => {
        console.error('Error deleting trip:', error);
      }
    );
  }

  markAsDone(trip: ITrip) {
    trip.done = !trip.done;
  }
}
