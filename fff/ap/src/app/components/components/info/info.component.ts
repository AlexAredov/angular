import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from 'src/app/guards/save-data.guard';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit, ComponentCanDeactivate {

  markdownText: string = "";

  isSaved: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  save(info1: string, info2: string, info3: string,): void {
    localStorage.setItem("info1", info1);
    localStorage.setItem("info2", info2);
    localStorage.setItem("info3", info3);

    this.isSaved = true;
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (!this.isSaved) {
      return confirm("Есть несохраненные данные.\nВы уверены, что хотите покинуть страницу?");
    } else {
      return true;
    }
  }

}
