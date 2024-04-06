import { TestBed } from '@angular/core/testing';

import { ModoNocturnoService } from './modo-nocturno.service';

describe('ModoNocturnoService', () => {
  let service: ModoNocturnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModoNocturnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
