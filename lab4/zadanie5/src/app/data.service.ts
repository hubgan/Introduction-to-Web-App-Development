import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('http://localhost:3000/cars')
      .pipe(catchError((error) => {
        console.log(error);
        return throwError('Could not fetch data');
      }));
  }
}
