import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor() {
    if (localStorage.getItem("admin")) {
      console.log("admin is alreay exists")
    } else {
      let admin = {
        "login": "admin",
        "password": "admin"
      }
      let jsonAdmin = JSON.stringify(admin)
      localStorage.setItem("admin", jsonAdmin)
      console.log("admin was created")
    }

    if (localStorage.getItem("user")) {
      console.log("user is alreay exists")
    } else {
      let user = {
        "login": "login",
        "password": "password"
      }
      let jsonUser = JSON.stringify(user)
      localStorage.setItem("user", jsonUser)
      console.log("user was created")
    }
  }
}
