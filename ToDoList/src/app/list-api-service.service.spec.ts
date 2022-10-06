import { TestBed } from '@angular/core/testing';

import { ListApiServiceService } from './list-api-service.service';

describe('ListApiServiceService', () => {
  let service: ListApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
