import { TestBed } from '@angular/core/testing';

import { AtpService } from './atp.service';

describe('AtpService', () => {
  let service: AtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
