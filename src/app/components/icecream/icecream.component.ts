import { Element } from '@angular/compiler/src/render3/r3_ast';
import { Component, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';
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

  constructor(public fs: FirestoreService, public fsauth: AuthService, public ui: UiService) { }

  ngOnInit() {
  }

  public get getEditMode() {
    return this.editMode;
  }

  public nameChange(ref: any) {
    this.name = ref;

    console.log(this.name);
  }

  public priceChange(ref: any) {
    this.price = ref;

    console.log(this.price);
  }

  public editIceCream(defaultName: string, defaultPrice: string, id: string) {
    console.log(this.name);

    if (localStorage.getItem('uid') == null) { this.ui.showError('Your Not An Admin!'); return; }

    this.fs.editIceCream(defaultName, defaultPrice, String(this.name), String(this.price), String(id));

    this.name = "";
    this.price = "";
  }

  public delete(id: string, dialog: NbDialogRef<any>) {
    this.fs.deleteIcecream(id);
    dialog.close();
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
