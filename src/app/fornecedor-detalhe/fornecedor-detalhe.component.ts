import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Fornecedor } from '../fornecedor';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedor-detalhe',
  templateUrl: './fornecedor-detalhe.component.html',
  styleUrls: [ './fornecedor-detalhe.component.css' ]
})
export class FornecedorDetalheComponent implements OnInit {
  fornecedor: Fornecedor;

  constructor(
    private route: ActivatedRoute,
    private fornecedorService: FornecedorService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getFornecedor();
  }

  getFornecedor(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.fornecedorService.getFornecedor(id)
      .subscribe(fornecedor => this.fornecedor = fornecedor);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.fornecedorService.updateFornecedor(this.fornecedor)
      .subscribe(() => this.goBack());
  }
}