import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { FormaPagamento } from './FormaPagamento';
import { urlBase } from './path';

@Injectable({
  providedIn: 'root',
})
export class FormapagamentoService {

  private urlFormapagamento = urlBase + '/formapagamento';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getFormaspagamento(): Observable<FormaPagamento[]> {
    return this.http.get<FormaPagamento[]>(this.urlFormapagamento + '/all')
      .pipe(
        tap(_ => console.log('retornadas formaspagamento')),
        catchError(this.handleError<FormaPagamento[]>('getFormaspagamento', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getFormapagamento(id: number): Observable<FormaPagamento> {
    const url = `${this.urlFormapagamento}/get/${id}`;
    return this.http.get<FormaPagamento>(url).pipe(
      tap(_ => console.log(`retornada formapagamento id=${id}`)),
      catchError(this.handleError<FormaPagamento>(`getFormapagamento id=${id}`))
    );
  }    

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addFormapagamento(formapagamento: FormaPagamento): Observable<FormaPagamento> {
    return this.http.post<FormaPagamento>(this.urlFormapagamento + '/add', formapagamento, this.httpOptions).pipe(
      tap((newFormapagamento: FormaPagamento) => console.log(`Adicionada formapagamento com id=${newFormapagamento.id}.`)),
      catchError(this.handleError<FormaPagamento>('addFormapagamento'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteFormapagamento(formapagamento: FormaPagamento | number): Observable<FormaPagamento> {
    const id = typeof formapagamento === 'number' ? formapagamento : formapagamento.id;
    const url = `${this.urlFormapagamento}/delete/${id}`;

    return this.http.delete<FormaPagamento>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Deletado formapagamento id=${id}.`)),
      catchError(this.handleError<FormaPagamento>('deleteFormapagamento'))
    );
  }

  /** PUT: update the hero on the server */
  updateFormapagamento(formapagamento: FormaPagamento): Observable<any> {
    const url = this.urlFormapagamento + '/update/' + formapagamento.id;
    return this.http.put(url, formapagamento, this.httpOptions).pipe(
      tap(_ => console.log(`alterado formapagamento id=${formapagamento.id}`)),
      catchError(this.handleError<any>('updateFormapagamento'))
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