import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserServiceService } from './user-service.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent {
  login!: string;
  password!: string;
  email!: string;
  users: String[] = [];
  usr!: User;
  

  constructor(private userService: UserServiceService) {
  }
  ngOnInit() {
    this.userService.findAll().subscribe(data => {
      this.users = data;
    });
    console.log(this.users);
  }
  go(){
    var str1 = CryptoJS.MD5(this.password).toString();
    str1 = str1.replace("0", '')
    this.usr =  new User(this.login, this.email, str1);
    this.userService.add(this.usr);
    this.userService.findAll().subscribe(data => {
      this.users = data;
    });
    console.log(this.users);
    localStorage.setItem(this.login, "in");
    localStorage.setItem("login", this.login);
    location.replace("\profile");
  }
}
