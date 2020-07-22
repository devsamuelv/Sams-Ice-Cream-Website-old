import { Injectable } from '@angular/core';
import * as algoliasearch from 'algoliasearch';
import { environment } from 'src/environments/environment';
import { AlgoliaObject } from '../models/Models';


const searchClient = algoliasearch(
  environment.APP_ID,
  environment.ADMIN_KEY
);

@Injectable({
  providedIn: 'root'
})
export class AlgoliaService {

  constructor() { }

  public CreateAlgoliaObject(name: string, price: string, photoURL: string, id: string, isFavorite: string) {
    const index = searchClient.initIndex('ice cream flavors');

    const data: { id: string, name: string, price: string, photoURL: string, status: string, objectID: string }[] = [
      { "id": id, "name": name, "photoURL": photoURL, "status": isFavorite, "price": price, objectID: id },
    ];

    index.addObjects(data, (err, res) => {

      if (err) {
        console.error(err);
      }

      console.log(res);
    });
  }
}
