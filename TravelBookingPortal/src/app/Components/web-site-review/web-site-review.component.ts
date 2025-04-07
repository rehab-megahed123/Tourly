import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-web-site-review',
  imports: [],
  templateUrl: './web-site-review.component.html',
  styleUrl: './web-site-review.component.css'
})
export class WebSiteReviewComponent {
  @ViewChild('testimonialScrollContainer') testimonialScrollContainer!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  scrollLeft() {
    this.testimonialScrollContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.testimonialScrollContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }

}
