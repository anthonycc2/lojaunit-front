import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaDetalheComponent } from './marca-detalhe.component';

describe('MarcaDetalheComponent', () => {
  let component: MarcaDetalheComponent;
  let fixture: ComponentFixture<MarcaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcaDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
