import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Categoria } from './categoria';
import { urlBase } from './path';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {

  private urlCategoria = urlBase + '/categoria';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET heroes from the server */
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlCategoria + '/all')
      .pipe(
        tap(_ => console.log('retornados categorias')),
        catchError(this.handleError<Categoria[]>('getCategorias', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getCategoria(id: number): Observable<Categoria> {
    const url = `${this.urlCategoria}/get/${id}`;
    return this.http.get<Categoria>(url).pipe(
      tap(_ => console.log(`retornado categoria id=${id}`)),
      catchError(this.handleError<Categoria>(`getCategoria id=${id}`))
    );
  }    

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.urlCategoria + '/add', categoria, this.httpOptions).pipe(
      tap((newCategoria: Categoria) => console.log(`Adicionado categoria com id=${newCategoria.id}.`)),
      catchError(this.handleError<Categoria>('addCategoria'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteCategoria(categoria: Categoria | number): Observable<Categoria> {
    const id = typeof categoria === 'number' ? categoria : categoria.id;
    const url = `${this.urlCategoria}/delete/${id}`;

    return this.http.delete<Categoria>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Deletado categoria id=${id}.`)),
      catchError(this.handleError<Categoria>('deleteCategoria'))
    );
  }

  /** PUT: update the hero on the server */
  updateCategoria(categoria: Categoria): Observable<any> {
    const url = this.urlCategoria + '/update/' + categoria.id;
    return this.http.put(url, categoria, this.httpOptions).pipe(
      tap(_ => console.log(`alterado categoria id=${categoria.id}`)),
      catchError(this.handleError<any>('updateCategoria'))
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