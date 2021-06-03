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
  private usersUrladd: string;
  constructor(private http: HttpClient) {
    this.usersUrl = 'http://192.168.1.74:8080/full';
    this.usersUrlch = 'http://192.168.1.74:8080/songs';
    this.usersUrladd = 'http://192.168.1.74:8080/addsongs';
  }

  public findAll(): Observable<String[]> {
    return this.http.get<String[]>(this.usersUrl);
  }

  public songs(login: String): Observable<User> {
    var url = this.usersUrlch + "/" + login;
    return this.http.get<User>(url);
  }

  public addsongs(arr: String[], login: String) {
    var url = this.usersUrladd + "/" + login;
    var songs = arr[0];
    for (var i = 1; i < arr.length; i++){
      songs = songs + ", " + arr[i];
    }
    this.http.post(url, songs).subscribe(value => songs);
  }
}
