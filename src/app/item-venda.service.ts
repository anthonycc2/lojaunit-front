import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ItemVenda } from './item-venda';
import { urlBase } from './path';

@Injectable({
  providedIn: 'root',
})
export class ItemVendaService {

  private urlItemVenda = urlBase + '/itemvenda';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getItensVenda(): Observable<ItemVenda[]> {
    return this.http.get<ItemVenda[]>(this.urlItemVenda + '/all')
      .pipe(
        tap(_ => console.log('retornadas itensVenda')),
        catchError(this.handleError<ItemVenda[]>('getItensVenda', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  /*getItemVenda(id: number): Observable<ItemVenda> {
    const url = `${this.urlItemVenda}/get/${id}`;
    return this.http.get<ItemVenda>(url).pipe(
      tap(_ => console.log(`retornada itemVenda id=${id}`)),
      catchError(this.handleError<ItemVenda>(`getItemVenda id=${id}`))
    );
  }    */

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addItemVenda(itemVenda: ItemVenda): Observable<ItemVenda> {
    return this.http.post<ItemVenda>(this.urlItemVenda + '/add', itemVenda, this.httpOptions).pipe(
      tap((newItemVenda: ItemVenda) => console.log(`Adicionada itemVenda/produto com id=${newItemVenda.id.produto.id}.`)),
      catchError(this.handleError<ItemVenda>('addItemVenda'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteItemVenda(itemVenda: ItemVenda | number): Observable<ItemVenda> {
    const idVenda = typeof itemVenda === 'number' ? itemVenda : itemVenda.id.venda.id;
    const idProduto = typeof itemVenda === 'number' ? itemVenda : itemVenda.id.produto.id;
    const url = `${this.urlItemVenda}/delete/${idVenda}/${idProduto}`;

    return this.http.delete<ItemVenda>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Deletado itemVenda/produto com id=${idProduto}.`)),
      catchError(this.handleError<ItemVenda>('deleteItemVenda'))
    );
  }

  /** PUT: update the hero on the server */
  /*updateItemVenda(itemVenda: ItemVenda): Observable<any> {
    const url = this.urlItemVenda + '/update/' + itemVenda.id;
    return this.http.put(url, itemVenda, this.httpOptions).pipe(
      tap(_ => console.log(`alterado itemVenda id=${itemVenda.id}`)),
      catchError(this.handleError<any>('updateItemVenda'))
    );
  }*/

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