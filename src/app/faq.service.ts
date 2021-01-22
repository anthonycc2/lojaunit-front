import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Faq } from './faq';
import { urlBase } from './path';

@Injectable({
  providedIn: 'root',
})
export class FaqService {

  private urlFaq = urlBase + '/faq';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET heroes from the server */
  getFaqs(): Observable<Faq[]> {
    return this.http.get<Faq[]>(this.urlFaq + '/all')
      .pipe(
        tap(_ => console.log('retornados faqs')),
        catchError(this.handleError<Faq[]>('getFaqs', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getFaq(id: number): Observable<Faq> {
    const url = `${this.urlFaq}/get/${id}`;
    return this.http.get<Faq>(url).pipe(
      tap(_ => console.log(`retornado faq id=${id}`)),
      catchError(this.handleError<Faq>(`getFaq id=${id}`))
    );
  }    

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addFaq(faq: Faq): Observable<Faq> {
    return this.http.post<Faq>(this.urlFaq + '/add', faq, this.httpOptions).pipe(
      tap((newFaq: Faq) => console.log(`Adicionado faq com id=${newFaq.id}.`)),
      catchError(this.handleError<Faq>('addFaq'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteFaq(faq: Faq | number): Observable<Faq> {
    const id = typeof faq === 'number' ? faq : faq.id;
    const url = `${this.urlFaq}/delete/${id}`;

    return this.http.delete<Faq>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Deletado faq id=${id}.`)),
      catchError(this.handleError<Faq>('deleteFaq'))
    );
  }

  /** PUT: update the hero on the server */
  updateFaq(faq: Faq): Observable<any> {
    const url = this.urlFaq + '/update/' + faq.id;
    return this.http.put(url, faq, this.httpOptions).pipe(
      tap(_ => console.log(`alterado faq id=${faq.id}`)),
      catchError(this.handleError<any>('updateFaq'))
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