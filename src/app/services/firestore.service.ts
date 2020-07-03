import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IceCream } from '../models/Models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private iceCreamCollection: AngularFirestoreCollection<IceCream>;
  private iceCreamDoc: Observable<IceCream[]>;
  private iceCreamDocArray: IceCream[];

  constructor(private fs: AngularFirestore) { 
    this.iceCreamCollection = this.fs.collection('ice-cream');

    this.iceCreamDoc = this.iceCreamCollection.snapshotChanges().pipe(map(action => action.map(a => {
      const data = a.payload.doc.data() as IceCream;
      data.name = a.payload.doc.data().name;
      data.price = a.payload.doc.data().price;
      data.photoURL = a.payload.doc.data().photoURL;
      return data;
    })))

    this.pullDatabase();
  }

  public AddIceCream(name: string, price: string, photoURL: string, favorite: boolean) {

    var isFav = "";

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
      status: isFav
    }

    this.iceCreamCollection.add(data).catch((err) => {
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
