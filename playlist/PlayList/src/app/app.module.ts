import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { MusicalInstrumentsComponent } from './musical-instruments/musical-instruments.component';
import { FriendsComponent } from './friends/friends.component';
import { FprofileComponent } from './fprofile/fprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SingUpComponent,
    SingInComponent,
    NotFoundComponent,
    ProfileComponent,
    MusicalInstrumentsComponent,
    FriendsComponent,
    FprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    Ng2SearchPipeModule,
    NgxQRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
