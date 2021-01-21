import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { FormsModule } from '@angular/forms';
import { SaveDataGuard } from './guards/save-data.guard';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthenticationGuardA } from './guards/authenticationA.guard';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutComponent,
    LoginComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [AuthenticationGuard, AuthenticationGuardA, SaveDataGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
