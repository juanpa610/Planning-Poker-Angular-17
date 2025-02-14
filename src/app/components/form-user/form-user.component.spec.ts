import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormUserComponent } from './form-user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingService } from '@loadingService';
import { loadingServiceMock } from '../../mocks/services/loading-service.mock';
import { GameService } from '@gameService';
import { gameServiceMock } from '../../mocks/services/game-service.mock';

describe('FormUserComponent', () => {
  let component: FormUserComponent;
  let fixture: ComponentFixture<FormUserComponent>;

  const localStorageMock = (() => {
    let store: Record<string, string> = {};
  
    return {
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      getItem:  (key: string) => {
        return store[key] || null;
      },
      removeItem: function (key: string) {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
  })();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUserComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: LoadingService, useValue: loadingServiceMock },
        { provide: GameService,  useValue: gameServiceMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    Object.defineProperty(window, 'sessionStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  afterEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch game Service if exist data in sessionStorage', () => {
    sessionStorage.setItem('userName', 'User Name');
    sessionStorage.setItem('gameName', 'Game Name');

    component.ngOnInit();

    expect(component.showModalUserForm).toBe(false);
    expect(gameServiceMock.setUserName).toHaveBeenCalledWith('User Name');
    expect(gameServiceMock.newGame).toHaveBeenCalledWith('Game Name');
  });

  it('should NOT call gameService if there is no data in sessionStorage', () => {
    component.ngOnInit();

    expect(component.showModalUserForm).toBe(true);
    expect(gameServiceMock.setUserName).not.toHaveBeenCalled();
    expect(gameServiceMock.newGame).not.toHaveBeenCalled();
  });

  it('should return true when formUser is valid', () => {
    const formUserMock = {
      userName : 'Pedrito',
      role : 'player'
    };
  
    const spySessionStorage = jest.spyOn(window.sessionStorage, 'setItem');

    component.formUser.patchValue(formUserMock);
    component.onSubmit();

    expect(component.formUser.valid).toBeTruthy();
    expect(loadingServiceMock.show).toBeCalled();
    expect(sessionStorage.getItem('userName')).toBe(formUserMock.userName);
    expect(spySessionStorage).toBeCalledWith('userName', formUserMock.userName);
  });


});
