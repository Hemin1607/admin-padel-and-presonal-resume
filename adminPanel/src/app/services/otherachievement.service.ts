import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import {configData} from '../../environments/configData'


@Injectable()
export class OtherAchievementService {

	serverUrl : any = configData.apiUrl;
	  constructor(private http: HttpClient) {
	}
   
    public saveAchievement(userdata): Observable<any> {
      let headers = new HttpHeaders({
            'Authorization':  userdata.token
       });
      return this.http.post(this.serverUrl+`/OtherAchievement`,userdata,{
        headers:headers,
      }).pipe(
        map((res) => {
          return res['data'];
        }),
      catchError(this.handleError));
    } 

    public getAchievement(userdata): Observable<any> {
      let headers = new HttpHeaders({
            'Authorization':  userdata.token
          });
      return this.http.post(this.serverUrl+`/OtherAchievement/getOtherAchievement`,userdata,{headers:headers}).pipe(
        map((res) => {
          return res;
        }),
      catchError(this.handleError));
    } 

    private handleError(error) {
	    return throwError(error)
	}
}