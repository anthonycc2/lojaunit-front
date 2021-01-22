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
  cliente: Cliente;
  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.cliente = {
      id: 0,
      cpf: '',
      nome: '',
      email: '',
      dataNascimento: '',
      sexo: '',
      apelido: '',
      nomeSocial: '',
      telefone: ''
    };
    this.getClientes();
  }

  /*onSelect(cliente: Cliente): void {
    this.selectedCliente = cliente;
    console.log(`ClientesComponent: selecionado o cliente id=${cliente.id}.`);
  }*/

  getClientes() {
    this.clienteService.getClientes()
        .subscribe(clientes => this.clientes = clientes);
  }

  add(): void {
    this.clienteService.addCliente(this.cliente)
    .subscribe(cliente => {
      this.getClientes();
    });  
    document.getElementById('cpfCliente').textContent='';
    document.getElementById('nomeCliente').textContent='';
    document.getElementById('emailCliente').textContent='';
    document.getElementById('dataNascimentoCliente').textContent='';
    document.getElementById('sexoCliente').textContent='';
    document.getElementById('apelidoCliente').textContent='';
    document.getElementById('nomeSocialCliente').textContent='';
    document.getElementById('telefoneCliente').textContent='';
  }

  delete(cliente: Cliente): void {
    this.clientes = this.clientes.filter(h => h !== cliente);
    this.clienteService.deleteCliente(cliente).subscribe();
  }

}