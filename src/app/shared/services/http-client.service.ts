import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpExceptionHandlerService} from './http-exception-handler.service';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient,
              private config: ConfigService,
              private httpError: HttpExceptionHandlerService) {
  }

  public get(url: string, params?: any): Observable<any> {
    const httpParams = params ? new HttpParams({fromObject: params}) : undefined;
    return this.executeHttpRequest('GET', url, null, httpParams);
  }

  public post(url: string, data: any): Observable<any> {
    return this.executeHttpRequest('POST', url, data);
  }

  public put(url: string, data: any): Observable<any> {
    return this.executeHttpRequest('PUT', url, data);
  }

  public delete(url: string): Observable<any> {
    return this.executeHttpRequest('DELETE', url);
  }

  private executeHttpRequest(method: string, url: string, body?: any, params?: HttpParams): Observable<any> {
    const headers = this.buildHeaders();
    const resourceUrl = this.config.apiUrl.concat(url);
    const withCredentials = true;
    const options = {headers, body, params, withCredentials};

    return this.httpClient.request(method, resourceUrl, options).pipe(
      catchError((err: HttpErrorResponse) => throwError(this.httpError.handleError(err)))
    );
  }

  private buildHeaders(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });
  }
}
