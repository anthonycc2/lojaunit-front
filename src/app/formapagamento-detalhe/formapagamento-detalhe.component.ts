import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FormaPagamento } from '../FormaPagamento';
import { FormapagamentoService } from '../formapagamento.service';

@Component({
  selector: 'app-formapagamento-detalhe',
  templateUrl: './formapagamento-detalhe.component.html',
  styleUrls: [ './formapagamento-detalhe.component.css' ]
})
export class FormapagamentoDetalheComponent implements OnInit {
  formaPagamento: FormaPagamento;

  constructor(
    private route: ActivatedRoute,
    private formapagamentoService: FormapagamentoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getFormapagamento();
  }

  getFormapagamento(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.formapagamentoService.getFormapagamento(id)
      .subscribe(formaPagamento => this.formaPagamento = formaPagamento);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.formapagamentoService.updateFormapagamento(this.formaPagamento)
      .subscribe(() => this.goBack());
  }
}