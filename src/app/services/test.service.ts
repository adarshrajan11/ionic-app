import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  ROOT_URL = environment.rootUrl;
  
  constructor( private http: HttpClient ) { }

  getPosts() {
    return this.http.get<any>(`${this.ROOT_URL}/posts`);
  }

}
