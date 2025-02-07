import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show loader', () => {
    service.show();
    service.loading$.subscribe((value) => {
      expect(value).toBeTruthy();
    });
  });

  it('should hide loader', () => {
    service.hide();
    service.loading$.subscribe((value) => {
      expect(value).not.toBeTruthy();
    });
  });

});
