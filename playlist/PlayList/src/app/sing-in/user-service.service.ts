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
    this.usersUrl = 'https://playlist-ad.herokuapp.com/full';
    this.usersUrlch = 'https://playlist-ad.herokuapp.com/check';
  }

  public findAll(): Observable<String[]> {
    return this.http.get<String[]>(this.usersUrl);
  }

  public check(login: String): Observable<User> {
    var url = this.usersUrlch + "/" + login;
    return this.http.get<User>(url);
  }
}
