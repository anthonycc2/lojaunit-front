import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Cliente } from './cliente';
import { urlBase } from './path';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  private urlCliente = urlBase + '/cliente';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /*getClientes(): Observable<Cliente[]> {
    //this.messageService.add('ClienteService: fetched clientes');
    console.log('ClienteService: retornados todos os clientes.');
    return of(CLIENTES);
  }*/

  /** GET heroes from the server */
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlCliente + '/all')
      .pipe(
        tap(_ => console.log('retornados clientes')),
        catchError(this.handleError<Cliente[]>('getClientes', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getCliente(id: number): Observable<Cliente> {
    const url = `${this.urlCliente}/get/${id}`;
    return this.http.get<Cliente>(url).pipe(
      tap(_ => console.log(`retornado cliente id=${id}`)),
      catchError(this.handleError<Cliente>(`getCliente id=${id}`))
    );
  }    

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlCliente + '/add', cliente, this.httpOptions).pipe(
      tap((newCliente: Cliente) => console.log(`Adicionado cliente com id=${newCliente.id}.`)),
      catchError(this.handleError<Cliente>('addCliente'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteCliente(cliente: Cliente | number): Observable<Cliente> {
    const id = typeof cliente === 'number' ? cliente : cliente.id;
    const url = `${this.urlCliente}/delete/${id}`;

    return this.http.delete<Cliente>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Deletado cliente id=${id}.`)),
      catchError(this.handleError<Cliente>('deleteCliente'))
    );
  }

  /** PUT: update the hero on the server */
  updateCliente(cliente: Cliente): Observable<any> {
    const url = this.urlCliente + '/update/' + cliente.id;
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