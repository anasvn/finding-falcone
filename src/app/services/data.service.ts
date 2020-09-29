import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  public isLoading = new BehaviorSubject(false);
  private resultSource = new BehaviorSubject(null);
  latestResult = this.resultSource.asObservable();

  constructor(private readonly apiService: ApiService) { }

  getPlanets(): Observable<any> {
    return this.apiService.doGet('/planets');
  }

  getVehicles(): Observable<any> {
    return this.apiService.doGet('/vehicles');
  }

  getToken(): Observable<any> {
    return this.apiService.doPost('/token');
  }

  findFalcone(data: any): Observable<any> {
    return this.apiService.doPost('/find', data);
  }

  updateLatestResult(data): void {
    this.resultSource.next(data);
  }
}
