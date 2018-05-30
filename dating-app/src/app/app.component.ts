import { Component } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import { AngularFireAuth} from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { FirebaseService } from './services/firebase.services';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FirebaseService]
})
export class AppComponent implements OnInit {
  profiles: Profile[];
  genderType: Gender[];
  appState: string;
  activeKey: string;
  constructor(private _firebaseService: FirebaseService) {
  }
  ngOnInit(){
    this.appState ='default';
    this._firebaseService.getProfile().subscribe(profiles => {
      this.profiles = profiles;
      var genderType : string;
    //   genderType = this.profiles.isRelated
    // if (genderType){
        
    //   }
    });
    this._firebaseService.getGender().subscribe(genderType => {
      this.genderType = genderType;
    });
  }
  changeState(state, key= null){
    if(key) {
      this.activeKey = key;
    }
    this.appState = state;
  }
  filterGender(genderType){
    this._firebaseService.getProfile(genderType).subscribe(profiles=>
    {
      this.profiles = profiles;
    })
  }
}

export interface Profile{
  $key: string;
  name: string;
  surname: string;
  age: number;
  isRelated: boolean;
  image: string;
  likes: number;
  gender: string;
}
export interface Gender{
  $key: string;
  name: string;
}