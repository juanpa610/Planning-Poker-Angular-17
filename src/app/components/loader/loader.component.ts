import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@loadingService';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements OnInit {

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading: Observable<boolean> = this.isLoadingSubject;

  constructor(private loadingService: LoadingService) {
    this.isLoading = this.loadingService.loading$;
  }

  ngOnInit() { }

}
