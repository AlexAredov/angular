import { Component } from '@angular/core';
import { FillModelComponent } from './fill-model/fill-model.component';

export class FillModell{
  m: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  mod: FillModell=new FillModell();
  list: string[] = [];
  constructor(){
    for (var i = 0; i < localStorage.length; i++){
      this.list[i] = JSON.stringify(localStorage.key(i)).replace(/"/g, '');
      this.list[i].replace(/"/g, '');
    }
  }
}
