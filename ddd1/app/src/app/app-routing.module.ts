import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FillModelComponent } from './fill-model/fill-model.component';
import { HomeComponent } from './home/home.component';
import { ModelsComponent } from './models/models.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "about", component: AboutComponent},
  {path: "contact", redirectTo: "/about", pathMatch: "full"},
  {path: "contacts", redirectTo: "/about", pathMatch: "full"},
  {path: 'models/:name', component: ModelsComponent},
  {path: "fill_model", component: FillModelComponent},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
