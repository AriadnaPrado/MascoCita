import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarRegistro } from './confirmar-registro';

describe('ConfirmarRegistro', () => {
  let component: ConfirmarRegistro;
  let fixture: ComponentFixture<ConfirmarRegistro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarRegistro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarRegistro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
