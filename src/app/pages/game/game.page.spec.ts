import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GamePage } from './game.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GamePage', () => {
  let component: GamePage;
  let fixture: ComponentFixture<GamePage>;

  beforeEach(async() => {

    await TestBed.configureTestingModule({
      imports: [ GamePage , HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(GamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
