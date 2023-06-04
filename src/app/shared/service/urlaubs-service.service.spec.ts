import { TestBed } from '@angular/core/testing';

import { UrlaubsServiceService } from './urlaubs-service.service';

describe('UrlaubsServiceService', () => {
  let service: UrlaubsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlaubsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
