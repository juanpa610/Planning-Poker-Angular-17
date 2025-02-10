import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { GameService } from '@gameService';
import { FormUserComponent } from '../../components/form-user/form-user.component';
import { TableComponent } from '../../components/table/table.component';
import { CardOptionsComponent } from '../../components/card-options/card-options.component';
import { HeaderGameComponent } from '../../components/header-game/header-game.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormUserComponent, HeaderGameComponent, TableComponent, CardOptionsComponent ],
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrl: './game.page.scss',
})
export class GamePage implements OnInit {
  
  constructor( public gameService: GameService) {}

  ngOnInit() {}

}
