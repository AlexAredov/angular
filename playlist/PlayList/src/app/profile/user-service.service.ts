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
  private Spotify: string;
  private Apple: string;
  private Vk: string;
  private Yandex: string;
  private Service: string;
  private Service1: string;
  private Top: string;
  private Top1: string;
  private TopSongs: string;
  constructor(private http: HttpClient) {
    this.usersUrl = 'https://playlist-ad.herokuapp.com/full';
    this.usersUrlch = 'https://playlist-ad.herokuapp.com/songs';
    this.usersUrladd = 'https://playlist-ad.herokuapp.com/addsongs';
    this.Service = 'https://playlist-ad.herokuapp.com/serves';
    this.Service1 = 'https://playlist-ad.herokuapp.com/service';
    this.Spotify = 'https://playlist-ad.herokuapp.com/spotify';
    this.Apple = 'https://playlist-ad.herokuapp.com/apple';
    this.Vk = 'https://playlist-ad.herokuapp.com/vk';
    this.Yandex = 'https://playlist-ad.herokuapp.com/yandex';
    this.Top = 'https://playlist-ad.herokuapp.com/top';
    this.Top1 = 'https://playlist-ad.herokuapp.com/top1';
    this.TopSongs = 'https://playlist-ad.herokuapp.com/topsongs';
  }

  public findAll(): Observable<String[]> {
    return this.http.get<String[]>(this.usersUrl);
  }

  public songs(login: String): Observable<User> {
    var url = this.usersUrlch + "/" + login;
    return this.http.get<User>(url);
  }

  public allsongs() : Observable<string[]>{
    return this.http.get<string[]>(this.usersUrlch);
  }

  public addsongs(arr: String[], login: String) {
    var url = this.usersUrladd + "/" + login;
    var songs = arr[0];
    for (var i = 1; i < arr.length; i++){
      songs = songs + ", " + arr[i];
    }
    this.http.post(url, songs).subscribe(value => songs);
  }

  public serves(login: String, service: String) {
    var url = this.Service + "/" + login + "/" + service;
    this.http.post(url, "").subscribe();
  }

  public service(login: String): Observable<User> {
    var url = this.Service1 + "/" + login;
    return this.http.get<User>(url);
  }

  public apple(name: string) : Observable<string[]>{
    return this.http.get<string[]>(this.Apple + "/" + name);
  }

  public spotify(name: string) : Observable<string[]>{
    return this.http.get<string[]>(this.Spotify + "/" + name);
  }

  public vk(name: string) : Observable<string[]>{
    return this.http.get<string[]>(this.Vk + "/" + name);
  }
  
  public yandex(name: string) : Observable<string[]>{
    return this.http.get<string[]>(this.Yandex + "/" + name);
  }

  public top(name: string) : Observable<User>{
    return this.http.get<User>(this.Top + "/" + name);
  }

  public top1(name: String, number: String) {
    var url = this.Top1 + "/" + name + "/" + number;
    this.http.post(url, "").subscribe();
  }

  public topsongs(): Observable<string[]> {
    return this.http.get<string[]>(this.TopSongs);
  }
}
