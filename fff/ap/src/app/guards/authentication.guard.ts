import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private authenticationServive: AuthenticationService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        if (!this.authenticationServive.isUserLogged()) {
            // Просто показывать сообщение пользователю о том, что ему надо войти
            // alert("У вас нет прав для перехода. Необходимо: войти")

            // Перекидывать пользователя на страницу со входом и сообщение почему он был туда перенаправлен
            this.router.navigate(["login"], {queryParams: {
                msg: "У вас нет прав для перехода. Необходимо: войти",
                returnUrl: route.url
            }});
            return false;
        } else if (!this.authenticationServive.isUserAdmin()) {
            this.router.navigate(["login"], {queryParams: {
                msg: "У вас нет прав для перехода. Необходимо: иметь роль администратора",
                returnUrl: route.url
            }});
            return false;
        } else {
            return true;
        }
    }

}