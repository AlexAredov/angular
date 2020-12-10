import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-item1',
  templateUrl: './item1.component.html',
  styleUrls: ['./item1.component.css']
})
export class Item1Component {
  login!: string;
  password!: string;
  private routeSubscription: Subscription;
  constructor(private route: ActivatedRoute){
      this.routeSubscription = route.params.subscribe(params=>this.login=params['login']);
      this.routeSubscription = route.params.subscribe(params=>this.password=params['password']);
  }
}
