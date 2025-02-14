import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormUserComponent } from './form-user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingService } from '@loadingService';
import { loadingServiceMock } from '../../mocks/services/loading-service.mock';
import { GameService } from '@gameService';
import { gameServiceMock } from '../../mocks/services/game-service.mock';

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

describe('FormUserComponent', () => {
  let component: FormUserComponent;
  let fixture: ComponentFixture<FormUserComponent>;


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
    jest.useRealTimers();
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

  it('should return true when formUser is valid', () => {
    const formUserMock = {
      userName : '',
      role : 'player'
    };

    const spySessionStorage = jest.spyOn(window.sessionStorage, 'setItem');

    component.formUser.patchValue(formUserMock);
    component.onSubmit();

    expect(component.formUser.valid).not.toBeTruthy();
    expect(loadingServiceMock.show).not.toBeCalled();
    expect(sessionStorage.getItem('userName')).toBeNull();
    expect(spySessionStorage).not.toBeCalled();
  });

  it('should call loadingService hide method after timeout', () => {
    jest.useFakeTimers();
    
    const formUserMock = {
      userName : 'juanito',
      role : 'player'
    };

    component.formUser.patchValue(formUserMock);
    component.onSubmit();

    expect(gameServiceMock.setRoleUser).toBeCalled();
    jest.advanceTimersByTime(3000);

    expect(component.showModalUserForm).toEqual(false);
    expect(loadingServiceMock.hide).toBeCalled();
  });

  it('should return messages for validation if userName is invalid', () => {
    component.formUser.controls['userName'].setErrors({ required: true });
    expect(component.getUserNameError()).toBe('Por favor ingresa un nombre');

    component.formUser.controls['userName'].setErrors({ minlength: true });
    expect(component.getUserNameError()).toBe('Por favor ingresa minimo 5 caracteres');
    
    component.formUser.controls['userName'].setErrors({ maxlength: true });
    expect(component.getUserNameError()).toBe('Solo se permiten 20 caracteres');
 
    component.formUser.controls['userName'].setErrors({ pattern: true });
    expect(component.getUserNameError()).toBe('Solo se permiten 3 numeros');
 
    component.formUser.controls['userName'].setErrors(null);
    expect(component.getUserNameError()).toBe('');
  });

  it('should validate charaters in userName', () => {
    component.formUser.patchValue({ userName: 'Hola123 Ññ' });
    component.validateCharacterForm();
    expect(component.formUser.controls['userName'].value).toBe('Hola123 Ññ');
 
    component.formUser.patchValue({ userName: 'Us#er@name$' });
    component.validateCharacterForm();
    expect(component.formUser.controls['userName'].value).toBe('Username');

    component.formUser.patchValue({ userName: 'Hello 😊 World' });
    component.validateCharacterForm();
    expect(component.formUser.controls['userName'].value).toBe('Hello  World');

    component.formUser.patchValue({ userName: '' });
    component.validateCharacterForm();
    expect(component.formUser.controls['userName'].value).toBe('');

    component.formUser.patchValue({ userName: undefined });
    component.validateCharacterForm();
    expect(component.formUser.controls['userName'].value).toBe('');
  });

});
