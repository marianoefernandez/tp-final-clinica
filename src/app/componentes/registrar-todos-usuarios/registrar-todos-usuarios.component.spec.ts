import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTodosUsuariosComponent } from './registrar-todos-usuarios.component';

describe('RegistrarTodosUsuariosComponent', () => {
  let component: RegistrarTodosUsuariosComponent;
  let fixture: ComponentFixture<RegistrarTodosUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarTodosUsuariosComponent]
    });
    fixture = TestBed.createComponent(RegistrarTodosUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
