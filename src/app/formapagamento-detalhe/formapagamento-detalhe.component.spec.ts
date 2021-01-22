import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormapagamentoDetalheComponent } from './formapagamento-detalhe.component';

describe('FormapagamentoDetalheComponent', () => {
  let component: FormapagamentoDetalheComponent;
  let fixture: ComponentFixture<FormapagamentoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormapagamentoDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormapagamentoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
