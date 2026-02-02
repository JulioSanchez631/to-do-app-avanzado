import { TestBed } from '@angular/core/testing';

import { FiltroServicio } from './filtro-servicio';

describe('FiltroServicio', () => {
  let service: FiltroServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltroServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
