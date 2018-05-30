import {Injectable} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
@Injectable()
export class FirebaseService {
    profiles: FirebaseListObservable<Profile[]>;
    genderType: FirebaseListObservable<Gender[]>;
    constructor(private af: AngularFireDatabase){
    }
    getProfile(gender: string = null) {
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