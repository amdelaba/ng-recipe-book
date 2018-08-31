import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyCXAa5ujqKI8fmBdMD_ISA-_8LWZcUOUYY",
      authDomain: "ng-recipe-book-5b1d6.firebaseapp.com"
    });
  }

}
