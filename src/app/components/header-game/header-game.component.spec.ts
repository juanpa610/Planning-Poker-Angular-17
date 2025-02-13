

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderGameComponent } from './header-game.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameService } from '@gameService';
import { gameServiceMock } from '../../mocks/services/game-service.mock';
import { By } from '@angular/platform-browser';

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

  it('should assign names through observables from game service', () => {
    gameServiceMock.setUserName('Mock Name');
    gameServiceMock.newGame('Mock name game');

    expect(component.userName).toBe('Mock Name');
    expect(component.gameName).toBe('Mock name game');
  });

  it('should return name capitalized of user', () => {
    gameServiceMock.setUserName('Juanito');

    const nameCapitalized = component.getAcronyUserName();
    expect(nameCapitalized).toBe('Ju');
  });

 
  it('should render user name with text uppercase in HTML', () => {
    gameServiceMock.setUserName('Pedro');
    const userNameHTML = fixture.debugElement.query(By.css('[class="header__user-acronym"]'));
    fixture.detectChanges();

    expect(userNameHTML.nativeElement.textContent).toBe('Pe');
    expect(userNameHTML.nativeElement.classList.contains('header__user-acronym')).toBe(true);
  });
  
  it('should show "Not name game" in "header__game-name-text" when name game is empty ', () => {
    const gameNameHTML = fixture.debugElement.query(By.css('[class="header__game-name-text"]'));
    fixture.detectChanges();

    expect(gameNameHTML.nativeElement.textContent).toBe('Not name game');
  });


});
