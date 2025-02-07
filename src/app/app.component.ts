import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Planning-Poker-Angular-17';
}
