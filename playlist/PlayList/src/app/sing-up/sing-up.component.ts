import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent {
  login!: string;
  password!: string;
  constructor() {}
  go(){
    localStorage.setItem(this.login, this.password);
    if (localStorage.getItem(this.login) != null){
      if (JSON.stringify(localStorage.getItem(this.login)).replace(/"/g, '') == this.password){
        console.log("succes");
        localStorage.setItem("login", this.login);
        location.replace("\profile");
      }
      else{
        console.log(JSON.stringify(localStorage.getItem(this.login)) + " " + this.password);
      }
    }
    location.replace("\profile");
  }
}
