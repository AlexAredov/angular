import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  sname!: string;
  fname!: string;
  login = JSON.stringify(localStorage.getItem("login")).replace(/"/g, '');
  list!: string;
  arr: string[] = ["Nothing is here :(", " ", " ", " ", " ", " ", " ", " ", " ", " "];
  list1!: string;
  arr1: string[] = ["", "", "", "", "", "", "", "", "", ""];

  constructor() {
    this.list = JSON.stringify(localStorage.getItem(this.login + "1")).replace(/"/g, '');
    var j = 0;
    if(localStorage.getItem(this.login + "1") != null){
      for (var i = 0; i < this.list.length; i++){
        if (this.list[i] == " "){
          j++;
          if (j >= 10){
            break;
          }
          continue;
        }
        else{
          this.arr[j] = this.arr[j] + this.list[i];
        }
      }
    }
  }


  g (){
    if (localStorage.getItem(this.login + "1") != null){
      localStorage.setItem(this.login + "1", localStorage.getItem(this.login + "1") + " " + this.sname);
    }
    else{
      localStorage.setItem(this.login + "1", this.sname);
    }
    this.list = JSON.stringify(localStorage.getItem(this.login + "1")).replace(/"/g, '');
    for (var j = 0; j < 11; j++){
      this.arr[j] = " ";
    }
    var j = 0;
    for (var i = 0; i < this.list.length; i++){
      if (this.list[i] == " "){
        j++;
        if (j >= 10){
          break;
        }
        continue;
      }
      else{
        this.arr[j] = this.arr[j] + this.list[i];
      }
    }
  }

  gf (){
    if (localStorage.getItem(this.fname + "1") != null){
      this.list1 = JSON.stringify(localStorage.getItem(this.fname + "1")).replace(/"/g, '');
      for (var j = 0; j < 11; j++){
        this.arr1[j] = "";
      }
      var j = 0;
      for (var i = 0; i < this.list1.length; i++){
        if (this.list1[i] == " "){
          j++;
          if (j >= 10){
            break;
          }
          continue;
        }
        else{
          this.arr1[j] = this.arr1[j] + this.list1[i];
        }
      }
    }
  }
  exit (){
    localStorage.setItem(this.login, "out"),
    location.replace('/')
  }
}
