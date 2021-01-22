import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaspagamentoComponent } from './formaspagamento.component';

describe('FormapagamentoComponent', () => {
  let component: FormaspagamentoComponent;
  let fixture: ComponentFixture<FormaspagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaspagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormaspagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
