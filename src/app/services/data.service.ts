import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { Pagination } from '../common/interfaces/pagination.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loading$: Observable<boolean> = this._loading$.asObservable();

  constructor(private _http: HttpClient) { }

  public getAllData(sort: Sort, pagination: Pagination): Observable<any> {
    this._loading$.next(true);
    return this._http.get(`${environment.API_URL}/search/issues`, {
      params: {
        q: 'repo:angular/components',
        sort: sort.active,
        order: sort.direction,
        page: pagination.page,
        per_page: pagination.per_page
      }
    }).pipe(finalize(() => this._loading$.next(false)));
  }
}
