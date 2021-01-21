import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  private username: string = "";
  private userpassword: string = "";
  private isLogged: boolean = false;

  logIn(username: string, userpassword: string): void {
    this.username = username;
    this.userpassword = userpassword;
    this.isLogged = true;
  }

  logOut(): void {
    this.username = "";
    this.userpassword = "";
    this.isLogged = false;
  }

  isUserAdmin(): boolean {
    return this.username === "admin" && this.userpassword === "admin";
  }

  isUserUser(): boolean {
    let jsonUser = localStorage.getItem("user")
    if (jsonUser) {
      let user = JSON.parse(jsonUser)
      let login_for_user = user["login"]
      let password_for_user = user["password"]
      return this.username === login_for_user && this.userpassword === password_for_user;
    }
    else{
      return false
    }
  }

  isUserLogged(): boolean {
    return this.isLogged;
  }

  isUserInRole(role: Roles): boolean {
    console.log(role.toString());
    return true;
  }
}

export enum Roles {
  admin,
  user,
  guest
}
