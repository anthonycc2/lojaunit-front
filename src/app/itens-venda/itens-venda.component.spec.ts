import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensVendaComponent } from './itens-venda.component';

describe('ItensVendaComponent', () => {
  let component: ItensVendaComponent;
  let fixture: ComponentFixture<ItensVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItensVendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItensVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
