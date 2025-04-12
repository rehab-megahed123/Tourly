import { AfterViewInit, Component } from '@angular/core';
import { HeaderComponent } from "../../Components/header/header.component";
import { FooterComponent } from "../../Components/footer/footer.component";

@Component({
  selector: 'app-about-us',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent implements AfterViewInit {
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