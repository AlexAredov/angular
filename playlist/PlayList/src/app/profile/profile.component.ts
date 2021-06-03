import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { UserServiceService } from './user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  sname!: string;
  fname!: string;
  login = JSON.stringify(localStorage.getItem("login")).replace(/"/g, '');
  list!: string;
  arr: string[] = ["Nothing is here :(", " ", " ", " ", " ", " ", " ", " ", " ", " "];
  list1!: string;
  arr1: string[] = ["", "", "", "", "", "", "", "", "", ""];
  movies = [""];
  userRecords = [{
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz"
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv"
  },
  {
    "id": 3,
    "name": "Clementine Bauch",
    "username": "Samantha",
    "email": "Nathan@yesenia.net"
  },
  {
    "id": 4,
    "name": "Patricia Lebsack",
    "username": "Karianne",
    "email": "Julianne.OConner@kory.org"
  },
  {
    "id": 5,
    "name": "Chelsey Dietrich",
    "username": "Kamren",
    "email": "Lucio_Hettinger@annie.ca"
  },
  {
    "id": 6,
    "name": "Mrs. Dennis Schulist",
    "username": "Leopoldo_Corkery",
    "email": "Karley_Dach@jasper.info"
  },
  {
    "id": 7,
    "name": "Kurtis Weissnat",
    "username": "Elwyn.Skiles",
    "email": "Telly.Hoeger@billy.biz"
  },
  {
    "id": 8,
    "name": "Nicholas Runolfsdottir V",
    "username": "Maxime_Nienow",
    "email": "Sherwood@rosamond.me"
  },
  {
    "id": 9,
    "name": "Glenna Reichert",
    "username": "Delphine",
    "email": "Chaim_McDermott@dana.io"
  },
  {
    "id": 10,
    "name": "Clementina DuBuque",
    "username": "Moriah.Stanton",
    "email": "Rey.Padberg@karina.biz"
  }
]



  constructor(private userService: UserServiceService) {
    this.userService.songs(this.login).subscribe(data => {
      //console.log(data);
      var s = data.songs.replace("\"", "");
      s = s.replace("\"", "");
      this.movies = s.split(", ");
      console.log(this.movies);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    console.log(this.movies);
    this.userService.addsongs(this.movies, this.login);
    //console.log(this.movies)
    }

  close(){
    
  }


  filterTerm!: string;

  gk(name: string){
    this.sname = name;
  }



  g (){
    this.movies.push(this.sname);
    this.sname = "";
    console.log(this.movies);
    this.userService.addsongs(this.movies, this.login);
    setTimeout(() => { 
      this.userService.songs(this.login).subscribe(data => {
        console.log(data);
        var s = data.songs.replace("\"", "");
        s = s.replace("\"", "");
        this.movies = s.split(", ");
        console.log(this.movies);
      });
     }, 1000);
  }

  gf (){

  }
  exit (){
    localStorage.setItem(this.login, "out"),
    location.replace('/')
  }
}
