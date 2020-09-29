import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class ApiService {
  apiBaseUrl = environment.baseUrl;
  constructor(private readonly httpClient: HttpClient) { }
  /**
   * Common get function
   * @param path API url
   */
  doGet(path: string): Observable<any> {
    path = this.apiBaseUrl + path;
    return this.httpClient.get(path);
  }
  /**
   * Common post function
   * @param path API url
   * @param data Payload
   */
  doPost(path: string, data?: any): Observable<any> {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
    path = this.apiBaseUrl + path;
    return this.httpClient.post(path, data, options);
  }
}
