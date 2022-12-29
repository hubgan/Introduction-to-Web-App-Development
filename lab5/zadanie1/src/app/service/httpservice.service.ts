import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError, retry } from 'rxjs/operators';
import { Photo } from '../models/photo';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  apiURL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getPosts(): Observable<Post> {
    return this.http.get<Post>(this.apiURL + '/posts')
      .pipe(catchError(this.handleError));
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(
      this.apiURL + '/posts',
      JSON.stringify(post),
      this.httpOptions
    ).pipe(catchError(this.handleError));
  }

  getPhotos(): Observable<Photo> {
    return this.http.get<Photo>(this.apiURL + '/photos')
      .pipe(catchError(this.handleError));
  }

  getPhoto(id: number): Observable<Photo> {
    return this.http.get<Photo>(this.apiURL + '/photos/' + id)
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
