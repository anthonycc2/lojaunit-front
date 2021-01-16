import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
//import { CLIENTES } from '../clientes-colecao';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  /*cliente: Cliente = {
    id: 1,
    nome: 'Joao da Costa'
  };*/

  //clientes = CLIENTES;
  clientes: Cliente[];
  selectedCliente: Cliente;

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.getClientes();
  }

  onSelect(cliente: Cliente): void {
    this.selectedCliente = cliente;
    console.log(`ClientesComponent: selecionado o cliente id=${cliente.id}.`);
  }

  getClientes() {
    this.clienteService.getClientes()
        .subscribe(clientes => this.clientes = clientes);
  }

  add(cpf: string, nome: string, email: string): void {
    //console.log("nome que está chegando:" + nome);
    nome = nome.trim();
    cpf = cpf.trim();
    email = email.trim();
    if (!nome || !cpf || !email) { return; }
    this.clienteService.addCliente({ cpf, nome, email } as Cliente)
      .subscribe(cliente => {
        //this.clientes.push(cliente);
        this.getClientes();
      });  
  }

  delete(cliente: Cliente): void {
    this.clientes = this.clientes.filter(h => h !== cliente);
    this.clienteService.deleteCliente(cliente).subscribe();
  }

}