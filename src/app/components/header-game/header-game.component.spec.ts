

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderGameComponent } from './header-game.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameService } from '@gameService';
import { gameServiceMock } from '../../mocks/services/game-service.mock';

describe('HeaderGameComponent', () => {
  let component: HeaderGameComponent;
  let fixture: ComponentFixture<HeaderGameComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ HeaderGameComponent, HttpClientTestingModule],
      providers : [
        {
          provide: GameService,
          useValue: gameServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
