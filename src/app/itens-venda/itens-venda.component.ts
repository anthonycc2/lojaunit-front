import { Component, OnInit, Input } from '@angular/core';
import { Produto } from '../produto';
import { Venda } from '../venda';
import { ItemVenda } from '../item-venda';
import { ItemVendaService } from '../item-venda.service';

@Component({
  selector: 'app-itens-venda',
  templateUrl: './itens-venda.component.html',
  styleUrls: ['./itens-venda.component.css']
})
export class ItensVendaComponent implements OnInit {
  itemVenda: ItemVenda;
  itensVenda: ItemVenda[];

  @Input() venda: Venda;
  produto: Produto;

  constructor(private itemVendaService: ItemVendaService) { }

  ngOnInit() {
    /*this.venda = {
      id: 0,
      datahora: '',
      cliente: null,
      formaPagamento: null,
      valor: 0
    };*/

    this.produto = {
      id: 0,
      nome: '',
      descricao: '',
      preco: 0,
      unidade: '',
      categoria: null,
      fornecedor: null,
      marca: null
    }
    
    this.itemVenda = {
      itemVendaId: {
        venda: this.venda,
        produto: this.produto,
      },
      quantidade: 0,
      valorUnitario: 0
    };
    
    this.getItensVenda();
  }

  getItensVenda() {
    this.itemVendaService.getItensVenda()
        .subscribe(itensVenda => this.itensVenda = itensVenda);
  }

  add(): void {
    this.itemVendaService.addItemVenda(this.itemVenda)
    .subscribe(itemVenda => {
      this.getItensVenda();
    });  
    /*document.getElementById('nomeItemVenda').textContent='';
    document.getElementById('enderecoItemVenda').textContent='';
    document.getElementById('telefoneItemVenda').textContent='';
    document.getElementById('cnpjItemVenda').textContent='';
    document.getElementById('emailItemVenda').textContent='';*/
  }

  delete(itemVenda: ItemVenda): void {
    this.itensVenda = this.itensVenda.filter(h => h !== itemVenda);
    this.itemVendaService.deleteItemVenda(itemVenda).subscribe();
  }

}