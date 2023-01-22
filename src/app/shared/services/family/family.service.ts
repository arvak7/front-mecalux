import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClientService} from '../http-client.service';


@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor(private http: HttpClientService) {
  }

  public fetchAll(): Observable<string[]> {
    return this.http.get(`api/v1/families`);
  }

  public fetchByFamily(family: string): Observable<string[]> {
    return this.http.get(`api/v1/families/${family}/racks`);
  }
}
