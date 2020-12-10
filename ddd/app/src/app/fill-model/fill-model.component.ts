import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export class Models{
  name!: string;
}

@Component({
  selector: 'app-fill-model',
  templateUrl: './fill-model.component.html',
  styleUrls: ['./fill-model.component.css']
})
export class FillModelComponent {
  ig!: number;
  name!: string;
  date!: number;
  price!: number;
  model: Models=new Models();
  constructor( private router: Router) { }

  goToItem(Models: Models){
    var testObject = { 'id': this.ig, 'name': this.name, 'date': this.date, 'price': this.price };
    localStorage.setItem(this.name, JSON.stringify(testObject));
    this.router.navigate(
      ['/models', Models.name]
    );
  }

}
