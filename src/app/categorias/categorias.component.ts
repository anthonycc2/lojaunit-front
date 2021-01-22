import { Component, OnInit, Input } from '@angular/core';
import { Categoria } from '../categoria';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categoria: Categoria;
  categorias: Categoria[];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoria = {
      id: 0,
      nome: '',
      ativo: false
    };
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.getCategorias()
        .subscribe(categorias => this.categorias = categorias);
  }

  add(): void {
    this.categoriaService.addCategoria(this.categoria)
    .subscribe(categoria => {
      this.getCategorias();
    });  
    document.getElementById('nomeCategoria').textContent='';
    document.getElementById('ativoCategoria').textContent='';
  }

  delete(categoria: Categoria): void {
    this.categorias = this.categorias.filter(h => h !== categoria);
    this.categoriaService.deleteCategoria(categoria).subscribe();
  }

}