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
    return this.http.get(`api/v1/warehouses`);
  }

  public fetch(uuid: string): Observable<Warehouse> {
    return this.http.get(`api/v1/warehouses/${uuid}`);
  }

  public save(data: Warehouse): Observable<Warehouse> {
    return this.http.post('api/v1/warehouses', data)
  } 

  public update(data: Warehouse): Observable<Warehouse> {
    return this.http.put('api/v1/warehouses', data)
  } 

  public delete(uuid: string): Observable<Warehouse> {
    return this.http.delete(`api/v1/warehouses/${uuid}`)
  } 
}
