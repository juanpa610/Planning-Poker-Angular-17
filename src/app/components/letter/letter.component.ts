import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-letter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './letter.component.html',
  styleUrl: './letter.component.scss',
})
export class LetterComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
