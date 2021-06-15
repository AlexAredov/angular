import { Component, OnInit } from '@angular/core';
import { UserServiceService } from './user-service.service';

@Component({
  selector: 'app-musical-instruments',
  templateUrl: './musical-instruments.component.html',
  styleUrls: ['./musical-instruments.component.css']
})
export class MusicalInstrumentsComponent{
  arr = [""];
  login = JSON.stringify(localStorage.getItem("login")).replace(/"/g, '');
  constructor(private userService: UserServiceService) {
    this.userService.miget(this.login).subscribe(data => {
      var v = data.password;
      let arrayOfStrings = v.split(", ");
      console.log(arrayOfStrings)
      for (var a = 0; a < arrayOfStrings.length; a++){
        var element = <HTMLInputElement> document.getElementById(arrayOfStrings[a]);
        element.checked = true
      }
    });
   }


  k(){
    for (var a = 1; a < 23; a++){
      var element = <HTMLInputElement> document.getElementById(a);
      if (element.checked == true){
        this.arr.push(element.id)
      }
    }
    this.userService.mipost(this.arr, this.login);
    console.log(this.arr)
    location.replace("\profile");
  }

}
