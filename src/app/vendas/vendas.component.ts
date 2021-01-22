import { Component, OnInit, Input } from '@angular/core';
import { Venda } from '../venda';
import { VendaService } from '../venda.service';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {
  venda: Venda;
  vendas: Venda[];

  constructor(private vendaService: VendaService) { }

  ngOnInit() {
    this.venda = {
      id: 0,
      datahora: '',
      cliente: {
        id: 0,
        cpf: '',
        nome: '',
        email: '',
        dataNascimento: '',
        sexo: '',
        apelido: '',
        nomeSocial: '',
        telefone: ''
      },
      formaPagamento: {
        id: 0,
        forma: '',
        descricao: '',
        ativo: false
      },
      valor: 0
    };
    
    this.getVendas();
  }

  getVendas() {
    this.vendaService.getVendas()
        .subscribe(vendas => this.vendas = vendas);
  }

  add(): void {
    this.vendaService.addVenda(this.venda)
    .subscribe(venda => {
      this.getVendas();
    });  
    /*document.getElementById('cpfVenda').textContent='';
    document.getElementById('nomeVenda').textContent='';
    document.getElementById('emailVenda').textContent='';
    document.getElementById('dataNascimentoVenda').textContent='';
    document.getElementById('sexoVenda').textContent='';
    document.getElementById('apelidoVenda').textContent='';
    document.getElementById('nomeSocialVenda').textContent='';
    document.getElementById('telefoneVenda').textContent='';*/
  }

  delete(venda: Venda): void {
    this.vendas = this.vendas.filter(h => h !== venda);
    this.vendaService.deleteVenda(venda).subscribe();
  }

}