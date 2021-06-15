import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private usersUrl: string;
  private usersUrl1: string;
  constructor(private http: HttpClient) {
    this.usersUrl = 'https://playlist-ad.herokuapp.com/mipost';
    this.usersUrl1 = 'https://playlist-ad.herokuapp.com/miget';
  }

  public mipost(arr: String[], login: String) {
    var url = this.usersUrl + "/" + login;
    var songs = arr[1];
    for (var i = 2; i < arr.length; i++){
      songs = songs + ", " + arr[i];
    }
    url = url + "/" + songs;
    console.log(url)
    this.http.post(url, "").subscribe();
  }

  public miget(login: String): Observable<User> {
    var url = this.usersUrl1 + "/" + login;
    return this.http.get<User>(url);
  }
}
