import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  markdownText: string = "";

  isSaved: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  save(info1: string, info2: string): void {
    localStorage.setItem("info1", info1);
    localStorage.setItem("info2", info2);

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
