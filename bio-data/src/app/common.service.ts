import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map, catchError } from 'rxjs/operators';
import * as socketIo from 'socket.io-client';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import {configData} from '../environments/configData'


@Injectable()
export class CommonService {
	serverUrl : any = configData.apiUrl;
	  constructor(private http: HttpClient) {
	  
	}
    public getdata(dataname): Observable<any> {
      var userdata = {
        user_id : configData.user_id,
      }
      let headers = new HttpHeaders({
            'Authorization':  configData.token
      });
      return this.http.post(this.serverUrl+`/`+dataname,userdata,{headers:headers}).pipe(
        map((res) => {
          return res;
        }),
        catchError(this.handleError));
    }

    private handleError(error) {
	    console.error('server error:', error);
	    if (error.error instanceof Error) {
	        let errMessage = error.error.message;
	        return Observable.throw(errMessage);
	    }
	    return Observable.throw(error);
	}
}