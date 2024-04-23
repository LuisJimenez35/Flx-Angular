import { Injectable, inject, signal } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    user,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { AuthUserInterface } from '../../../models/user.interface';
import { deleteUser } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    authService: any;
    firebaseService: any;
    constructor(private firestore: Firestore) {}

    firebaseAuth = inject(Auth);
    user$ = user(this.firebaseAuth);
    currentUserSig = signal<AuthUserInterface | null | undefined>(undefined);

    async findUidByEmail(email: string): Promise<string | undefined> {
        const querySnapshot = await getDocs(query(collection(this.firestore, 'test1-Userinformation'), where('email', '==', email)));
        if (!querySnapshot.empty && querySnapshot.docs[0].data()['uid']) {
          const userData = querySnapshot.docs[0].data();
          return userData['uid'];
        } else {
          console.error('User not found in Firestore or email field is undefined:', email);
          return undefined;
        }
      }

    async deleteUser(uid: string): Promise<void> {
        try {
            const currentUser = this.firebaseAuth.currentUser;
            if (currentUser) {
                await deleteUser(currentUser);
                console.log('User deleted from Firebase Authentication:', uid);
            } else {
                console.error('No user is currently signed in.');
            }
        } catch (error) {
            console.error('Error deleting user from Firebase Authentication:', error);
            throw error;
        }
    }



    register(
        email: string,
        username: string,
        password: string
    ): Observable<any> {
        const promise = createUserWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password
        ).then((response: any) => {
            return updateProfile(response.user, { displayName: username }).then(
                () => response.user.uid
            );
        });

        return from(promise);
    }

    login(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password
        ).then(() => {});
        return from(promise);
    }

    logout(): Observable<void> {
        const promise = signOut(this.firebaseAuth);
        return from(promise);
    }
}
function deleteUserasdeleteAuthUser(firebaseAuth: Auth, userId: string): Promise<void> {
    throw new Error('Function not implemented.');
}

