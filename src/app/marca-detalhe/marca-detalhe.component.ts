import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Marca } from '../marca';
import { MarcaService } from '../marca.service';

@Component({
  selector: 'app-marca-detalhe',
  templateUrl: './marca-detalhe.component.html',
  styleUrls: [ './marca-detalhe.component.css' ]
})
export class MarcaDetalheComponent implements OnInit {
  marca: Marca;

  constructor(
    private route: ActivatedRoute,
    private marcaService: MarcaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMarca();
  }

  getMarca(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.marcaService.getMarca(id)
      .subscribe(marca => this.marca = marca);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.marcaService.updateMarca(this.marca)
      .subscribe(() => this.goBack());
  }
}