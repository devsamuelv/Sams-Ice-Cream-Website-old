import { Component, OnInit, HostBinding, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NbToastrService, NbComponentStatus, NbTabComponent, NbDialogService } from '@nebular/theme';
import { UiService } from '../../services/ui.service';
import { AuthService } from '../../services/auth.service';
import { Admin } from 'src/app/models/Models';
import { Router } from '@angular/router';
import * as algoliasearch from 'algoliasearch';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html', 
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public fs: FirestoreService,private dialogService: NbDialogService, private ui: UiService, public auth: AuthService, private router: Router) {
    if (auth.isSignedIn) {
      fs.Waiting(auth.getUID);
      fs.isAdmin(auth.getUID);
    }
  }

  public name: string = "";
  public price: string = "";
  public photoURL: string = "";
  public adminArray: Admin[];
  public waiting: boolean = false;
  
  private isToggled: boolean = false;

  ngOnInit() {
    if (this.auth.isSignedIn) {
      this.fs.Waiting(this.auth.getUID);
      this.fs.isAdmin(this.auth.getUID);
    }
  }

  public sendAdmin(uid: string) {
    this.fs.setAdmin(uid).then((u) => {
      this.router.navigate(['/admin']);
    })
  }

  open(dialog: TemplateRef<any>) {
    this.adminArray = this.fs.getAdmins;

    this.dialogService.open(dialog);
  }

  public setWaiting() {
    this.fs.setWaiting(this.auth.getUID);

    this.waiting = this.fs.getWaiting;
  }

  public google() {
    this.auth.googleSignin();
  }

  public facebook() {
    this.auth.facebookSignin();
  }

  public CreateIceCream() {
    if (this.name.length < 2) { this.ui.showError("Please Name Ice Cream"); return; }
    if (this.price.length < 2) { this.ui.showError("Please Enter the price");  return; }
    if (this.photoURL.length < 2) {  this.ui.showError("Please Enter PhotoUrl"); return; }

    this.fs.AddIceCream(this.name, this.price, this.photoURL, this.isToggled);

    this.ui.showSuccess(`Ice Cream Flavor ${this.name} Created Successfully!`);

    this.name = "";
    this.price = "";
    this.photoURL = "";
  }

  public toggled() {
    switch (this.isToggled) {
      case true:
        this.isToggled = false;
        break;
      case false:
        this.isToggled = true;
        break;
    }
  }

}
