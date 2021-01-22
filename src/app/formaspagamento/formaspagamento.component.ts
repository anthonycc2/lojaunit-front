import { Component, OnInit, Input } from '@angular/core';
import { FormaPagamento } from '../FormaPagamento';
import { FormapagamentoService } from '../formapagamento.service';

@Component({
  selector: 'app-formaspagamento',
  templateUrl: './formaspagamento.component.html',
  styleUrls: ['./formaspagamento.component.css']
})
export class FormaspagamentoComponent implements OnInit {
  formapagamento: FormaPagamento;
  formaspagamento: FormaPagamento[];

  constructor(private formapagamentoService: FormapagamentoService) { }

  ngOnInit() {
    this.formapagamento = {
      id: 0,
      forma: '',
      descricao: '',
      ativo: false
    };
    this.getFormaspagamento();
  }

  getFormaspagamento() {
    this.formapagamentoService.getFormaspagamento()
        .subscribe(formaspagamento => this.formaspagamento = formaspagamento);
  }

  add(): void {
    this.formapagamentoService.addFormapagamento(this.formapagamento)
    .subscribe(formapagamento => {
      this.getFormaspagamento();
    });  
    document.getElementById('formaFormapagamento').textContent='';
    document.getElementById('descricaoFormapagamento').textContent='';
    document.getElementById('ativoFormapagamento').textContent='';
  }

  delete(formapagamento: FormaPagamento): void {
    this.formaspagamento = this.formaspagamento.filter(h => h !== formapagamento);
    this.formapagamentoService.deleteFormapagamento(formapagamento).subscribe();
  }

}