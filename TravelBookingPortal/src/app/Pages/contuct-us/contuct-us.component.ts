import { Component } from '@angular/core';
import { HeaderComponent } from "../../Components/header/header.component";
import { FooterComponent } from "../../Components/footer/footer.component";

@Component({
  selector: 'app-contuct-us',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './contuct-us.component.html',
  styleUrl: './contuct-us.component.css'
})
export class ContuctUsComponent {

}
