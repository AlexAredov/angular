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
      var ss = CryptoJS.MD5(this.user.password).toString();
      while(ss.search("0") != -1){
        ss = ss.replace("0", '');
      }

      if (ss == data.password){
        localStorage.setItem(this.login, "in");
        localStorage.setItem("login", this.login);
        location.replace("\profile");
      }
      else{

      }
      console.log(data.password);
      console.log(ss);

    });
  }

}
