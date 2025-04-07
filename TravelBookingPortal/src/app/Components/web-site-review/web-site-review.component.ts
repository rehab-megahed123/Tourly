import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-web-site-review',
  imports: [],
  templateUrl: './web-site-review.component.html',
  styleUrl: './web-site-review.component.css'
})
export class WebSiteReviewComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

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
}
