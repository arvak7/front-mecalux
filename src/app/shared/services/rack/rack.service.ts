import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClientService} from '../http-client.service';
import { Rack } from '../../models/rack.model';

@Injectable({
  providedIn: 'root'
})
export class RackService {

  constructor(private http: HttpClientService) {
  }

  public save(data: Rack): Observable<Rack> {
    return this.http.post('api/v1/racks', data)
  } 

}
