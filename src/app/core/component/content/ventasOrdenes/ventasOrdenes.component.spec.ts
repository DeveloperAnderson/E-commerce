import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasOrdenesComponent } from './ventasOrdenes.component';

describe('VentasOrdenesComponent', () => {
  let component: VentasOrdenesComponent;
  let fixture: ComponentFixture<VentasOrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasOrdenesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
