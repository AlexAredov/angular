import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from './user-service.service';

@Component({
  selector: 'app-fprofile',
  templateUrl: './fprofile.component.html',
  styleUrls: ['./fprofile.component.css']
})
export class FprofileComponent implements OnInit {
  order!: string;
  text = "Add to friends"
  myArray1 = [{}];
  login = JSON.stringify(localStorage.getItem("login")).replace(/"/g, '');
  arrr!: string[];
  songs = [""];
  myArray = [""];
  friend = [""];
  fr = [""];
  MI = [""];

  constructor(private route: ActivatedRoute, private userService: UserServiceService, private router: Router) {
    this.arrr = [""];

    this.route.queryParams.subscribe(params => {
      this.order = params.name;
      console.log(params.name);
    }
    );
    this.userService.friends(this.order).subscribe(data => {
      var v = data.password;
      v = v.replace("\"", "")
      v = v.replace("\"", "")
      let arrayOfStrings = v.split(", ");
      console.log(arrayOfStrings)
      this.friend = arrayOfStrings
    })

    this.userService.friends(this.login).subscribe(data => {
      var v = data.password;
      v = v.replace("\"", "")
      v = v.replace("\"", "")
      let arrayOfStrings = v.split(", ");
      console.log(arrayOfStrings)
      this.fr = arrayOfStrings
      console.log(this.fr)
      console.log(this.order)
      var index = this.fr.indexOf(this.order);
      console.log(index)
      if (index > -1) {
        this.text = "Remove from friends"
      }
      else{
        this.text = "Add to friends"
      }
    })




    let min = ["Ukelele", "Bangos", "Harmonica", "Bass Guitar", "Drums", "Piano", "Xylophone", "Kalimba", "Clarinet", "Trombone", "Guitar", "Saxophone", "Steel Tongue Drum", "Flute", "Theremin", "Harp", "Cello", "Magix Music Maker", "Image-Line FL Studio 20", "Native Instruments Maschine 2 MK3", "Propellerheads Reason+"];
    this.userService.miget(this.order).subscribe(data => {
      var v = data.password;
      let arrayOfStrings = v.split(", ");
      console.log(arrayOfStrings)
      for (var a = 0; a < arrayOfStrings.length; a++){
        this.MI.push(min[parseInt(arrayOfStrings[a]) - 1])
      }
    })

    this.userService.songs(this.order).subscribe(data => {
      let nameList = data.password.split(", ");
      this.songs = nameList;
      for(var a = 0; a < this.songs.length; a++){
        this.lin(this.songs[a])
      }

      for (var a = 0; a < this.songs.length; a++){
        this.myArray.push(this.songs[a]);
      }

      console.log(this.myArray)
    })


    setTimeout(() => {
      for(var a = 0; a < this.myArray.length; a++){
        this.myArray1.push({"name": this.myArray[a], "url": this.arrr[a]})
      }

      console.log(this.myArray1)
    }, 2000);


   }

  ngOnInit() {

  }

  cl(){
    if (this.text == "Add to friends"){
      this.fr.push(this.order);
      this.userService.addfriend(this.fr, this.login);
      this.text = "Remove from friends"
    }
    else{
      var index = this.fr.indexOf(this.order);
      if (index > -1) {
        this.fr.splice(index, 1);
      }
      console.log(this.fr);
      this.userService.addfriend(this.fr, this.login);
      this.text = "Add to friends"
    }
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

  k(name: string){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route, queryParams: { name: name } });
  }

}
