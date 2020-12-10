import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent {
  ig!: any;
  name!: string;
  date!: any;
  price!: any;
  data: string | null;
  private routeSubscription: Subscription;
  constructor(private route: ActivatedRoute){
      this.routeSubscription = route.params.subscribe(params=>this.name=params['name']);
      this.data = localStorage.getItem(this.name);
  }
}
