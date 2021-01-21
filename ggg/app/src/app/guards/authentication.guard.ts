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
            alert("У вас нет прав для перехода. Необходимо: войти")
            return false;
        } 
        else if (!this.authenticationServive.isUserAdmin() && ! this.authenticationServive.isUserUser()) {
            alert("У вас нет прав для перехода. Необходимо: иметь роль администратора")
            return false;
        } 
        else {
            return true;
        }
    }

}