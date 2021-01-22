import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Fornecedor } from './fornecedor';
import { urlBase } from './path';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService {

  private urlFornecedor = urlBase + '/fornecedor';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.urlFornecedor + '/all')
      .pipe(
        tap(_ => console.log('retornadas fornecedores')),
        catchError(this.handleError<Fornecedor[]>('getFornecedores', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getFornecedor(id: number): Observable<Fornecedor> {
    const url = `${this.urlFornecedor}/get/${id}`;
    return this.http.get<Fornecedor>(url).pipe(
      tap(_ => console.log(`retornada fornecedor id=${id}`)),
      catchError(this.handleError<Fornecedor>(`getFornecedor id=${id}`))
    );
  }    

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.urlFornecedor + '/add', fornecedor, this.httpOptions).pipe(
      tap((newFornecedor: Fornecedor) => console.log(`Adicionada fornecedor com id=${newFornecedor.id}.`)),
      catchError(this.handleError<Fornecedor>('addFornecedor'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteFornecedor(fornecedor: Fornecedor | number): Observable<Fornecedor> {
    const id = typeof fornecedor === 'number' ? fornecedor : fornecedor.id;
    const url = `${this.urlFornecedor}/delete/${id}`;

    return this.http.delete<Fornecedor>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Deletado fornecedor id=${id}.`)),
      catchError(this.handleError<Fornecedor>('deleteFornecedor'))
    );
  }

  /** PUT: update the hero on the server */
  updateFornecedor(fornecedor: Fornecedor): Observable<any> {
    const url = this.urlFornecedor + '/update/' + fornecedor.id;
    return this.http.put(url, fornecedor, this.httpOptions).pipe(
      tap(_ => console.log(`alterado fornecedor id=${fornecedor.id}`)),
      catchError(this.handleError<any>('updateFornecedor'))
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