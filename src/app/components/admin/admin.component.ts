import { Component, OnInit, HostBinding } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private fs: FirestoreService, private toastrService: NbToastrService) { }

  public name: string = "";
  public price: string = "";
  public photoURL: string = "";
  
  private isToggled: boolean = false;

  ngOnInit() {
  }

  public CreateIceCream() {
    if (this.name.length < 2) { return; }
    if (this.price.length < 2) { return; }
    if (this.photoURL.length < 2) { return; }

    this.fs.AddIceCream(this.name, this.price, this.photoURL, this.isToggled);

    this.showSuccess(`Ice Cream Flavor ${this.name} Created Successfully!`);

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

  private index: number = 0;

  @HostBinding('class')
  classes = 'example-items-rows';

  public showSuccess(msg: string) {
    this.toastrService.show(status, msg, { status: 'success' });
  }

}
