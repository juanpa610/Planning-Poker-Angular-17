import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateGamePage } from './create-game.page';
import { GameService } from '@gameService';
import { gameServiceMock } from '../../mocks/services/game-service.mock';

describe('CreateGamePage', () => {
  let component: CreateGamePage;
  let fixture: ComponentFixture<CreateGamePage>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [CreateGamePage],
      providers: [
        { provide: GameService, useValue: gameServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
