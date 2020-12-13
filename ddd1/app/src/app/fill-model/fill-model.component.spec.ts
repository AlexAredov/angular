import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillModelComponent } from './fill-model.component';

describe('FillModelComponent', () => {
  let component: FillModelComponent;
  let fixture: ComponentFixture<FillModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
