import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Venda } from './venda';
import { urlBase } from './path';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class VendaService {

  private urlVenda = urlBase + '/venda';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET heroes from the server */
  getVendas(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.urlVenda + '/all')
      .pipe(
        tap(_ => console.log('retornados vendas')),
        catchError(this.handleError<Venda[]>('getVendas', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getVenda(id: number): Observable<Venda> {
    const url = `${this.urlVenda}/get/${id}`;
    return this.http.get<Venda>(url).pipe(
      tap(_ => console.log(`retornado venda id=${id}`)),
      catchError(this.handleError<Venda>(`getVenda id=${id}`))
    );
  }    

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addVenda(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(this.urlVenda + '/add', venda, this.httpOptions).pipe(
      tap((newVenda: Venda) => console.log(`Adicionado venda com id=${newVenda.id}.`)),
      catchError(this.handleError<Venda>('addVenda'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteVenda(venda: Venda | number): Observable<Venda> {
    const id = typeof venda === 'number' ? venda : venda.id;
    const url = `${this.urlVenda}/delete/${id}`;

    return this.http.delete<Venda>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Deletado venda id=${id}.`)),
      catchError(this.handleError<Venda>('deleteVenda'))
    );
  }

  /** PUT: update the hero on the server */
  updateVenda(venda: Venda): Observable<any> {
    const url = this.urlVenda + '/update/' + venda.id;
    return this.http.put(url, venda, this.httpOptions).pipe(
      tap(_ => console.log(`alterado venda id=${venda.id}`)),
      catchError(this.handleError<any>('updateVenda'))
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