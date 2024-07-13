import { Component } from '@angular/core';
import { AdminbarComponent } from "../adminPages/adminbar/adminbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminbarComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
