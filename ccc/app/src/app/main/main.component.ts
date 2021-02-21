import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router} from '@angular/router';

export class Item{ 
  city!: string;
  country!: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent{
  item: Item = new Item();
  i: string[] = [this.item.city, this.item.country];
  constructor(private router: Router){ }
  goToItem(myItem: Item){
    var testObject = { 'city': myItem.city, 'country': myItem.country };
    localStorage.setItem('test', JSON.stringify(testObject));
    this.i = [this.item.city, this.item.country]
  }
}