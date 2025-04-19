import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ireview } from '../../core/models/ireview';
import { ReviewService } from '../../core/services/review.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IcreateReview } from '../../core/models/icreate-review';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-hotel-reviews',
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-reviews.component.html',
  styleUrl: './hotel-reviews.component.css'
})
export class HotelReviewsComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  root:string=""

  reviews: Ireview[] = [];
  newReview: IcreateReview = {
    comment: '',
    rating: 0,
    hotelId: 2,
    userId: localStorage.getItem('userId') ?? ''
  };
  constructor(private reviewService: ReviewService) {

    this.root=`${environment.baseUrl}`;
  }

  ngOnInit(): void {
    const hotelId = 2; 
    this.reviewService.getByHotelId(hotelId).subscribe({
      next: (res) => {
        this.reviews = res;
      },
      error: (err) => {
        console.error('Error fetching reviews:', err);
      }
    });
  }

  addReview(comment: string, rating: number) {
    this.newReview = {comment:comment, rating: rating, hotelId: 2, userId: localStorage.getItem('userId') ?? ''}; // Example userId
  this.reviewService.addReview(this.newReview).subscribe({
    next: (res) => {
      console.log('Review added successfully:', res);
      this.reviews.push(res); // Add the new review to the list
    this.newReview
  = { comment: '', rating: 0, hotelId: 2, userId: localStorage.getItem('userId') ?? '' }; // Reset the form
      },
    error: (err) => {
      console.error('Error adding review:', err);
     }
  });

  }
  ngAfterViewInit() {
    if (!this.scrollContainer) {
      console.error('Scroll container not found');
    }
  }

  scrollLeft() {
    if (this.scrollContainer) {
      const cardWidth = this.scrollContainer.nativeElement.querySelector('.testimonial-card').offsetWidth;
      this.scrollContainer.nativeElement.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  }

  scrollRight() {
    if (this.scrollContainer) {
      const cardWidth = this.scrollContainer.nativeElement.querySelector('.testimonial-card').offsetWidth;
      this.scrollContainer.nativeElement.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  }
  getStars(rating: number): string[] {
    const stars = [];
    
    // إضافة النجوم الممتلئة
    for (let i = 0; i < rating; i++) {
      stars.push('★');
    }
  
    // إضافة النجوم الفارغة (لتكوين 5 نجوم)
    for (let i = rating; i < 5; i++) {
      stars.push('☆');
    }
  
    return stars;
  }
  
}