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
  private Friends: string
  
  constructor(private http: HttpClient) {
    this.usersUrl = 'https://playlist-ad.herokuapp.com/full';
    this.usersUrl1 = 'https://playlist-ad.herokuapp.com/friends';
    this.Friends = 'https://playlist-ad.herokuapp.com/friends';
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
  
  public findAll(): Observable<String[]> {
    return this.http.get<String[]>(this.usersUrl);
  }

  public friends(login: String): Observable<User> {
    var url = this.Friends + "/" + login;
    return this.http.get<User>(url);
  }
}
