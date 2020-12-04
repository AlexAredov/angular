import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  name: string;
  constructor() {
    this.name = "Alex";
  }

  @Input() userName: string = "defolt";
  _userAge: number = 0;

  @Input()
  set userAge(age: number){
    if (age < 0){
      this._userAge = 0;
    } else if (age > 100){
      this._userAge = 100;
    }
    else{
      this._userAge = age
    }
  }
  get userAge(){
    return this._userAge;
  }
  @Output() onChanged = new EventEmitter<boolean>();
  change(increased:boolean) {
      this.onChanged.emit(increased);
  }

  @Output() userNameChange = new EventEmitter<string>();
  onNameChange(model: string){
    this.userName = model;
    this.userNameChange.emit(model);
  }
}
