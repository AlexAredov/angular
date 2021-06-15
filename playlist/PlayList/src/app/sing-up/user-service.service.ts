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
    this.usersUrl = 'https://playlist-ad.herokuapp.com/full';
    this.usersUrladd = 'https://playlist-ad.herokuapp.com/add';
  }

  public findAll(): Observable<String[]> {
    return this.http.get<String[]>(this.usersUrl);
  }

  public add(user: string) {
    //const usr = {name: user.Name, email: user.Email, password: user.Password};
    this.http.post(this.usersUrladd, user).subscribe(value => user);
  }
}
