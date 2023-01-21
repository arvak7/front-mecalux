import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClientService} from '../http-client.service';
import { Warehouse } from '../../models/warehouse.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClientService) {
  }

  public fetchAll(): Observable<Warehouse[]> {
    return this.http.get('api/v1/warehouse');
  }

  public fetch(uuid: string): Observable<Warehouse> {
    return this.http.get(`api/v1/warehouse/${uuid}`);
  }
}