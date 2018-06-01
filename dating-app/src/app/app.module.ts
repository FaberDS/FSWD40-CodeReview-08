import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { HeroComponent } from './hero/hero.component';


export const firebaseConfig = {
  apiKey: "AIzaSyCHOPZV3zlsyDTfPrzsp5FfZLmyLdvhK8M",
  authDomain: "first-5801d.firebaseapp.com",
  databaseURL: "https://first-5801d.firebaseio.com",
  projectId: "first-5801d",
  storageBucket: "first-5801d.appspot.com",
  messagingSenderId: "908049948988"
};
@NgModule({
  declarations: [AppComponent, HeroComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
