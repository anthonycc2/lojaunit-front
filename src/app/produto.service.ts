import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Produto } from './produto';
import { urlBase } from './path';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {

  private urlProduto = urlBase + '/produto';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.urlProduto + '/all')
      .pipe(
        tap(_ => console.log('retornadas produtos')),
        catchError(this.handleError<Produto[]>('getProdutos', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getProduto(id: number): Observable<Produto> {
    const url = `${this.urlProduto}/get/${id}`;
    return this.http.get<Produto>(url).pipe(
      tap(_ => console.log(`retornada produto id=${id}`)),
      catchError(this.handleError<Produto>(`getProduto id=${id}`))
    );
  }    

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.urlProduto + '/add', produto, this.httpOptions).pipe(
      tap((newProduto: Produto) => console.log(`Adicionada produto com id=${newProduto.id}.`)),
      catchError(this.handleError<Produto>('addProduto'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteProduto(produto: Produto | number): Observable<Produto> {
    const id = typeof produto === 'number' ? produto : produto.id;
    const url = `${this.urlProduto}/delete/${id}`;

    return this.http.delete<Produto>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Deletado produto id=${id}.`)),
      catchError(this.handleError<Produto>('deleteProduto'))
    );
  }

  /** PUT: update the hero on the server */
  updateProduto(produto: Produto): Observable<any> {
    const url = this.urlProduto + '/update/' + produto.id;
    return this.http.put(url, produto, this.httpOptions).pipe(
      tap(_ => console.log(`alterado produto id=${produto.id}`)),
      catchError(this.handleError<any>('updateProduto'))
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