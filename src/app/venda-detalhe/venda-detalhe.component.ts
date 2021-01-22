import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Produto } from '../produto';
import { Venda } from '../venda';
import { ItemVenda } from '../item-venda';
import { VendaService } from '../venda.service';
import { ItemVendaService } from '../item-venda.service';

@Component({
  selector: 'app-venda-detalhe',
  templateUrl: './venda-detalhe.component.html',
  styleUrls: [ './venda-detalhe.component.css' ]
})
export class VendaDetalheComponent implements OnInit {
  venda: Venda;
  itemVenda: ItemVenda;
  itensVenda: ItemVenda[];
  produto: Produto;

  constructor(
    private route: ActivatedRoute,
    private vendaService: VendaService,
    private itemVendaService: ItemVendaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getVenda();
    //this.itemVenda.itemVendaId.venda = this.venda;
    this.getItensVenda();

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
    }
  }

  getVenda(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.vendaService.getVenda(id)
      .subscribe(venda => this.venda = venda);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.vendaService.updateVenda(this.venda)
      .subscribe(() => this.goBack());
  }

    getItensVenda() {
    this.itemVendaService.getItensVenda()
        .subscribe(itensVenda => this.itensVenda = itensVenda);
  }

  add(): void {
    this.itemVenda.itemVendaId.venda = this.venda;
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