import { Component, OnInit, Input } from '@angular/core';
import { Fornecedor } from '../fornecedor';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit {
  fornecedor: Fornecedor;
  fornecedores: Fornecedor[];

  constructor(private fornecedorService: FornecedorService) { }

  ngOnInit() {
    this.fornecedor = {
      id: 0,
      nome: '',
      endereco: '',
      telefone: '',
      cnpj: '',
      email: ''
    };
    this.getFornecedores();
  }

  getFornecedores() {
    this.fornecedorService.getFornecedores()
        .subscribe(fornecedores => this.fornecedores = fornecedores);
  }

  add(): void {
    this.fornecedorService.addFornecedor(this.fornecedor)
    .subscribe(fornecedor => {
      this.getFornecedores();
    });  
    document.getElementById('nomeFornecedor').textContent='';
    document.getElementById('enderecoFornecedor').textContent='';
    document.getElementById('telefoneFornecedor').textContent='';
    document.getElementById('cnpjFornecedor').textContent='';
    document.getElementById('emailFornecedor').textContent='';
  }

  delete(fornecedor: Fornecedor): void {
    this.fornecedores = this.fornecedores.filter(h => h !== fornecedor);
    this.fornecedorService.deleteFornecedor(fornecedor).subscribe();
  }

}