import * as AuthActions  from './auth.actions';



export interface State {
    token: string;
    authenticated: boolean;
}

const initialState: State = {
    token: null,
    authenticated: false
};


export function authReducerFunction (state = initialState, action: AuthActions.AuthActions) {

    switch(action.type){
        case (AuthActions.SIGNUP):
        case (AuthActions.SIGNIN):
            return {
                ...state,
                authenticated: true
            };
        case (AuthActions.LOGOUT):
            return {
                ...state,
                token: null,
                authenticated: false
            };
        case (AuthActions.SET_TOKEN):
            return {
                ...state,
                token: action.payload
            };
        default:
          return state;

    }

}


//TODO, for Authentication in general
    // Check if a token is present at application startup (check the localStorage manually or use the Firebase SDK to do so - just make sure that you somehow wait for the SDK to finish its initialization)
    // Redirect the user if he want to access a protected route (right now, nothing happens) - inject the router and call this.router.navigate(...) to do so
    // Redirect the user on logout so that he's not able to stay on pages which are reserved for authenticated users - you can simply inject the router and call this.router.navigate(...) in the logout() method
