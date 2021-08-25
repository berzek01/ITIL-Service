import { TestBed } from '@angular/core/testing';

import { ItilService } from './itil.service';

describe('ItilService', () => {
  let service: ItilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
