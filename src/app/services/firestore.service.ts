import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Admin, IceCream } from '../models/Models';
import { Observable } from 'rxjs';
import { auth, User } from 'firebase';
import { UiService } from './ui.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private waiting: boolean = false;
  private admin: boolean = false;
  private sentInvite: boolean = false;

  private iceCreamCollection: AngularFirestoreCollection<IceCream>;
  private iceCreamDoc: Observable<IceCream[]>;
  private iceCreamDocArray: IceCream[];

  private adminCollection: AngularFirestoreCollection<Admin>;
  private adminDoc: Observable<Admin[]>;
  private adminDocArray: Admin[];

  constructor(private fs: AngularFirestore, private ui: UiService) {
    this.iceCreamCollection = this.fs.collection('ice-cream');
    this.adminCollection = this.fs.collection('users');

    this.iceCreamDoc = this.iceCreamCollection.snapshotChanges().pipe(map(action => action.map(a => {
      const data = a.payload.doc.data() as IceCream;
      data.name = a.payload.doc.data().name;
      data.price = a.payload.doc.data().price;
      data.photoURL = a.payload.doc.data().photoURL;
      return data;
    })))

    this.adminDoc = this.adminCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Admin;
      data.uid = a.payload.doc.data().uid;
      data.name = a.payload.doc.data().name;
      data.admin = a.payload.doc.data().admin;
      return data;
    })))

    this.pullDatabase();
    this.pullAdmins();
  }

  public get getAdmins() {
    return this.adminDocArray;
  }

  public pullAdmins() {
    this.adminDoc.subscribe((data) => {
      this.adminDocArray = data;
    })
  }

  // * check is the user is an admin
  public isAdmin(uid: string) {
    if (uid.length == 0 || uid == null) {
      uid = localStorage.getItem('uid');
    }

    this.adminCollection.doc(uid).get().subscribe((data) => {
      this.admin = data.data().admin;
    })

    return this.admin;
  }

  // * set user as admin
  public async setAdmin(uid: string) {
    const setAdminData = {
      admin: true
    }

    this.adminCollection.doc(uid).set(setAdminData, { merge: true });
    this.isAdmin(uid);
  }

  public sendInvite(uid: string) {
    this.sentInvite = true;

    const sendInvitedata = {
      sentInvite: true
    };

    this.adminCollection.doc(uid).set(sendInvitedata, { merge: true });
  }

  public get getSentInvite() {
    return this.sentInvite;
  }

  public setWaiting(uid: string) {
    const setWaitData = {
      waiting: true
    }

    this.adminCollection.doc(uid).set(setWaitData, { merge: true });

    this.Waiting(uid);
  }

  public Waiting(uid: string) {
    if (uid.length == 0 || uid == null) {
      uid = localStorage.getItem('uid');
    }

    this.adminCollection.doc(uid).get().subscribe((user) => {
      this.waiting = user.data().waiting;
    })
  }

  public get getWaiting() {
    return this.waiting;
  }

  public get getAdmin() {
    return this.admin;
  }

  public deleteIcecream(id: string) {
    this.iceCreamCollection.doc(id).delete();
  }

  public UpdateAdminStatus(uid: string, admin: boolean, waiting: boolean) {
    const AdminUser = {
      admin: admin,
      waiting: waiting
    }

    this.adminCollection.doc(uid).set(AdminUser, { merge: true });
  }

  public UpdateAdmin(uid: string, name: string, photoURL: string) {
    const AdminUser = {
      name: name,
      profileLogoURL: photoURL,
    }

    this.adminCollection.doc(uid).set(AdminUser, { merge: true });
  }

  public CreateAdmin(uid: string, name: string, photoURL: string) {
    const AdminUser: Admin = {
      admin: false,
      name: name,
      profileLogoURL: photoURL,
      waiting: false,
      sentInvite: false,
      uid: uid
    }

    this.adminCollection.doc(uid).set(AdminUser, { merge: true });
  }

  public editIceCream(defaultName: string, defaultPrice: string, name: string, price: string, id: string) {
    var data = {
      name: name,
      price: price
    }

    this.iceCreamCollection.doc(id).set(data, { merge: true });
  }


  public AddIceCream(name: string, price: string, photoURL: string, favorite: boolean) {

  var isFav = "";
  const Generated_ID = Math.random().toString(36).substring(7);

  if (favorite === true) {
    isFav = "favorite";
  }

  if (favorite === false) {
    isFav = "";
  }

  const data: IceCream = {
    name: name,
    price: price,
    photoURL: photoURL,
    status: isFav,
    id: Generated_ID
  }

  this.iceCreamCollection.doc(Generated_ID).set(data, { merge: true }).catch((err) => {
    console.error(err);
  })
}

  public pullDatabase() {
  this.iceCreamDoc.subscribe((data) => {
    this.iceCreamDocArray = data;
  })
}

  public get GetIceCream() {
  return this.iceCreamDocArray;
}
}
