import { TestBed } from '@angular/core/testing';

import { TareasData } from './tareas-data';

describe('TareasData', () => {
  let service: TareasData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareasData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
