import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public production = false;
  public env = 'DEV';
  public apiUrl = '';

  constructor() {
    Object.assign(this, environment);
  }
}
