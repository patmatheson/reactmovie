import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "./firebase";
import { getDatabase, ref, set } from "firebase/database";

const provider = new GoogleAuthProvider();

const auth = getAuth();


/* Google User
auth: AuthImpl {app: FirebaseAppImpl, heartbeatServiceProvider: Provider, config: {…}, currentUser: UserImpl, emulatorConfig: null, …}
displayName: "Pat Matheson"
email: "pat.matheson@gmail.com"
emailVerified: true
isAnonymous: false
metadata: UserMetadata {createdAt: '1653359588685', lastLoginAt: '1653359588686', lastSignInTime: 'Tue, 24 May 2022 02:33:08 GMT', creationTime: 'Tue, 24 May 2022 02:33:08 GMT'}
phoneNumber: null
photoURL: "https://lh3.googleusercontent.com/a-/AOh14GjiKoda7E_aYS7ceM42zhQ56VwiOiHKgoHUz1tEIw=s96-c"
proactiveRefresh: ProactiveRefresh {user: UserImpl, isRunning: true, timerId: 73, errorBackoff: 30000}
providerData: [{…}]
providerId: "firebase"
reloadListener: null
reloadUserInfo: {localId: 'UcIN6lIg0Rcgc9tysruI5MZkJch1', email: 'pat.matheson@gmail.com', displayName: 'Pat Matheson', photoUrl: 'https://lh3.googleusercontent.com/a-/AOh14GjiKoda7E_aYS7ceM42zhQ56VwiOiHKgoHUz1tEIw=s96-c', emailVerified: true, …}
tenantId: null
uid: "UcIN6lIg0Rcgc9tysruI5MZkJch1"
*/

export interface GoogleLoginProps{
    setUserId: (userId: string) => void;
}

interface GoogleUser {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}

export default function GoogleLogin(props: GoogleLoginProps) {
    const db = getDatabase (app);

    function signInToGoogle() {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (!credential) return;
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            const usersRef = ref(db, 'users/' + user.uid);
            const googleUser: GoogleUser = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            }
            set(usersRef, googleUser);
            document.cookie = `googleUID=${googleUser.uid}; SameSite=None; Secure`;
            props.setUserId(googleUser.uid);

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

  return (
    <Button variant="contained" onClick={signInToGoogle}>
        Login
    </Button>
  );
}