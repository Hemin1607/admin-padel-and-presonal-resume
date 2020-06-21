import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import {configData} from '../../environments/configData'


@Injectable()
export class GalleryService {

	serverUrl : any = configData.apiUrl;
	  constructor(private http: HttpClient) {
	}


    public saveImage(userdata): Observable<any> {
      let headers = new HttpHeaders({
            'Authorization':  userdata.get('token')
       });
      return this.http.post(this.serverUrl+`/GalleryImage`,userdata,{
        headers:headers,
        reportProgress: true,
        observe: 'events'
      }).pipe(
        map((res) => {
          return res['body'];
        }),
      catchError(this.handleError));
    } 

    public getAllImage(userdata): Observable<any> {
      let headers = new HttpHeaders({
            'Authorization':  userdata.token
          });
      return this.http.post(this.serverUrl+`/GalleryImage/getData`,userdata,{headers:headers}).pipe(
        map((res) => {
          return res;
        }),
      catchError(this.handleError));
    }

    public  deleteIamge(userdata): Observable<any> {
      let headers = new HttpHeaders({
          'Authorization':  userdata.token
        });
      return this.http.post(this.serverUrl+`/GalleryImage/deleteIamge`,userdata,{headers:headers}).pipe(
        map((res) => {
          return res;
        }),
      catchError(this.handleError));
    }
     

    private handleError(error) {
	    return throwError(error)
	}
}