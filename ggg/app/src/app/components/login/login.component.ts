import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    activatedRoute.queryParams.subscribe(qparams => {
      let jsonUser = localStorage.getItem("user")
    if (jsonUser) {
        let user = JSON.parse(jsonUser)
        let login_for_user = user["login"]
        let password_for_user = user["password"]
        console.log("Login - " + login_for_user)
        console.log("Password - " + password_for_user)
    }

    let jsonAdmin = localStorage.getItem("admin")
    if (jsonAdmin) {
        let admin = JSON.parse(jsonAdmin)
        let login_for_admin = admin["login"]
        let password_for_admin = admin["password"]
        console.log("Login - " + login_for_admin)
        console.log("Password - " + password_for_admin)
    }
    });
  }

  ngOnInit(): void {
  }

  logIn(login: string, password: string): void {

    // Войти в систему
    this.authenticationService.logIn(login, password);
  }

}
