import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FprofileComponent } from './fprofile/fprofile.component';
import { FriendsComponent } from './friends/friends.component';
import { HomeComponent } from './home/home.component';
import { MusicalInstrumentsComponent } from './musical-instruments/musical-instruments.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "signin", component: SingInComponent},
  {path: "signup", component: SingUpComponent},
  {path: "profile", component: ProfileComponent},
  {path: "musical-instruments", component: MusicalInstrumentsComponent},
  {path: "friends", component: FriendsComponent},
  {path: "fprofile", component: FprofileComponent},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
