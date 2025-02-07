import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { LoadingService } from '@loadingService';
import { loadingServiceMock } from '../../mocks/services/loading-service.mock';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';


describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponent],
      providers: [
        { provide: LoadingService, useValue: loadingServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader when isLoading is true', () => {
    component.isLoading = of(true);
    fixture.detectChanges();
    const compiled = fixture.debugElement.query(By.css('[data-test-id="loader"]'));
    expect(compiled).toBeTruthy();
  });

  
  it('should NOT show loader when isLoading is false', () => {
    component.isLoading = of(false);
    fixture.detectChanges();
    const compiled = fixture.debugElement.query(By.css('[data-test-id="loader"]'));
    expect(compiled).not.toBeTruthy();
  });

});
