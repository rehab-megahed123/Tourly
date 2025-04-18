import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../Components/header/header.component";
import { FooterComponent } from "../../Components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contuct-us',
  imports: [HeaderComponent, FooterComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './contuct-us.component.html',
  styleUrl: './contuct-us.component.css'
})
export class ContuctUsComponent implements OnInit, AfterViewInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize reactive form
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Handle scroll animations
    this.animateOnScroll('.form-wrapper', 'animate-scale-fade');
    this.animateOnScroll('.form-group', 'animate-bounce');
    this.animateOnScroll('.text-container', 'animate-slide-right');
    this.animateOnScroll('.contact-info li', 'animate-pulse');
  }

  // Form submission
  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      // TODO: Call a service to send form data to backend
      // e.g., this.contactService.submitForm(this.contactForm.value).subscribe();
      this.contactForm.reset();
    }
  }

  // Scroll animation logic
  private animateOnScroll(selector: string, animationClass: string): void {
    // Skip animations if reduced motion is preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(element => observer.observe(element));
  }

}

