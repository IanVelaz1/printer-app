import { TestBed } from '@angular/core/testing';

import { NoteGenerationService } from './note-generation.service';

describe('NoteGenerationService', () => {
  let service: NoteGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
