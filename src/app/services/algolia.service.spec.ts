import { TestBed } from '@angular/core/testing';

import { AlgoliaService } from './algolia.service';

describe('AlgoliaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlgoliaService = TestBed.get(AlgoliaService);
    expect(service).toBeTruthy();
  });
});
