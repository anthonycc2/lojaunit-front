import { Component, OnInit, Input } from '@angular/core';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  produto: Produto;
  produtos: Produto[];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.produto = {
      id: 0,
      nome: '',
      descricao: '',
      preco: 0,
      unidade: '',
      categoria: {
        id: 0,
        nome: '',
        ativo: false
      },
      fornecedor: {
        id: 0,
        nome: '',
        endereco: '',
        telefone: '',
        cnpj: '',
        email: ''
      },
      marca: {
        id: 0,
        nome: '',
        descricao: ''
      },
    };
    
    this.getProdutos();
  }

  getProdutos() {
    this.produtoService.getProdutos()
        .subscribe(produtos => this.produtos = produtos);
  }

  add(): void {
    this.produtoService.addProduto(this.produto)
    .subscribe(produto => {
      this.getProdutos();
    });  
    /*document.getElementById('cpfProduto').textContent='';
    document.getElementById('nomeProduto').textContent='';
    document.getElementById('emailProduto').textContent='';
    document.getElementById('dataNascimentoProduto').textContent='';
    document.getElementById('sexoProduto').textContent='';
    document.getElementById('apelidoProduto').textContent='';
    document.getElementById('nomeSocialProduto').textContent='';
    document.getElementById('telefoneProduto').textContent='';*/
  }

  delete(produto: Produto): void {
    this.produtos = this.produtos.filter(h => h !== produto);
    this.produtoService.deleteProduto(produto).subscribe();
  }

}