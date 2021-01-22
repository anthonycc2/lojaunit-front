import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Marca } from './marca';
import { urlBase } from './path';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {

  private urlMarca = urlBase + '/marca';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.urlMarca + '/all')
      .pipe(
        tap(_ => console.log('retornadas marcas')),
        catchError(this.handleError<Marca[]>('getMarcas', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getMarca(id: number): Observable<Marca> {
    const url = `${this.urlMarca}/get/${id}`;
    return this.http.get<Marca>(url).pipe(
      tap(_ => console.log(`retornada marca id=${id}`)),
      catchError(this.handleError<Marca>(`getMarca id=${id}`))
    );
  }    

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addMarca(marca: Marca): Observable<Marca> {
    return this.http.post<Marca>(this.urlMarca + '/add', marca, this.httpOptions).pipe(
      tap((newMarca: Marca) => console.log(`Adicionada marca com id=${newMarca.id}.`)),
      catchError(this.handleError<Marca>('addMarca'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteMarca(marca: Marca | number): Observable<Marca> {
    const id = typeof marca === 'number' ? marca : marca.id;
    const url = `${this.urlMarca}/delete/${id}`;

    return this.http.delete<Marca>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Deletado marca id=${id}.`)),
      catchError(this.handleError<Marca>('deleteMarca'))
    );
  }

  /** PUT: update the hero on the server */
  updateMarca(marca: Marca): Observable<any> {
    const url = this.urlMarca + '/update/' + marca.id;
    return this.http.put(url, marca, this.httpOptions).pipe(
      tap(_ => console.log(`alterado marca id=${marca.id}`)),
      catchError(this.handleError<any>('updateMarca'))
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