import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { UserServiceService } from './user-service.service';
import { NgLocaleLocalization } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

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
  songs = [""];
  mi = [""];
  userRecords = [{}]
  bbb = false;
  ms!: string;

  elementType: 'url' | 'canvas' | 'img' = 'url';

  value: string = 'https://music.apple.com/ru/album/believer/1411625594?i=1411628233&l=en';

  url = "";

  myArray = [""];

  arrr!: string[];

  myArray1 = [{}];


  constructor(private userService: UserServiceService, private router: Router) {

    this.arrr = [""];

    this.userService.topsongs().subscribe(data => {
      this.songs = data;
      this.lin(this.songs[0])
      this.lin(this.songs[1])
      this.lin(this.songs[2])
      this.lin(this.songs[3])
      this.lin(this.songs[4])

      for (var a = 0; a < this.songs.length; a++){
        this.myArray.push(this.songs[a]);
      }

      console.log(this.myArray)
    })


    setTimeout(() => {
      this.myArray1.push({"name": this.myArray[1], "url": this.arrr[1]})
      this.myArray1.push({"name": this.myArray[2], "url": this.arrr[2]})
      this.myArray1.push({"name": this.myArray[3], "url": this.arrr[3]})
      this.myArray1.push({"name": this.myArray[4], "url": this.arrr[4]})
      this.myArray1.push({"name": this.myArray[5], "url": this.arrr[5]})

      console.log(this.myArray1)
    }, 2000);

    let min = ["Ukelele", "Bangos", "Harmonica", "Bass Guitar", "Drums", "Piano", "Xylophone", "Kalimba", "Clarinet", "Trombone", "Guitar", "Saxophone", "Steel Tongue Drum", "Flute", "Theremin", "Harp", "Cello", "Magix Music Maker", "Image-Line FL Studio 20", "Native Instruments Maschine 2 MK3", "Propellerheads Reason+"];


    this.userService.miget(this.login).subscribe(data => {
      var v = data.password;
      let arrayOfStrings = v.split(", ");
      console.log(arrayOfStrings)
      for (var a = 0; a < arrayOfStrings.length; a++){
        this.mi.push(min[parseInt(arrayOfStrings[a]) - 1])
      }
      console.log(this.mi)
    });

    this.userService.songs(this.login).subscribe(data => {
      //console.log(data);
      this.movies.pop()
      var s = data.password.replace("\"", "");
      s = s.replace("\"", "");
      this.movies = s.split(", ");
      console.log(this.movies);
    });

    this.userService.allsongs().subscribe(data => {
      for (var a = 0; a < data.length; a++){
        this.userRecords.push({"name": data[a]})
      }
    });

    this.userService.service(this.login).subscribe(data => {
      console.log(data.password)
      if (data.password == "apple"){
        var element = <HTMLInputElement> document.getElementById("apple");
        element.checked = true;
      }
      else if(data.password == "spotify"){
        var element = <HTMLInputElement> document.getElementById("spotify");
        element.checked = true;
      }
      else if(data.password == "vk"){
        var element = <HTMLInputElement> document.getElementById("vk");
        element.checked = true;
      }
      else if(data.password == "yandex"){
        var element = <HTMLInputElement> document.getElementById("yandex");
        element.checked = true;
      }
    });
  }

  mms(somg:string){
    this.ms = somg
    var element = <HTMLInputElement> document.getElementById(somg);
    var isChecked = element.checked;

    //var apple = document.getElementById(somg)?.dataset

    //console.log(isChecked);
    this.userService.serves(this.login, this.ms);
    //console.log(this.ms);
  }

  ng(){
    location.replace("\musical-instruments");
  }

  saverange() {
    if (this.sname == ""){
      this.bbb = false;
    }
    else{
      this.bbb = true;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    let m = [];

    for (var a = 0; a < this.movies.length; a++){
      m.push(this.movies[a]);
    }
    
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    console.log(m)

    if (!this.compare(m, this.movies)){
      console.log(this.movies);
      this.userService.addsongs(this.movies, this.login);
      this.userService.top(this.movies[0]).subscribe(data => {
        var n = parseInt(data.password);
        n++;
        this.userService.top1(this.movies[0], n.toString())
      });

    }
    else{
      console.log("NO");
    }

    //console.log(this.movies)
  }

  compare(a: String[], b: String[]){
    for(var i = 0; i < a.length; i++)
       if(a[i] != b[i])
          return false;

    return true;
  }

  close(somg: string){
    var index = this.movies.indexOf(somg);
    if (index > -1) {
      this.movies.splice(index, 1);
    }

    console.log(this.movies);
    this.userService.addsongs(this.movies, this.login);
  }


  filterTerm!: string;

  gk(name: string){
    this.sname = name;
  }

  jk(){
    console.log(this.sname);
    this.userService.adds(this.sname);
    this.userService.allsongs().subscribe(data => {
      for (var a = 0; a < data.length; a++){
        this.userRecords.push({"name": data[a]})
      }
    });
  }

  link(srt:string){
    var l = "https://www.google.com/";
    this.userService.service(this.login).subscribe(data => {
      if (data.password == "apple"){
        this.userService.apple(srt).subscribe(data => {
          l = data[0];
          console.log(l);
          setTimeout(() => {
            location.replace(l);
          }, 500);
        });
      }
      else if(data.password == "spotify"){
        this.userService.spotify(srt).subscribe(data => {
          l = data[0];
          console.log(l);
          setTimeout(() => {
            location.replace(l);
          }, 500);
        });
      }
      else if(data.password == "vk"){
        this.userService.vk(srt).subscribe(data => {
          l = data[0];
          console.log(l);
          setTimeout(() => {
            location.replace(l);
          }, 1400);
        });
      }
      else if(data.password == "yandex"){
        this.userService.yandex(srt).subscribe(data => {
          l = data[0];
          console.log(l);
          setTimeout(() => {
            location.replace(l);
          }, 500);
        });
      }
    });
  }



  lin(srt:string){
    var l = "https://www.google.com/";
    this.userService.service(this.login).subscribe(data => {
      if (data.password == "apple"){
        this.userService.apple(srt).subscribe(data => {
          l = data[0];
          console.log(l);
          this.arrr.push(l)
        });
      }
      else if(data.password == "spotify"){
        this.userService.spotify(srt).subscribe(data => {
          l = data[0];
          console.log(l);
          this.arrr.push(l)
        });
      }
      else if(data.password == "vk"){
        this.userService.vk(srt).subscribe(data => {
          l = data[0];
          console.log(l);
          this.arrr.push(l)
        });
      }
      else if(data.password == "yandex"){
        this.userService.yandex(srt).subscribe(data => {
          l = data[0];
          console.log(l);
          this.arrr.push(l)
        });
      }
    });
  }



  g (){
    var index = this.movies.indexOf(this.sname);
    if (index > -1) {
      this.sname = "";
      this.bbb = false;
      alert("This song is already in your list")
    }
    else{

      this.movies.push(this.sname);
      if (this.movies.length == 1){
        this.userService.top(this.movies[0]).subscribe(data => {
          var n = parseInt(data.password);
          n++;
          this.userService.top1(this.movies[0], n.toString())
        });
      }

      console.log(this.movies);
      this.userService.addsongs(this.movies, this.login);
      this.sname = "";
      this.bbb = false;
      setTimeout(() => { 
        this.userService.songs(this.login).subscribe(data => {
          console.log(data);
          var s = data.password.replace("\"", "");
          s = s.replace("\"", "");
          this.movies = s.split(", ");
          console.log(this.movies);
        });
      }, 1000);
    }
  }

  gf (){

  }
  exit (){
    localStorage.setItem(this.login, "out"),
    location.replace('/')
  }
}
