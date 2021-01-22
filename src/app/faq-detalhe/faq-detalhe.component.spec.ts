import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqDetalheComponent } from './faq-detalhe.component';

describe('FaqDetalheComponent', () => {
  let component: FaqDetalheComponent;
  let fixture: ComponentFixture<FaqDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
