import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Alex';
  age = 17;
  change_name(){
    if(this.name === 'Alex'){
      this.name = 'Ivan';
    } else{
      this.name = 'Alex';
    }
  }
  clicks: number = 0;
  onChanged(increased: boolean){
    increased == true ? this.clicks++ : this.clicks--;
  }
}

