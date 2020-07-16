import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private SignedIn: boolean = false;
  private CurrentUser = {
    uid: "",
    photoUrl: ""
  }

  constructor(private fsauth: AngularFireAuth, private fs: FirestoreService) {
    fsauth.authState.subscribe((data) => {
      if (data == null) { this.SignedIn = false; return; }

      if (data.uid != null) {
        this.SignedIn = true;
        this.CurrentUser.uid = data.uid;
        localStorage.setItem('uid', data.uid);
        fs.isAdmin(data.uid);
        fs.Waiting(data.uid);
      } else {
        this.SignedIn = false;
      }
    })

    fsauth.onAuthStateChanged((data) => {
      if (data == null) { this.SignedIn = false; return; }

      if (data.uid != null) {
        this.SignedIn = true;
        this.CurrentUser.uid = data.uid;
        fs.isAdmin(data.uid);
      } else {
        this.SignedIn = false;
      }
    })
  }

  public get isSignedIn() {
    return this.SignedIn;
  }

  public get getUserPhotoUrl() {
    return this.CurrentUser.photoUrl;
  }

  public get getUID() {
    return this.CurrentUser.uid;
  }

  public logout() {
    this.fsauth.signOut();

    localStorage.removeItem('uid');
    this.SignedIn = false;
    this.CurrentUser.uid = "";
  }

  public async googleSignin() {
    const provider = new auth.GoogleAuthProvider();

    if (this.CurrentUser.uid.length != 0) { return; }

    await this.fsauth.signInWithPopup(provider).then((user) => {
      if (user.additionalUserInfo.isNewUser) {
        this.fs.CreateAdmin(user.user.uid, user.user.displayName, user.user.photoURL);
      } else {
        this.fs.UpdateAdmin(user.user.uid, user.user.displayName, user.user.photoURL);
      }

      localStorage.setItem('uid', user.user.uid);

      if (user.user.uid) {
        this.CurrentUser.uid = user.user.uid;
        this.CurrentUser.photoUrl = user.user.photoURL;
        this.fs.isAdmin(user.user.uid);
        this.fs.Waiting(user.user.uid);
        this.SignedIn = true;
      }

    })
  }

  public async facebookSignin() {
    const provider = new auth.FacebookAuthProvider();

    if (this.CurrentUser.uid.length != 0) { return; }

    await this.fsauth.signInWithPopup(provider).then((user) => {
      if (user.additionalUserInfo.isNewUser) { 
        this.fs.CreateAdmin(user.user.uid, user.user.displayName, user.user.photoURL);
      } else {
        this.fs.UpdateAdmin(user.user.uid, user.user.displayName, user.user.photoURL);
      }

      localStorage.setItem('uid', user.user.uid);

      if (user.user.uid) {
        this.CurrentUser.uid = user.user.uid;
        this.CurrentUser.photoUrl = user.user.photoURL;
        this.fs.isAdmin(user.user.uid);
        this.fs.Waiting(user.user.uid);
        this.SignedIn = true;
      }
    })
  }
}
