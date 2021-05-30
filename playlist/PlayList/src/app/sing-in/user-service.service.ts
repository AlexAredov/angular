import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private usersUrl: string;
  private usersUrlch: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/full';
    this.usersUrlch = 'http://localhost:8080/check';
  }

  public findAll(): Observable<String[]> {
    return this.http.get<String[]>(this.usersUrl);
  }

  public check(login: String): Observable<User> {
    var url = this.usersUrlch + "/" + login;
    return this.http.get<User>(url);
  }
}
