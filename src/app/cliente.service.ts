import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Cliente } from './cliente';
import { CLIENTES } from './clientes-colecao';
//import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  private url = 'http://localhost:8080/cliente';

  httpOptions = {
    //headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  //constructor(private messageService: MessageService, private http: HttpClient) { }
  constructor(private http: HttpClient) { }

  /*getClientes(): Observable<Cliente[]> {
    //this.messageService.add('ClienteService: fetched clientes');
    console.log('ClienteService: retornados todos os clientes.');
    return of(CLIENTES);
  }*/

  /** GET heroes from the server */
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url + '/all')
      .pipe(
        tap(_ => console.log('retornados clientes')),
        catchError(this.handleError<Cliente[]>('getClientes', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getClienteNo404<Data>(id: number): Observable<Cliente> {
    const url = `${this.url}/?id=${id}`; ////////////
    return this.http.get<Cliente[]>(url)
      .pipe(
        map(clientes => clientes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} cliente id=${id}`);
        }),
        catchError(this.handleError<Cliente>(`getCliente id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getCliente(id: number): Observable<Cliente> {
    const url = `${this.url}/get/${id}`;
    return this.http.get<Cliente>(url).pipe(
      tap(_ => console.log(`fetched cliente id=${id}`)),
      catchError(this.handleError<Cliente>(`getCliente id=${id}`))
    );
  }    

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url + '/add', cliente, this.httpOptions).pipe(
      tap((newCliente: Cliente) => console.log(`Adicionado cliente com id=${newCliente.id}.`)),
      catchError(this.handleError<Cliente>('addCliente'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteCliente(cliente: Cliente | number): Observable<Cliente> {
    const id = typeof cliente === 'number' ? cliente : cliente.id;
    const url = `${this.url}/delete/${id}`;
    console.log(`Deletando cliente ${id}`)

    return this.http.delete<Cliente>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Deletado cliente id=${id}.`)),
      catchError(this.handleError<Cliente>('deleteCliente'))
    );
  }

  /** PUT: update the hero on the server */
  updateCliente(cliente: Cliente): Observable<any> {
    const url = this.url + '/update/' + cliente.id;
    return this.http.put(url, cliente, this.httpOptions).pipe(
      tap(_ => console.log(`alterado cliente id=${cliente.id}`)),
      catchError(this.handleError<any>('updateCliente'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} falhou: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}