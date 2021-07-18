import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckCategoryService {
  
  ROOT_URL = environment.rootUrl;
  BASE_URL = this.ROOT_URL + '/api/m';

  constructor(private http: HttpClient) { }

  get(term = "") {
    return this.http.get<any>(`${this.BASE_URL}/categories/categorySuggest?term=${term}`);
  }
}
