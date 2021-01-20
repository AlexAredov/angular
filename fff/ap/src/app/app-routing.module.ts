import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoComponent } from './components/components/info/info.component';
import { LoginComponent } from './components/components/login/login.component';
import { MainComponent } from './components/components/main/main.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { SaveDataGuard } from './guards/save-data.guard';

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "login", component: LoginComponent },
  { path: "info", component: InfoComponent, canActivate: [AuthenticationGuard], canDeactivate: [SaveDataGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
