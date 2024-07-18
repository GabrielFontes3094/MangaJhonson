import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-adminbar',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './adminbar.component.html',
  styleUrl: './adminbar.component.scss'
})
export class AdminbarComponent {

}
