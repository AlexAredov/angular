import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export class Item{ 
  login!: string;
  password!: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  item: Item = new Item();
  logina: string = "admin";
  passworda: string = "admin";
  constructor(private router: Router){ }
  goToItem(myItem: Item){
    if(myItem.login == this.logina && myItem.password == this.passworda){
      location.replace("/admin");
    }
    else{
      var testObject = { 'login': myItem.login, 'password': myItem.password };
      localStorage.setItem('test1', JSON.stringify(testObject));
      this.logina = myItem.login;
      this.passworda = myItem.password;
    }
  }
}
