import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from './user-service.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  bbb: boolean;
  sname!: string;
  userRecords = [{}]
  friend = [""];
  login = JSON.stringify(localStorage.getItem("login")).replace(/"/g, '');

  constructor(private userService: UserServiceService, private router: Router) {
    this.bbb = false

    this.userService.findAll().subscribe(data => {
      for (var a = 0; a < data.length; a++){
        this.userRecords.push({"name": data[a]})
      }
    });

    this.userService.friends(this.login).subscribe(data => {
      var v = data.password;
      v = v.replace("\"", "")
      v = v.replace("\"", "")
      let arrayOfStrings = v.split(", ");
      console.log(arrayOfStrings)
      this.friend = arrayOfStrings
      })
  }

  ngOnInit(): void {
  }

  gk(name: string){
    this.sname = name;
    this.router.navigate(['/fprofile'], { queryParams: { name: name } });
  }

  saverange() {
    if (this.sname == ""){
      this.bbb = false;
    }
    else{
      this.bbb = true;
    }
  }

}
