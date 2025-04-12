import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../Components/header/header.component";
import { FooterComponent } from "../../Components/footer/footer.component";
import { ProfileService } from '../../core/services/profile.service';
import { IProfile } from '../../core/Interface/Iprofile';

@Component({
  selector: 'app-about-us',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent implements AfterViewInit,OnInit {
ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.GetProfileByUserId(userId);
    } else {
      console.error('User ID not found in local storage.');
    }
  }
  profile: IProfile | undefined;
  constructor(private profileservice: ProfileService) {}
  GetProfileByUserId(userid: string) {
    this.profileservice.GetProfileByUserId(userid).subscribe({
      next: (response) => {
        this.profile = response;
        console.log('Profile loaded:', response);
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      },
    });
  }
  ngAfterViewInit(): void {
    const elements = document.querySelectorAll('.animated-image, .text-animated'); // نضيف النصوص مع الصور
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target); // نوقف المراقبة بعد الأنيميشن
          }
        });
      },
      { threshold: 0.3 } // الأنيميشن يشتغل لما 30% من العنصر يظهر
    );

    elements.forEach((element) => observer.observe(element)); // مراقبة كل العناصر
  }
}