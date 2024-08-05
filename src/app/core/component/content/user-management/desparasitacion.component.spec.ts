import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesparasitacionComponent } from './user-management.component';

describe('DesparasitacionComponent', () => {
  let component: DesparasitacionComponent;
  let fixture: ComponentFixture<DesparasitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesparasitacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesparasitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
