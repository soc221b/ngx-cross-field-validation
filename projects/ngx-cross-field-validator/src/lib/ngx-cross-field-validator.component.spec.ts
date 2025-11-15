import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCrossFieldValidatorComponent } from './ngx-cross-field-validator.component';

describe('NgxCrossFieldValidatorComponent', () => {
  let component: NgxCrossFieldValidatorComponent;
  let fixture: ComponentFixture<NgxCrossFieldValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxCrossFieldValidatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxCrossFieldValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
