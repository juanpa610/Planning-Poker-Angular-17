

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardOptionsComponent } from './card-options.component';
import { GameService } from '@gameService';
import { gameServiceMock } from '../../mocks/services/game-service.mock';

describe('CardOptionsComponent', () => {
  let component: CardOptionsComponent;
  let fixture: ComponentFixture<CardOptionsComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ CardOptionsComponent ],
      providers :  [
        {
          provide: GameService,
          useValue: gameServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
