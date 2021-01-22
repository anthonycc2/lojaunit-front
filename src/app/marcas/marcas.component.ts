import { Component, OnInit, Input } from '@angular/core';
import { Marca } from '../marca';
import { MarcaService } from '../marca.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {
  marca: Marca;
  marcas: Marca[];

  constructor(private marcaService: MarcaService) { }

  ngOnInit() {
    this.marca = {
      id: 0,
      nome: '',
      descricao: ''
    };
    this.getMarcas();
  }

  getMarcas() {
    this.marcaService.getMarcas()
        .subscribe(marcas => this.marcas = marcas);
  }

  add(): void {
    this.marcaService.addMarca(this.marca)
    .subscribe(marca => {
      this.getMarcas();
    });  
    document.getElementById('nomeMarca').textContent = '';
    document.getElementById('descricaoMarca').textContent = '';
  }

  delete(marca: Marca): void {
    this.marcas = this.marcas.filter(h => h !== marca);
    this.marcaService.deleteMarca(marca).subscribe();
  }

}