import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  condition: boolean = false;
  login = JSON.stringify(localStorage.getItem("login")).replace(/"/g, '');
  title = 'PlayList';
  ngOnInit() {
    if ((localStorage.getItem(this.login) == "in")){
      this.condition = true;
    }
    else{
      this.condition = false;
    }
  }
}
