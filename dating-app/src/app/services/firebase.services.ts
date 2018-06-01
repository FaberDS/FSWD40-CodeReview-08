import {Injectable} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import * as _ from "lodash";
@Injectable()
export class FirebaseService {
    profiles: FirebaseListObservable<Profile[]>;
    genderType: FirebaseListObservable<Gender[]>;
    civilStatus: FirebaseListObservable<CivilStatus[]>;
    constructor(private af: AngularFireDatabase){
       
    }
    getProfile(gender: string = null ) {
        console.log("gender " + gender);
        // console.log("genderType " + genderType);
        if(gender === '0'){
            this.profiles = this.af.list('/profile') as FirebaseListObservable<Profile[]>;
        } else if(gender != null){
            this.profiles = this.af.list('/profile', {
                query: {
                    orderByChild: 'gender',
                    equalTo: gender
                }
            }) as FirebaseListObservable<Profile[]>;
        }else{
            this.profiles = this.af.list('/profile') as FirebaseListObservable<Profile[]>;
        }
        return this.profiles;
    }
    getGender() {
        this.genderType = this.af.list('/gender') as FirebaseListObservable<Gender[]>;
        return this.genderType;
    }
    getCivilStatus() {
        this.civilStatus = this.af.list('/civilValue') as FirebaseListObservable<CivilStatus[]>;
        return this.civilStatus;
    }
    addProfile(newProfile) {
        console.log("A")
        return this.profiles.push(newProfile);
    }

    increment(target, val):void {
        this.af.object('/profile/' + target).update({likes: val});
      
    }
    decrement(target, val):void {
        this.af.object('/profile/' + target).update({likes: val});
      
    }

    //ADD & Delete ---------------------------------------------------------------------------------
    // deleteItem(itemKey) {
    //     this._firebaseService.getBusinesses().remove(itemKey);
    //   }
    //     changeState(state, key = null) {
    //       if (key) {
    //         this.activeKey = key;
    //       }
    //       this.appState = state;
    //     }
      
    //   addBusiness(company: string, category: string, phone: string) {
    //     var newBusiness = {
    //       company: company,
    //       category: category,
    //       phone: phone
    //     };
    //     this._firebaseService.addBusiness(newBusiness);
    //     this.changeState('default');
    //   }

    // addLike(like: number, target: string){
    //     like += 1;
    //     console.log(target);
    //     console.log("2. userkey " +like);
    //     // target.update(like);
    //      this.lik.valueChanges()
    // }
    // addLike(data: number, keyID) {
    //     var like = this.af.list('/profile') as FirebaseListObservable<Profile[]>;
    //     data += 1;
    //     console.log(data);
    //     console.log(keyID);
        
    //   }
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

export interface CivilStatus{
    $key: string;
    name: string;
}

export interface Lik{
    $key: string;
    like: number;
}