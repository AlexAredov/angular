import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/components/main/main.component';
import { InfoComponent } from './components/components/info/info.component';
import { LoginComponent } from './components/components/login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationGuard } from './guards/authentication.guard';
import { SaveDataGuard } from './guards/save-data.guard';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    InfoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    EditorModule
  ],
  providers: [AuthenticationGuard, SaveDataGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

