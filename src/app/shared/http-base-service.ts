import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class HttpFactoryService {

    constructor(private http: HttpClient) { }

    public get<T>(url: string, params?: HttpParams): Observable<T> {
        return this.http.get<T>(url, { params }).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    public post<T>(url: string, body: any): Observable<T> {
        return this.http.post<T>(url, body).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    public put<T>(url: string, body: any): Observable<T> {
        return this.http.put<T>(url, body).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    public delete<T>(url: string): Observable<T> {
        return this.http.delete<T>(url).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {

            console.log(error);


            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }
}