import { Component } from "@angular/core";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import * as firebase from "firebase/app";
import { FirebaseService } from "./services/firebase.services";
import { OnInit } from "@angular/core";
import { FormsModule } from '@angular/forms';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [FirebaseService]
})
export class AppComponent implements OnInit {
  likes: number;
  profiles: Profile[];
  genderType: Gender[];
  civilStatus: CivilStatus[];
  appState: string;
  activeKey: string;
  angular: any;
  constructor(private _firebaseService: FirebaseService) {}
  ngOnInit() {
    this.appState = "default";
    this._firebaseService.getProfile().subscribe(profiles => {
      this.profiles = profiles;
      var genderType: string;
      var civilStatus: string;
      //   genderType = this.profiles.isRelated
      // if (genderType){

      //   }
    });
    this._firebaseService.getGender().subscribe(genderType => {
      this.genderType = genderType;
    });
    this._firebaseService.getCivilStatus().subscribe(civilStatus => {
      this.civilStatus = civilStatus;
    });
  }
  
  changeState(state, key = null) {
    if (key) {
      this.activeKey = key;
    }
    this.appState = state;
  }

  addProfile(name: string, surname: string, age: number, image: string, isRelated: boolean, likes: number) {
        console.log("1 "+name, surname, age, image, isRelated, likes);

    var newProfile = {
      name: name,
      surname: surname,
      age: age,
      image: image,
      isRelated: isRelated,
      likes: likes = 0,
      
    }
    console.log("a")
    console.log("2 "+name, surname, age, image, isRelated, likes);
    this._firebaseService.addProfile(newProfile);
    this.changeState('default');
  }
  filterGender(genderType) {
    this._firebaseService.getProfile(genderType).subscribe(profiles => {
      this.profiles = profiles;
    });
  }
  filterCivilStatus(civilStatus) {
    this._firebaseService.getProfile(civilStatus).subscribe(profiles => {
      this.profiles = profiles;
    });
  }
  addLike(target, value) {
    value += 1;
    this._firebaseService.increment(target, value);
    };

  minusLike(target, value){
    value -= 1; 
    var border= 0;
    if(value >= border){
      this._firebaseService.decrement(target, value);
    }
  }
  
  
}
export interface Profile {
  $key: string;
  name: string;
  surname: string;
  age: number;
  isRelated: boolean;
  image: string;
  likes: number;
  gender: string;
}
export interface Gender {
  $key: string;
  name: string;
}
export interface CivilStatus{
  $key: string;
  name: string;
}