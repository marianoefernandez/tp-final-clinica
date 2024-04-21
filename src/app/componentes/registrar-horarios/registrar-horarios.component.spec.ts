import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarHorariosComponent } from './registrar-horarios.component';

describe('RegistrarHorariosComponent', () => {
  let component: RegistrarHorariosComponent;
  let fixture: ComponentFixture<RegistrarHorariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarHorariosComponent]
    });
    fixture = TestBed.createComponent(RegistrarHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
