import { TestBed } from '@angular/core/testing';

import { ProjectManagerGuard } from './project-manager.guard';

describe('ProjectManagerGuard', () => {
  let guard: ProjectManagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProjectManagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
