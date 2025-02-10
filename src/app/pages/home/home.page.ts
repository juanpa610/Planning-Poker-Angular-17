import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    sessionStorage.clear();
    setTimeout(() => {
      this.router.navigate(['/create-game']);
    }, 2000);
  }

}
