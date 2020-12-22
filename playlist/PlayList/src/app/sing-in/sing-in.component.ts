import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent {
  login!: string;
  password!: string;
  constructor() { }
  check(){
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
  }

}
