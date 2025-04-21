import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { animate, style, transition, trigger, query, stagger } from '@angular/animations';
import { Ireview } from '../../core/models/ireview';
import { ReviewService } from '../../core/services/review.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IcreateReview } from '../../core/models/icreate-review';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hotel-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-reviews.component.html',
  styleUrls: ['./hotel-reviews.component.css'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        query('.testimonial-card', [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          stagger(100, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
    trigger('formAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class HotelReviewsComponent implements OnInit {
  hotelName!: string;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  root: string = environment.baseUrl;
  reviews: Ireview[] = [];
  newReview: IcreateReview = {
    comment: '',
    rating: 0,
    hotelName: '',
    userId: localStorage.getItem('userId') ?? '',
  };

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.hotelName = params['hotelName'];
      this.newReview.hotelName = this.hotelName;

      this.reviewService.getByHotelName(this.hotelName).subscribe({
        next: (res) => {
          this.reviews = res;
        },
        error: (err) => {
          console.error('Error fetching reviews:', err);
        },
      });
    });
  }

  addReview(comment: string, rating: number) {
    if (!comment.trim() || rating < 1 || rating > 5) {
      alert('Please provide a valid comment and rating (1-5).');
      return;
    }

    this.newReview = {
      comment,
      rating,
      hotelName: this.hotelName,
      userId: localStorage.getItem('userId') ?? '',
    };

    this.reviewService.addReview(this.newReview).subscribe({
      next: (res) => {
        console.log('Review added successfully:', res);
        this.newReview = {
          comment: '',
          rating: 0,
          hotelName: this.hotelName,
          userId: localStorage.getItem('userId') ?? '',
        };
        this.reviewService.getByHotelName(this.hotelName).subscribe({
          next: (res) => (this.reviews = res),
          error: (err) => console.error('Error reloading reviews:', err),
        });
      },
      error: (err) => {
        console.error('Error adding review:', err);
        alert('Failed to add review. Please try again.');
      },
    });
  }

  ngAfterViewInit() {
    if (!this.scrollContainer) {
      console.error('Scroll container not found');
    }
  }

  scrollLeft() {
    if (this.scrollContainer) {
      const cardWidth = this.scrollContainer.nativeElement.querySelector('.testimonial-card')?.offsetWidth || 300;
      this.scrollContainer.nativeElement.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  }

  scrollRight() {
    if (this.scrollContainer) {
      const cardWidth = this.scrollContainer.nativeElement.querySelector('.testimonial-card')?.offsetWidth || 300;
      this.scrollContainer.nativeElement.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  }

  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push('★');
    }
    for (let i = rating; i < 5; i++) {
      stars.push('☆');
    }
    return stars;
  }

  onRatingChange(rating: number) {
    this.newReview.rating = rating;
  }
    // ... other code ...
    hoverRating: number = 0;

    onStarHover(rating: number) {
      this.hoverRating = rating;
    }

    onStarLeave() {
      this.hoverRating = 0;
    }
    // ... other code ...
  }
