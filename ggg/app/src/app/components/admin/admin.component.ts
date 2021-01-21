import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  markdownText: string = "";
  login: string = "";
  password: string = "";

  isSaved: boolean = false;
  constructor() {
    let jsonUser = localStorage.getItem("user")
    if (jsonUser){
      let user = JSON.parse(jsonUser)
      let login_for_user = user["login"]
      let password_for_user = user["password"]
      this.login = login_for_user;
      this.password = password_for_user;
    }
  }

  ngOnInit(): void {
  }

  save(info1: string, info2: string): void {
    let user = {
      "login": info1,
      "password": info2
    }
    let jsonUser = JSON.stringify(user)
    localStorage.setItem("user", jsonUser)

    this.isSaved = true;
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (!this.isSaved) {
      return confirm("Есть несохраненные данные.\nВы уверены, что хотите покинуть страницу?");
    } else {
      return true;
    }
  }

}
