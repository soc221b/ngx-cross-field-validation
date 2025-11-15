import { TestBed } from '@angular/core/testing';

import { NgxCrossFieldValidatorService } from './ngx-cross-field-validator.service';

describe('NgxCrossFieldValidatorService', () => {
  let service: NgxCrossFieldValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCrossFieldValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
