import * as firebase from 'firebase';
import 'firebase/auth';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    token: string;

    constructor(private router: Router){}

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .catch(
                error => console.log(error)
            );
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    this.router.navigate(['/']); 
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (tk:string) => this.token = tk
                        )
                }
            ).catch( 
                error => console.log(error)
            );
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (tk:string) => this.token = tk
            );
        return this.token; //might return expired token
    }

    isAuthenticated(){
        return this.token != null;
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }

    //TODO:
    // Check if a token is present at application startup (check the localStorage manually or use the Firebase SDK to do so - just make sure that you somehow wait for the SDK to finish its initialization)
    // Redirect the user if he want to access a protected route (right now, nothing happens) - inject the router and call this.router.navigate(...) to do so
    // Redirect the user on logout so that he's not able to stay on pages which are reserved for authenticated users - you can simply inject the router and call this.router.navigate(...) in the logout() method
}