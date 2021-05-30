import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserServiceService } from './user-service.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent {
  login!: string;
  password!: string;
  user!: User;
  constructor(private userService: UserServiceService) { }
  check(){
    this.user = new User(this.login, "", this.password);
    this.userService.check(this.login).subscribe(data => {
      if (CryptoJS.MD5(this.user.password).toString().replace("0", '') == data.password){
        localStorage.setItem(this.login, "in");
        localStorage.setItem("login", this.login);
        location.replace("\profile");
      }
      else{

      }
      //console.log(data.password);
    });
  }

}
