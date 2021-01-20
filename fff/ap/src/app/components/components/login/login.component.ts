import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string = "";
  msg: string = "";
  constructor(private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    activatedRoute.queryParams.subscribe(qparams => {
      let temp = qparams["returnUrl"];
      if (temp !== null) {
        this.returnUrl = temp[0];
      }

      temp = qparams["msg"];
      if (temp !== null) {
        this.msg = temp;
      }
    });
  }

  ngOnInit(): void {
  }

  logIn(login: string): void {
    console.log(login);

    // Войти в систему
    this.authenticationService.logIn(login);

    // Если есть обратная ссылка, то вернуться
    // Если обратной ссылки нет, то перейти на главную страницу
    if (this.returnUrl !== "") {
      console.log(this.returnUrl);
      this.router.navigate([this.returnUrl]);
    } else {
      this.router.navigate([""]);
    }
  }

}
