import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private usersUrl: string;
  private usersUrladd: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://192.168.1.74:8080/full';
    this.usersUrladd = 'http://192.168.1.74:8080/add';
  }

  public findAll(): Observable<String[]> {
    return this.http.get<String[]>(this.usersUrl);
  }

  public add(user: User) {
    const usr = {name: user.Name, email: user.Email, password: user.Password};
    this.http.post(this.usersUrladd, usr).subscribe(value => usr);
  }
}
