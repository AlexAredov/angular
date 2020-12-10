import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent{ 
  city!: string;
  country!: string;
  private routeSubscription: Subscription;
  constructor(private route: ActivatedRoute){
      this.routeSubscription = route.params.subscribe(params=>this.city=params['city']);
      this.routeSubscription = route.params.subscribe(params=>this.country=params['country']);
  }
}