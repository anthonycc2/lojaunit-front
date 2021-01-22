import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Categoria } from '../categoria';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-detalhe',
  templateUrl: './categoria-detalhe.component.html',
  styleUrls: [ './categoria-detalhe.component.css' ]
})
export class CategoriaDetalheComponent implements OnInit {
  categoria: Categoria;

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCategoria();
  }

  getCategoria(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.categoriaService.getCategoria(id)
      .subscribe(categoria => this.categoria = categoria);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.categoriaService.updateCategoria(this.categoria)
      .subscribe(() => this.goBack());
  }
}