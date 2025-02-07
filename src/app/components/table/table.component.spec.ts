import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameService } from '@gameService';
import { gameServiceMock } from '../../mocks/services/game-service.mock';


describe('TableComponent', () => {

  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [TableComponent, HttpClientTestingModule],
      providers : [
        {
          provide: GameService,
          useValue: gameServiceMock
        }
      ]
     
    }).compileComponents();
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});
