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
    location.replace("\signin");
  }
}
