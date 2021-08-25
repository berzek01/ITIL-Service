import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItilComponent } from './itil.component';

describe('ItilComponent', () => {
  let component: ItilComponent;
  let fixture: ComponentFixture<ItilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
