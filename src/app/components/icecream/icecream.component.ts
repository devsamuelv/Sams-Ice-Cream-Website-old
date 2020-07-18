import { Element } from '@angular/compiler/src/render3/r3_ast';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-icecream',
  templateUrl: './icecream.component.html',
  styleUrls: ['./icecream.component.scss']
})
export class IcecreamComponent implements OnInit {

  private editMode: boolean = false;
  public name: string = "";
  public price: string = "";

  constructor(public fs: FirestoreService) { }

  ngOnInit() {
  }

  public get getEditMode() {
    return this.editMode;
  }

  public nameChange(ref: any) {
    this.name = ref.target.value;

    console.log(this.name);
  }

  public priceChange(ref: any) {
    this.price = ref.target.value;

    console.log(this.price);
  }

  public editIceCream(defaultName: string, defaultPrice: string) {
    console.log(this.name);

    this.fs.editIceCream(defaultName, defaultPrice, String(this.name), String(this.price));

    this.name = "";
    this.price = "";
  }

  public enableEditMode() {
    switch (this.editMode) {
      case true:
        this.editMode = false;
        break;

      case false:
        this.editMode = true;
        break;
    }
  }



}
