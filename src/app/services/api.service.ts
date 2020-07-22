import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private functions: AngularFireFunctions) { }

  public SendRequest(name: string, data: any) {
    this.functions.httpsCallable(name).call(data, (res, err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });
  }
}
